import React, { useRef, useState, Fragment, useEffect } from 'react'
import AddToCalendar from 'react-add-to-calendar'
import _ from 'lodash'
import moment from 'moment'

import { api } from '../../services'
import {
  message,
  Icon,
  Select,
  Spin,
  notification,
  Typography,
  Button,
  Input,
  Modal,
  List
} from 'antd'
import { checkBrowser } from '../../utils'
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
  isClicked: false,
  isErrorWitchEcp: false,
  showModal: false,
  userAddress: '', /// started new logic
  message: null,
  filesArray: [],
  fileFetch: false
}

const getSignedHex = (base64) => {
  try {
    return window.sign(base64).hex
  } catch (error) {
    console.error(error)
    return ''
  }
}

// eslint-disable-next-line spaced-comment
const isIE = /*@cc_on!@*/!!document.documentMode

const { Option } = Select
const { TextArea } = Input
const { Text } = Typography

const NewDocumentPage = props => {
  const inputRef = useRef(null)
  const inputNode = useRef(null)
  const {
    sendDocumentToUser,
    getUser,
    uploadFile,
    removeFile,
    verifyFile,
    user,
    files: { list }
  } = props

  const [documentState, setDocumentState] = useState({ ...defaultDocumentData })

  useEffect(() => {
    api.document.createDocument({ name: '[Без темы]', description: '' })
      .then(({ data }) => {
        if (data.success) {
          setDocumentState({
            ...documentState,
            message: data.data
          })
        }
      })
  }, [])

  useEffect(() => {
    if (!documentState.fetching) {
      inputRef.current.focus()
    }
  }, [documentState.fetching])

  const updateField = (field, v) => {
    setDocumentState({
      ...documentState,
      [field]: v
    })
  }

  const getFiles = ({ target }) => {
    [...target.files].forEach(file => {
      const fileReader = new window.FileReader()

      fileReader.readAsDataURL(file)
      fileReader.onload = function () {
        const base64 = fileReader.result.split(',').pop()
        const formData = api.helpers.buildForm({
          'hash_for_sign': getSignedHex(base64),
          'document_id': documentState.message.id,
          'file': file
        })
        uploadFile(formData, { 'Content-Type': 'multipart/form-data' })
      }
    })
  }

  const handleRemoveFile = id => {
    removeFile(id)
  }

  const handleVerifyFile = item => {
    if (!checkBrowser('ie')) {
      notification['error']({
        message: 'Ошибка подписания',
        description: 'Подписание файла возможно только в браузере IE'
      })
      return null
    }
    api.files.getBase64File(item.id)
      .then(({ data }) => {
        if (data.success) {
          try {
            const sertificationObject = window.sign(data.data, item.hash_for_sign)

            const verifiedData = {
              documents: [{
                id: message.id,
                attachments: [
                  {
                    id: item.id,
                    hash: sertificationObject.signedData,
                    data: sertificationObject.verifiedData,
                    hash_for_sign: sertificationObject.hex,
                    status: 5
                  }
                ]
              }]
            }

            verifyFile(verifiedData)
          } catch (error) {
            console.error(error)
          }
        } else {
          throw new Error(data.error)
        }
      })
      .catch(error => {
        message.error(error.message)
      })
  }

  const handleSendToDraft = (isMessagesShow = true) => {
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

    formData.append(
      'user_company_id',
      documentState.value.length ? JSON.stringify(documentState.value.map(i => i.key)) : JSON.stringify([])
    )

    documentState.files.forEach((file, index) => {
      formData.append(`second_documents[${index}]`, file)
    })

    return api.document.createDocument(formData, { 'Content-Type': 'multipart/form-data' })
      .then(({ data }) => {
        if (data.success) {
          if (isMessagesShow) {
            message.success(`Документ ${documentState.name} успешно сохранен!`)
          }

          setDocumentState({
            ...documentState,
            fetching: false,
            isClicked: true
          })

          const newData = {
            documents: [
              {
                id: data.data.id,
                attachments: documentState.statuses
                  .map((item, i) => ({
                    id: data.data.attachments[i].id,
                    hash: documentState.fileHashes[i] ? documentState.fileHashes[i] : null,
                    data: documentState.fileData[i] ? documentState.fileData[i] : null,
                    status: documentState.statuses[i]
                  }))
              }
            ]
          }
          if (documentState.files.length) {
            setDocumentState({
              ...documentState,
              fetching: false
            })
            api.document.confirmDocument(newData)
              .then(({ data }) => {
                console.log(data)
                if (data.success) {
                  if (!isMessagesShow) {
                    setDocumentState({ ...defaultDocumentData })
                  } else {
                    setDocumentState({
                      ...documentState,
                      fetching: false
                    })
                  }
                } else {
                  throw new Error(data.error)
                }
                return data
              })
              .catch(error => {
                message.error(error.message)
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

  const handleSendToUser = (isToUser = false) => {
    if (!documentState.value.length > 0) {
      message.error('Введите получателя!')
      setDocumentState({
        ...documentState,
        fetching: false
      })
      return null
    }
    handleSendToDraft(isToUser)
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
              getUser()
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

  const validateEmail = label => {
    const email = label.split(' ')[0]
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  const handleSelect = v => {
    if (documentState.fetching) {
      return
    }
    console.log('v:', v)

    const validEmails = v.filter(i => {
      if (validateEmail(i.label)) {
        return i.key
      }
    })

    if (v.length !== validEmails.length) {
      message.error('Не правильный электронный адрес')
    }

    setDocumentState({
      ...documentState,
      value: validEmails
    })
  }

  const resolveEscError = () => {
    setDocumentState({
      ...documentState,
      showModal: false,
      isErrorWitchEcp: true
    })
  }

  return (
    <Fragment>
      <div className='content content_padding' style={{ marginBottom: '2rem' }}>
        <Spin spinning={!!documentState.fetching}>
          <div className='input-group'>
            <label className='label'>Получатели</label>

            <Select
              ref={inputRef}
              mode='tags'
              labelInValue
              tokenSeparators={[',']}
              value={documentState.value}
              filterOption={false}
              notFoundContent={documentState.fetching ? <Spin size='small' /> : null}
              onSearch={fetchUser}
              onChange={handleSelect}
              disabled={documentState.fetching}
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
            <TextArea autosize={{ minRows: 4, maxRows: 10 }} value={documentState.description} onChange={e => updateField('description', e.target.value)} />
          </div>

          <div className='buttons-group'>
            <input type='file' id='upload' hidden multiple onChange={event => getFiles(event)} ref={inputNode} />

            <label style={{ minWidth: 216 }} className='ant-btn ant-btn-primary ant-btn-background-ghost label-btn' htmlFor='upload'>
              <Icon type='upload' style={{ marginRight: 10 }} />
            Прикрепить файл(ы)
            </label>
          </div>

          <List
            itemLayout='horizontal'
            dataSource={list && list}
            locale={{ emptyText: 'Нет прикрепленных файлов' }}
            style={{ padding: '1rem' }}
            renderItem={(i, idx) => (
              <List.Item
                key={idx}
                actions={[
                  <Icon type='edit' onClick={() => handleVerifyFile(i)} />,
                  <Icon type='delete' onClick={() => handleRemoveFile(i.id)} />
                ]}
              >
                <div className='file-item'>
                  <Text type='secondary' style={{ marginRight: '1rem' }}>{idx + 1}</Text>

                  <Text strong>{i.name}</Text>
                </div>
              </List.Item>
            )}
          />

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

            <div style={{ display: 'flex' }}>
              <AddToCalendar
                buttonLabel='Добавить в календарь'
                listItems={[
                  { apple: 'Apple Calendar' },
                  { google: 'Google' },
                  { outlook: 'Outlook' }
                ]}
                event={{
                  title: 'Контроль сообщения',
                  description: '',
                  location: 'Minsk',
                  startTime: moment().add(1, 'days').startOf('day').hour('10').minute('00'),
                  endTime: moment().add(1, 'days').startOf('day').hour('11').minute('00')
                }}
              />

              <Button
                style={{ marginLeft: '2rem' }}
                type='primary'
                onClick={() => handleSendToUser(false)}
              >
                <Icon type='cloud-upload' />
                Отправить
              </Button>
            </div>
          </div>
        </Spin>
        <input type='hidden' id='attr' size='80' value='1.2.112.1.2.1.1.1.1.2' />

        <input type='hidden' id='attrValue' size='80' disabled='disabled' />

        <div id='attrCertSelectContainer' style={{ display: 'none' }}>
          <span id='certExtAbsent' />
          <select style={{ visibility: 'hidden' }} id='attrCertSelect' />
        </div>
      </div>

      {!isIE && <Text type='secondary'>
        Подпись файлов возможна только в браузере Internet Explorer
      </Text>
      }

      {documentState.showModal &&
      <Modal
        visible
        closable={false}
        footer={null}
      >
        <div style={{ textAlign: 'center' }}>
          <Icon
            type='warning'
            theme='twoTone'
            twoToneColor='orange'
            style={{ fontSize: '3rem' }}
          /><br />

          <Text style={{ textAlign: 'center' }}>Вставьте ключ ЭЦП компании</Text>

          {user.data.companies.length &&
          user.data.companies.map(i => {
            if (i.company_id === user.data.active_company_id) {
              return <Text strong> {i.company_name} </Text>
            } else {
              return null
            }
          })
          }

          <Text>в компьютер.</Text>
        </div>

        <Button
          type='primary'
          style={{ marginTop: '2rem' }}
          onClick={() => resolveEscError()}
        >
          Продолжить
        </Button>
      </Modal>
      }
    </Fragment>
  )
}

export default NewDocumentPage
