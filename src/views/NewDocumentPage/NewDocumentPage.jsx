import React, { useRef, useState, Fragment, useEffect } from 'react'
import AddToCalendar from 'react-add-to-calendar'
import _ from 'lodash'
import moment from 'moment'

import { api } from '../../services'
import {
  Icon,
  Select,
  Spin,
  notification,
  Typography,
  Button,
  Input,
  Modal,
  List, Tag
} from 'antd'

import { checkBrowser } from '../../utils'
import history from '../../history'
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
  fileFetch: [],
  fileInfo: [],
  isNewMessage: false,
  uploadFetch: false
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
    createMessage,
    sendDocumentToUser,
    uploadFile,
    removeFile,
    verifyFile,
    changeFileStatus,
    updateDocumentById,
    user,
    files: { list, isFetching }
  } = props

  const [documentState, setDocumentState] = useState({ ...defaultDocumentData })
  const [message, setMessage] = useState(false)

  useEffect(() => {
    createMessage({ name: '[Без темы]', description: '' })
      .then(({ success, data }) => {
        if (success) {
          setDocumentState({
            ...documentState,
            message: data
          })
        }
      })
  }, [message])

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
    for (let file of [...target.files]) {
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
    }

    setDocumentState({
      ...documentState,
      fileFetch: [...documentState.fileFetch, ...[...target.files].map(() => false)]
    })

    inputNode.current.value = ''
  }

  const handleRemoveFile = (id, index) => {
    removeFile(id)
      .then(response => {
        if (response.success) {
          notification['success']({
            message: 'Файл успешно удален'
          })
          setDocumentState({
            ...documentState,
            fileFetch: documentState.files.filter((e, i) => i !== index)
          })
        } else {
          throw new Error(response.error)
        }
      })
      .catch(error => {
        notification['error']({
          message: error.message
        })
      })
  }

  const handleVerifyFile = (item, index) => {
    if (!checkBrowser('ie')) {
      notification['error']({
        message: 'Ошибка подписания',
        description: 'Подписание файла возможно только в браузере IE'
      })
      return null
    }

    setDocumentState({
      ...documentState,
      fileFetch: [
        ...documentState.fileFetch.slice(0, index),
        true,
        ...documentState.fileFetch.slice(index + 1)
      ]
    })

    api.files.getBase64File(item.id)
      .then(({ data }) => {
        if (data.success) {
          try {
            const sertificationObject = window.sign(data.data, item.hash_for_sign)

            const verifiedData = {
              documents: [{
                id: documentState.message.id,
                attachments: [
                  {
                    id: item.id,
                    hash: sertificationObject.signedData,
                    data: sertificationObject.verifiedData,
                    hash_for_sign: sertificationObject.hex
                  }
                ]
              }]
            }

            verifyFile(verifiedData)
              .then(response => {
                if (response.success) {
                  notification['success']({
                    message: 'Файл успешно подписан'
                  })
                  setDocumentState({
                    ...documentState,
                    fileFetch: [
                      ...documentState.fileFetch.slice(0, index),
                      false,
                      ...documentState.fileFetch.slice(index + 1)
                    ]
                  })
                } else {
                  throw new Error(response.error)
                }
              })
          } catch (error) {
            notification['error']({
              message: error.message()
            })
            setDocumentState({
              ...documentState,
              fileFetch: [
                ...documentState.fileFetch.slice(0, index),
                false,
                ...documentState.fileFetch.slice(index + 1)
              ]
            })
          }
        } else {
          throw new Error(data.error)
        }
      })
      .catch(error => {
        message.error(error.message)
      })
  }

  const handleChangeStatus = id => value => {
    changeFileStatus({ attachment_id: id, status: value })
      .then(response => {
        console.log(response)
      })
  }

  const save2DraftDMessage = is2Draft => {
    updateDocumentById(documentState.message.id, {
      name: documentState.name ? documentState.name : 'Без темы',
      description: documentState.description
    })
      .then(({ data }) => {
        if (is2Draft) {
          history.push({ pathname: '/documents', search: '?status=1', state: { id: '/documents/1' } })
        } else {
          if (!documentState.value.length > 0) {
            message.error('Введите получателя!')
            setDocumentState({
              ...documentState,
              fetching: false
            })
            return null
          }
          sendDocumentToUser({
            document_ids: [documentState.message.id],
            user_company_id: JSON.stringify(documentState.value.map(i => i.key))
          }).then(({ success }) => {
            if (success) {
              notification['success']({
                message: 'Сообещние успешно доставлено'
              })
              setDocumentState({ ...defaultDocumentData })
              setMessage(!message)
            }
          })
        }
        return data
      })
      .catch(error => console.error(error))
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
          notification['error']({
            message: error.message()
          })
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

    const validEmails = v.filter(i => {
      if (validateEmail(i.label)) {
        return i.key
      }
    })

    if (v.length !== validEmails.length) {
      notification['error']({
        message: 'Не правильный электронный адрес'
      })
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

  console.log(documentState)
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
            loading={isFetching}
            locale={{ emptyText: 'Нет прикрепленных файлов' }}
            style={{ padding: '1rem' }}
            renderItem={(i, idx) => (
              <List.Item
                key={idx}
                actions={[
                  <Icon style={{ color: '#3278fb' }} type={documentState.fileFetch[idx] ? 'loading' : 'edit'} onClick={() => handleVerifyFile(i, idx)} />,
                  <Icon style={{ color: '#3278fb' }} type='delete' onClick={() => handleRemoveFile(i.id)} />,
                ]}
              >
                <div className='file-item'>
                  <Text type='secondary' style={{ marginRight: '1rem' }}>{idx + 1}</Text>

                  <Text strong>{i.original_name}</Text>
                </div>
                {i.verification_info &&
                  <Tag
                    color='#3278fb'
                    style={{ cursor: 'pointer' }}
                  >ЭЦП</Tag>
                }
                <Select value={i.status.status_data.id} onChange={handleChangeStatus(i.id)} style={{ marginLeft: 10, minWidth: '20rem' }}>
                  <Option value={1}>Простая доставка</Option>
                  <Option value={2}>Согласование</Option>
                  <Option value={3}>Подпись получателя</Option>
                </Select>
              </List.Item>
            )}
          />

          <div className='buttons-group'>
            <Button
              ghost
              type='primary'
              onClick={() => save2DraftDMessage(true)}
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
                onClick={() => save2DraftDMessage(false)}
              >
                <Icon type='cloud-upload' />
                Отправить
              </Button>
            </div>
          </div>
        </Spin>
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
