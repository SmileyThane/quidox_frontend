import React, { useRef, useState, Fragment } from 'react'
import axios from 'axios'
import _ from 'lodash'

import { api } from '../../services'
import {
  message,
  Icon,
  Select,
  Spin,
  Tag,
  Typography,
  Input,
  Checkbox
} from 'antd'
import { Button } from '../../components'
import './NewDocumentPage.scss'

const defaultDocumentData = {
  name: '',
  description: '',
  document: {},
  files: [],
  base64files: [],
  certs: [],
  fileHashes: [],
  fileData: [],
  statuses: [],
  data: [],
  value: [],
  fetching: false,
  ids: [],
  verifyFetching: false,
  isVisibleRecipients: false,
  isClicked: false
}
// eslint-disable-next-line spaced-comment
const isIE = /*@cc_on!@*/false || !!document.documentMode

const { Option } = Select
const { TextArea } = Input
const { Text } = Typography

const NewDocumentPage = props => {
  const inputRef = useRef(null)
  const inputNode = useRef(null)
  const {
    sendDocumentToUser
  } = props

  const [documentState, setDocumentState] = useState({ ...defaultDocumentData })

  const focusInput = () => {
    inputRef.current.focus()
  }

  const updateField = (field, v) => {
    setDocumentState({
      ...documentState,
      [field]: v
    })
  }

  const getFiles = e => {
    setDocumentState({
      ...documentState,
      files: documentState.files.concat([...e.target.files]),
      base64files: [...documentState.base64files, null],
      fileHashes: [...documentState.fileHashes, null],
      fileData: [...documentState.fileData, null],
      statuses: [...documentState.statuses, 1]
    })
  }

  const removeFile = (index) => {
    delete inputNode.current.files[index]
    setDocumentState({
      ...documentState,
      files: documentState.files.filter((e, i) => i !== index),
      base64files: documentState.base64files.filter((e, i) => i !== index),
      fileHashes: documentState.fileHashes.filter((e, i) => i !== index),
      fileData: documentState.fileData.filter((e, i) => i !== index),
      statuses: documentState.statuses.filter((e, i) => i !== index)
    })
  }

  const handleSendToDraft = (condition) => {
    setDocumentState({
      ...documentState,
      fetching: true
    })
    const formData = new window.FormData()

    formData.append(
      'name',
      documentState.name.length ? documentState.name : '[Без темы]'
    )

    formData.append(
      'description',
      documentState.description
    )
    const recipientsInt = documentState.isVisibleRecipients ? 1 : 0
    formData.append(
      'is_visible_recipients',
      recipientsInt
    )

    if (!condition.length) {
      formData.append(
        'user_company_id',
        documentState.value.length ? JSON.stringify(documentState.value.map(i => i.key)) : JSON.stringify([])
      )
    }

    documentState.files.forEach((file, index) => {
      formData.append(`second_documents[${index}]`, file)
    })
    return axios.post('https://api.quidox.by/api/document/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + window.localStorage.getItem('authToken')
      }
    })
      .then(({ data }) => {
        if (data.success) {
          message.success(`Документ ${documentState.name} успешно сохранен!`)
          setDocumentState({
            ...documentState,
            fetching: false,
            isClicked: true
          })
            setDocumentState({
              ...documentState,
              fetching: true
            })
            const newData = {
              documents: [
                {
                  id: data.data.id,
                  attachments: documentState.statuses
                    .map((item, i) => ({
                      id: data.data.attachments[i].id,
                      hash: documentState.fileHashes[i] && documentState.fileHashes[i],
                      data: documentState.fileData[i] && documentState.fileData[i],
                      status: documentState.statuses[i]
                    }))
                }
              ]
            }

            return axios.post('https://api.quidox.by/api/documents/confirm', newData, {
              headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('authToken')
              }
            })
              .then(() => {
                message.success(`файлы успешно подписаны!`)
                setDocumentState({ ...defaultDocumentData })
                return data
              })
          return data
        }
      })
      .catch(error => {
        message.error(error.message)
        setDocumentState({ ...defaultDocumentData })
      })
  }

  const handleSendToUser = (type) => {
    const typeCondition = type
    if (!documentState.value.length > 0) {
      message.error('Введите получателя!')
      setDocumentState({
        ...documentState,
        fetching: false
      })
      return null
    }
    handleSendToDraft(typeCondition)
      .then(response => {
        if (response.success) {
          const docDataToUser = {
            document_ids: [response.data.id],
            user_company_id: JSON.stringify(documentState.value.map(i => i.key)),
            status: documentState.status
          }
          sendDocumentToUser(docDataToUser)
            .then(response => {
              message.success('Сообщение успешно отправлено!')
              setDocumentState({ ...defaultDocumentData })
            })
            .catch(error => {
              message.error(error.message)
              setDocumentState({ ...defaultDocumentData })
            })
        } else {
          throw new Error(response.error)
        }
      })
      .catch(error => {
        message.error(error.message)
      })
  }

  const fetchUser = _.debounce(v => {
    if (v.length > 2) {
      setDocumentState({
        ...documentState,
        fetching: true
      })
      api.user.findUsersByParams(v)
        .then(({ data }) => {
          if (data.success) {
            const dataIds = documentState.data.map(i => i.key)
            const dataArray = data.data
              .map(user => ({
                label: `${user.user_data.email} (УНП:${user.company_data.company_number}; Компания:${user.company_data.name})`,
                key: `${user.id}`
              }))
              .filter(i => !dataIds.includes(i.key))
            setDocumentState({
              ...documentState,
              data: [...documentState.data, ...dataArray],
              fetching: false
            })
          } else {
            throw new Error(data.error)
          }
        })
        .catch(error => {
          message.error(error.message)
        })
    }
  }, 800)

  const handleSelect = v => {
    setDocumentState({
      ...documentState,
      data: v,
      value: v
    })
  }

  const verifyFile = index => {
    setDocumentState({
      ...documentState,
      verifyFetching: true
    })
    const reader = new window.FileReader()
    reader.readAsDataURL(documentState.files[index])
    reader.onload = function () {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.id = 'dataFile-' + index
      document.body.appendChild(input)
      document.getElementById('dataFile-' + index).value = reader.result

      window.sign('File-' + index)

      setTimeout(() => {
        const value = document.getElementById('verifiedData' + 'File-' + index).value
        const signedValue = document.getElementById('signedData' + 'File-' + index).value
        const flashData = JSON.parse(decodeURIComponent(value))
        const key = flashData.cert['1.2.112.1.2.1.1.1.1.2'] + flashData.cert['1.2.112.1.2.1.1.1.1.1']
        api.documents.checkFlashKey({ key: key })
          .then(({ data }) => {
            if (data.success) {
              setDocumentState({
                ...documentState,
                verifyFetching: false,
                base64files: [
                  ...documentState.base64files.slice(0, index),
                  reader.result,
                  ...documentState.base64files.slice(index + 1)
                ],
                fileHashes: [
                  ...documentState.fileHashes.slice(0, index),
                  signedValue,
                  ...documentState.fileHashes.slice(index + 1)
                ],
                fileData: [
                  ...documentState.fileData.slice(0, index),
                  value,
                  ...documentState.fileData.slice(index + 1)
                ]
              })
            } else {
              throw new Error(data.error)
            }
          })
          .catch(error => {
            message.error(error.message)
          })
      }, 1000)
    }
    reader.onerror = function (error) {
      message.error(error.message)
    }
  }

  const handleStatusChange = index => value => {
    setDocumentState({
      ...documentState,
      statuses: [
        ...documentState.statuses.slice(0, index),
        value,
        ...documentState.statuses.slice(index + 1)
      ]
    })
  }

  console.log(documentState.statuses)
  return (
    <Fragment>
      <div className='content content_padding' style={{ marginBottom: '2rem' }}>
        <Spin spinning={!!documentState.fetching}>
          <div className='input-group'>
            <label className='label'>Получатели</label>
            <Select
              mode='tags'
              labelInValue
              tokenSeparators={[',']}
              value={documentState.value}
              filterOption={false}
              notFoundContent={documentState.fetching ? <Spin size='small' /> : null}
              onSearch={fetchUser}
              onChange={handleSelect}
              onSelect={focusInput}
              style={{ width: '100%' }}
            >
              {documentState.data.map(element => <Option key={element.key}>{element.label}</Option>)}
            </Select>
          </div>
          <div className='input-group'>
            <label className='label'>Тема</label>
            <Input ref={inputRef} kind='text' type='text' value={documentState.name} onChange={e => updateField('name', e.target.value)} />
          </div>
          <div className='input-group'>
            <label className='label'>Комментарий</label>
            <TextArea autosize={{ minRows: 1, maxRows: 6 }} value={documentState.description} onChange={e => updateField('description', e.target.value)} />
          </div>
          <div className='buttons-group'>
            <input type='file' id='upload' hidden multiple onChange={event => getFiles(event)} ref={inputNode} />
            <label style={{ minWidth: 216 }} className='ant-btn ant-btn-primary ant-btn-background-ghost label-btn' htmlFor='upload'>
              <Icon type='upload' style={{ marginRight: 10 }} />
            Прикрепить файл(ы)
            </label>
          </div>
          <div className='files-group'>
            <ul className='attached-files'>
              {documentState.files && documentState.files.map((e, i) => (
                <li className='attached-file' key={e.name}>
                  <Text type='secondary' style={{ marginRight: '1rem' }}>{i + 1}</Text>
                  <Text strong>{e.name}</Text>
                  { documentState.fileHashes[i] && <Tag color='#3278fb'>ЭЦП</Tag> }
                  <div className='attached-file__actions'>
                    <div className='actions-left'>
                      <Text>Требуется:</Text>
                      <Select defaultValue={1} onChange={handleStatusChange(i)} style={{ marginLeft: 10, minWidth: '20rem' }}>
                        <Option value={1}>Простая доставка</Option>
                        <Option value={2}>Согласование</Option>
                        <Option value={3}>Подпись получателя</Option>
                      </Select>
                    </div>
                    <div className='actions-right'>
                      {isIE &&
                      <Icon onClick={() => verifyFile(i)} style={{ color: '#3278fb' }} type={documentState.verifyFetching ? 'loading' : 'edit'} />
                      }
                      <Icon
                        onClick={() => removeFile(i)}
                        style={{ color: '#FF7D1D' }}
                        type='close'
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className='buttons-group'>
            <Checkbox onChange={e => setDocumentState({ ...documentState, isVisibleRecipients: e.target.checked })}>Разрешить получателям видеть всех адресатов сообщения</Checkbox>
          </div>
          <div className='buttons-group'>
            <Button
              ghost
              type='primary'
              onClick={handleSendToDraft}
              style={{ minWidth: 216 }}
              disabled={documentState.isClicked}
            >
              <Icon type='file-text' />
              Сохранить в черновиках
            </Button>
            <Button
              type='primary'
              onClick={() => handleSendToUser('toUser')}
            >
              <Icon type='cloud-upload' />
              Отправить
            </Button>
          </div>
        </Spin>
        <input type='hidden' id='attr' size='80' value='1.2.112.1.2.1.1.1.1.2' />
        <div id='attrCertSelectContainer' style={{ display: 'none' }}>
          <span id='certExtAbsent' />
          <select style={{ visibility: 'hidden' }} id='attrCertSelect' />
        </div>
        <input type='hidden' id='attrValue' size='80' disabled='disabled' />
      </div>
      {!isIE && <Text type='secondary'>
        Подпись файлов возможна только в браузере Internet Explorer
      </Text>
      }
    </Fragment>
  )
}

export default NewDocumentPage
