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
  List,
  Tag,
  Progress, message
} from 'antd'

import { EscDataSlider, UploadFiles } from '../../components'

import { checkBrowser } from '../../utils'
import history from '../../history'
import './NewDocumentPage.scss'
import { findUsersByParams } from '../../services/api/user'

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
  userAddress: '', /// started new logic,
  showModal: false,
  modalType: '',
  message: null,
  filesArray: [],
  fileFetch: [],
  fileInfo: [],
  isNewMessage: false,
  uploadFetch: false,
  disabled: false,
  coNumbers: ''
}

const getSignedHex = (base64) => {
  try {
    return window.sign(base64).hex
  } catch (error) {
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
    getUser,
    sendDocumentToUser,
    uploadFile,
    removeFile,
    verifyFile,
    changeFileStatus,
    updateDocumentById,
    files: { list, isFetching, status }
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

  // useEffect(() => {
  //   if (!documentState.fetching) {
  //     inputRef.current.focus()
  //   }
  // }, [documentState.fetching])

  const updateField = (field, v) => {
    setDocumentState({
      ...documentState,
      [field]: v
    })
  }

  const showUploadingModal = (e, type) => {
    documentState.disabled = false;
    const files = [...e.target.files]
    if (files.length > 5) {
      notification['error']({
        message: 'Максимальное количество файлов для однопоточной загрузки 5'
      })
      return null
    }
    setDocumentState({
      ...documentState,
      files: [...files],
      showModal: !documentState.showModal,
      modalType: type
    })
  }

  const hideUploadedModal = () => {
    setDocumentState({
      ...documentState,
      files: [],
      showModal: !documentState.showModal,
      modalType: ''
    })
    inputNode.current.value = ''
  }

  const getFiles = () => {
    let chain = Promise.resolve()
    const files = documentState.files
    setDocumentState({
      ...documentState,
      disabled: true
    })

    files.forEach((file, idx) => {
      const fileReader = new window.FileReader()
      fileReader.readAsDataURL(file)

      fileReader.onload = function () {
        const base64 = fileReader.result.split(',').pop()

        const formData = api.helpers.buildForm({
          'hash_for_sign': getSignedHex(base64),
          'document_id': documentState.message.id,
          'file': file
        })
        chain = chain
          .then(() =>{
            uploadFile(formData, { 'Content-Type': 'multipart/form-data' })
          })
          .catch(error => {
            console.error(error)
          })
      }
    })
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

  const handleVerifyAll = () => {
    if (!checkBrowser('ie')) {
      notification['error']({
        message: 'Ошибка подписания',
        description: 'Подписание файла возможно только в браузере IE'
      })
      return null
    }

    for (let file of list) {
      api.files.getBase64File(file.id)
        .then(({ data }) => {
          if (data.success) {
            try {
              const sertificationObject = window.sign(data.data, file.hash_for_sign)

              const verifiedData = {
                id: file.id,
                hash: sertificationObject.signedData,
                data: sertificationObject.verifiedData,
                hash_for_sign: sertificationObject.hex,
                status: file.status.status_data.id ? file.status.status_data.id : null
              }

              verifyFile(verifiedData)
                .then(response => {
                  if (response.success) {
                    notification['success']({
                      message: 'Файл успешно подписан'
                    })
                  } else {
                    throw new Error(response.error)
                  }
                })
            } catch (error) {
              notification['error']({
                message: error.message
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
  }

  const handleVerifyFile = (item, index) => {
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
            const sertificationObject = window.sign(data.data.encoded_base64_file, item.hash_for_sign)

            const verifiedData = {
              id: item.id,
              hash: sertificationObject.signedData,
              data: sertificationObject.verifiedData,
              hash_for_sign: sertificationObject.hex,
              status: item.status.status_data.id ? item.status.status_data.id : null
            }

            api.documents.attachmentSignCanConfirm({ key: sertificationObject.verifiedData.key, attachment_id: item.id })
              .then(({ data }) => {
                if (data.success) {
                  verifyFile(verifiedData)
                    .then(response => {
                      if (response.success) {
                        notification['success']({
                          message: 'Файл успешно подписан'
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
                } else {
                  throw new Error(data.error)
                }
              })
              .catch(error => {
                notification['error']({
                  message: error.message
                })
              })
          } catch (error) {
            notification['error']({
              message: error.message
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

  const handleChangeStatus = (file, index) => value => {
    changeFileStatus({ attachment_id: file.id, status: value, index: index })
      .then(response => {
      })
  }

  const showEscInfo = (info, type) => {
    setDocumentState({
      ...documentState,
      showModal: true,
      fileInfo: info,
      modalType: type
    })
  }

  const hideEscInfo = () => {
    setDocumentState({
      ...documentState,
      showModal: false,
      fileInfo: []
    })
  }

  const save2DraftDMessage = is2Draft => {
    let coEmails = []
    let UCIds = []
    if (documentState.coNumbers.length > 0)  {
      let coNumbersArray = documentState.coNumbers.split(',')
      coNumbersArray.forEach(element => coEmails.push(element + '@qdx.by'))
    }
    UCIds = documentState.value.length ? documentState.value.map(i => i.key).concat(coEmails) : [].concat(coEmails)
    updateDocumentById(documentState.message.id, {
      name: documentState.name ? documentState.name : 'Без темы',
      description: documentState.description,
      user_company_ids: JSON.stringify(UCIds)
    })
      .then(({ data }) => {
        if (is2Draft) {
          history.push({ pathname: '/documents', search: '?status=1', state: { id: '/documents/1' } })
        } else {
          if (!documentState.value.length > 0 && !documentState.coNumbers.length > 0) {
            message.error('Введите получателя!')
            setDocumentState({
              ...documentState,
              fetching: false
            })
            return null
          }
          sendDocumentToUser({
            document_ids: [documentState.message.id],
            user_company_id: documentState.value.length ? JSON.stringify(documentState.value.map(i => i.key)) : JSON.stringify([])
          }).then(({ success }) => {
            if (success) {
              notification['success']({
                message: 'Ваше сообщение успешно отправлено'
              })
              setDocumentState({ ...defaultDocumentData })
              setMessage(!message)
              getUser()
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
        ...documentState
        // fetching: true
      })
      findUsersByParams(v)
        .then(({ data }) => {
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
            // fetching: false
          })
        })
        .catch(error => {
          message.error(error.message)
        })
    }
  }, 200)

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
  return (
    <Fragment>
      <UploadFiles />
      {!!status &&
        <p>{status}</p>
      }
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
              // disabled={documentState.fetching}
              style={{ width: '100%' }}
            >
              {documentState.data.map(element => <Option key={element.key}>{element.label}</Option>)}
            </Select>

          </div>
          <div className='input-group'>
            <label className='label'>Получатели<br/> по УНП</label>
            <Input kind='text' type='text' value={documentState.coNumbers} onChange={e => updateField('coNumbers', e.target.value)} />
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
            <input
              type='file'
              id='upload'
              hidden
              multiple
              onChange={event => showUploadingModal(event, 'filesLoad')}
              ref={inputNode}
            />

            <label style={{ minWidth: 216 }} className='ant-btn ant-btn-primary ant-btn-background-ghost label-btn' htmlFor='upload'>
              <Icon type='upload' style={{ marginRight: 10 }} />
            Прикрепить файл(ы)
            </label>
          </div>

          <List
            itemLayout='horizontal'
            dataSource={list && list}
            locale={{ emptyText: 'Нет прикрепленных файлов' }}
            style={{ maxHeight: '20rem', overflowY: 'scroll', padding: '1rem' }}
            loading={isFetching}
            renderItem={(i, idx) => (
              <List.Item
                key={i.id}
                actions={[
                  <Icon style={{ color: '#3278fb' }} type={documentState.fileFetch[idx] ? 'loading' : 'edit'} onClick={() => handleVerifyFile(i, idx)} />,
                  <Icon style={{ color: '#3278fb' }} type='delete' onClick={() => handleRemoveFile(i.id)} />
                ]}
              >
                <div className='file-item'>
                  <Text type='secondary' style={{ marginRight: '1rem' }}>{idx + 1}</Text>

                  <Text strong>{i.original_name}</Text>
                </div>
                {!!i.users_companies.length &&
                  <Tag
                    color='#3278fb'
                    style={{ cursor: 'pointer' }}
                    onClick={() => showEscInfo(i.users_companies, 'info')}
                  >ЭЦП</Tag>
                }
                <Select value={i.status.status_data.id} onChange={handleChangeStatus(i, idx)} style={{ marginLeft: 10, minWidth: '20rem' }}>
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
              {list && list.length > 2 && false &&
              <Button
                style={{ marginLeft: '2rem' }}
                type='primary'
                onClick={handleVerifyAll}
              >Подписать все
              </Button>
              }
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
        {documentState.modalType === 'filesLoad' &&
            <Fragment>
              <p>Файлов к загрузке: {documentState.files.length}</p>
              <p>Файлов
                загруженно: {list.filter((i, idx) => documentState.files.find(e => e.name === i.original_name)).length}</p>
              <Progress
                  status='active'
                  percent={Math.floor((
                      list.filter((i, idx) => documentState.files.find(e => e.name === i.original_name)).length / documentState.files.length) * 100)}/>
              {list.filter((i, idx) => documentState.files.find(e => e.name === i.original_name)).length === documentState.files.length
                  ? <Button
                      type='primary'
                      onClick={hideUploadedModal}
                  >Закрыть
                  </Button>
                  : <Button type='primary' disabled={documentState.disabled} onClick={getFiles}>Загрузить</Button>
              }
            </Fragment>
        }
        {documentState.modalType === 'info' &&
        <EscDataSlider data={documentState.fileInfo} onCancel={hideEscInfo} />
        }
      </Modal>
      }
    </Fragment>
  )
}

export default NewDocumentPage
