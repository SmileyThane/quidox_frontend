import React, { useRef, useState, Fragment } from 'react'

import axios from 'axios'
import _ from 'lodash'
import { findUsersByParams } from '../../services/api/user'
import {
  message,
  Icon,
  Select,
  Spin,
  Tag,
  Typography,
  Checkbox
} from 'antd'
import { Input, Button } from '../../components'
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
  data: [],
  value: [],
  fetching: false,
  ids: []
}
// eslint-disable-next-line spaced-comment
const isIE = /*@cc_on!@*/false || !!document.documentMode

const { Option } = Select
const { Text } = Typography

const NewDocumentPage = props => {
  const inputNode = useRef(null)
  const {
    sendDocumentToUser
  } = props

  const [documentState, setDocumentState] = useState({ ...defaultDocumentData })

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
      fileData: [...documentState.fileData, null]
    })
  }

  const removeFile = (index) => {
    let arr = Array.from(inputNode.current.files)
    delete inputNode.current.files[index]
    setDocumentState({
      ...documentState,
      files: documentState.files.filter((e, i) => i !== index),
      base64files: documentState.base64files.filter((e, i) => i !== index),
      fileHashes: documentState.fileHashes.filter((e, i) => i !== index),
      fileData: documentState.fileData.filter((e, i) => i !== index)
    })
  }

  const handleSendToDraft = () => {
    setDocumentState({
      ...documentState,
      fetching: true
    })
    const formData = new window.FormData()

    formData.append(
      'name',
      documentState.name
    )
    formData.append(
      'description',
      documentState.description
    )

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
            fetching: false
          })
          if (documentState.fileHashes.filter(i => !!i).length) {
            setDocumentState({
              ...documentState,
              fetching: true
            })
            const newData = {
              documents: [
                {
                  id: data.data.id,
                  attachments: documentState.fileHashes
                    .map((item, i) => ({
                      id: data.data.attachments[i].id,
                      hash: item,
                      data: documentState.fileData[i]
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
          }
          return data
        }
      })
      .catch(error => {
        message.error(error.message)
        setDocumentState({ ...defaultDocumentData })
      })
  }

  const handleSendToUser = () => {
    if (!documentState.value.length > 0) {
      message.error('Введите получателя!')
      setDocumentState({
        ...documentState,
        fetching: false
      })
      return null
    }
    handleSendToDraft()
      .then(response => {
        if (response.success) {
          const docDataToUser = {
            document_ids: [response.data.id],
            user_company_id: documentState.value.map(i => i.key)
          }
          sendDocumentToUser(docDataToUser)
            .then(response => {
              console.log(response)
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
      findUsersByParams(v)
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
    const reader = new window.FileReader()
    reader.readAsDataURL(documentState.files[index])
    reader.onload = function () {
      var input = document.createElement('input')
      input.type = 'hidden'
      input.id = 'dataFile-' + index
      document.body.appendChild(input)
      document.getElementById('dataFile-' + index).value = reader.result
      window.sign('File-' + index)

      setTimeout(() => {
        const value = document.getElementById('verifiedData' + 'File-' + index).value
        const signedValue = document.getElementById('signedData' + 'File-' + index).value
        setDocumentState({
          ...documentState,
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
      }, 1000)
    }
    reader.onerror = function (error) {
      message.error(error.message)
    }
  }

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
              style={{ width: '100%' }}
            >
              {documentState.data.map(element => <Option key={element.key}>{element.label}</Option>)}
            </Select>
          </div>
          <div className='input-group'>
            <label className='label'>Тема</label>
            <Input kind='text' type='text' value={documentState.name} onChange={e => updateField('name', e.target.value)} />
          </div>
          <div className='input-group'>
            <label className='label'>Комментарий</label>
            <Input kind='textarea' type='text' value={documentState.description} onChange={e => updateField('description', e.target.value)} />
          </div>
          <div className='buttons-group'>
            <input type='file' id='upload' hidden multiple onChange={event => getFiles(event)} ref={inputNode} />
            <label className='label-btn' htmlFor='upload'>
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
                      <Checkbox>Требуется подпись</Checkbox>
                    </div>
                    <div className='actions-right'>
                      {isIE &&
                      <Icon onClick={() => verifyFile(i)} style={{ color: '#3278fb' }} type='edit' />
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
            <Button
              ghost
              type='primary'
              onClick={handleSendToDraft}
            >
              <Icon type='file-text' />
        Сохранить в черновиках
            </Button>
            <Button
              type='primary'
              onClick={handleSendToUser}
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
      <Text type='secondary'>
        Подпись файлов возможна только в браузере Internet Explorer
      </Text>
    </Fragment>
  )
}

export default NewDocumentPage
