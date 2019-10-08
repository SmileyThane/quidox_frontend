import React, { useEffect, useState, Fragment } from 'react'
import axios from 'axios'
import generateHash from 'random-hash'
import moment from 'moment'
import fileDownload from 'js-file-download'
import _ from 'lodash'

import history from '../../history'
import PDFJSBACKEND from '../../backends/pdfjs'

import { api } from '../../services'
import {
  Spin,
  Icon,
  List,
  Tag,
  Modal,
  Select,
  message,
  Typography,
  Tooltip
} from 'antd'
import { findUsersByParams } from '../../services/api/user'
import { Button, PDFViewer } from '../../components'

import './SingleDocumentPage.scss'
import { close } from './img'

const { Text, Paragraph } = Typography
const { Option } = Select

const disabled = {
  color: '#E0E0E0',
  marginRight: 5,
  fontSize: '1.6rem',
  cursor: 'not-allowed'
}

const normal = {
  color: '#3278fb',
  marginRight: 5,
  fontSize: '1.6rem'
}

const active = {
  color: 'green',
  marginRight: 5,
  fontSize: '1.6rem'
}

const decline = {
  color: 'red',
  marginRight: 5,
  fontSize: '1.6rem'
}

const defaultDocumentState = {
  isVisible: false,
  fileLink: '',
  fileType: '',
  userData: [],
  showModal: false,
  data: [],
  value: [],
  fetching: false,
  modalType: 'ecp',
  base64files: '',
  certs: '',
  fileHashes: '',
  fileData: '',
  fileCerts: [],
  activeFileCert: 0,
  ecpInfo: null,
  isSelectVisible: false,
  isErrorWitchEcp: false
}
// eslint-disable-next-line spaced-comment
const isIE = /*@cc_on!@*/!!window.document.documentMode

const SingleDocumentPage = props => {
  const {
    documents: { isFetching, singleDocument },
    user,
    match,
    getDocumentById,
    sendDocumentToUser,
    updateDocumentById,
    agreeFile,
    getUser,
    verifyDocument
  } = props

  const { document, sender, recipient, statuses } = singleDocument

  const [documentState, setDocumentState] = useState({ ...defaultDocumentState })

  useEffect(() => {
    if (match) {
      getDocumentById(match.params.id)
    }
  }, [])

  useEffect(() => {
    if (documentState.fileCerts[documentState.activeFileCert]) {
      showUserData('ecp', documentState.fileCerts, documentState.activeFileCert)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentState.activeFileCert, documentState.fileCerts.length])

  useEffect(() => {
    if (documentState.isErrorWitchEcp) {
      setTimeout(() => {
        try {
          window.pluginLoaded()
        } catch (error) {
          console.log(error)
        }
      }, 1000)
    }
  }, [documentState.isErrorWitchEcp])

  const showModal = item => {
    axios.get(item['preview_path'], {
      'responseType': 'arraybuffer',
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.getItem('authToken'),
        'Access-Control-Expose-Headers': 'Content-Disposition,X-Suggested-Filename'
      }
    })
      .then(response => {
        const blob = new window.Blob([response.data], { type: 'application/pdf' })
        const blobURL = window.URL.createObjectURL(blob)
        const fileType = response.headers['content-type'].split('/').pop()

        setDocumentState({
          ...documentState,
          isVisible: true,
          fileLink: blobURL,
          fileType: fileType
        })
      })
      .catch(error => {
        message.error(error.message)
      })
  }

  const hideModal = () => {
    setDocumentState({
      ...documentState,
      isVisible: false
    })
  }

  const showUserData = (type, arr = []) => {
    const dataArray = arr.filter(i => i.verification_hash)
    let ecpInfo = {}

    if (type === 'ecp') {
      const ecpData = JSON.parse(decodeURIComponent(dataArray[documentState.activeFileCert].verification_info))
      ecpInfo = {
        unp: ecpData.cert['1.2.112.1.2.1.1.1.1.2'],
        org: ecpData.subject['2.5.4.3'],
        position: ecpData.cert['1.2.112.1.2.1.1.5.1'],
        address: ecpData.subject['2.5.4.7'] + ' ' + ecpData.subject['2.5.4.9'],
        name: ecpData.subject['2.5.4.4'] + ' ' + ecpData.subject['2.5.4.41'],
        validity_from: moment(+ecpData.date[0] * 1000).format('DD/MM/YYYY, hh:mm:ss'),
        validity_to: moment(+ecpData.date[1] * 1000).format('DD/MM/YYYY, hh:mm:ss')
      }
    }

    setDocumentState({
      ...documentState,
      showModal: true,
      userData: document,
      modalType: type,
      fileCerts: dataArray,
      ecpInfo
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
        })
        .catch(error => {
          message.error(error.message)
        })
    }
  }, 200)

  const handleSelect = v => {
    setDocumentState({
      ...documentState,
      data: v,
      value: v
    })
  }

  const sendToUser = () => {
    const docDataToUser = {
      document_ids: [document.id],
      user_company_id: JSON.stringify(documentState.value.map(i => i.key))
    }
    sendDocumentToUser(docDataToUser)
      .then(response => {
        if (response.success) {
          message.success('Сообщение успешно отправлено!')
          getUser()
          setDocumentState({
            ...documentState,
            fetching: false,
            showModal: false,
            isSelectVisible: false
          })
        } else {
          throw new Error(response.error)
        }
      })
      .catch(error => {
        message.error(error.message)
        setDocumentState({ ...defaultDocumentState })
      })
  }

  const resolveEscError = () => {
    setDocumentState({
      ...documentState,
      showModal: false,
      isErrorWitchEcp: true
    })
  }

  const verifyFile = (item, index) => {
    if (!isIE || item.status.status_data.id !== 3) {
      return null
    }
    const base64 = item.encoded_file
    const input = window.document.createElement('input')
    input.type = 'hidden'
    input.id = `dataFile-${index}`
    window.document.body.appendChild(input)
    window.document.getElementById('dataFile-' + index).value = base64
    // document.getElementById(`dataFile-${index}`).value = base64
    try {
      window.sign('File-' + index)

      setTimeout(() => {
        const value = window.document.getElementById('verifiedData' + 'File-' + index).value
        // const value = document.getElementById(`verifiedDataFile-${index}`).value
        const signedValue = window.document.getElementById('signedData' + 'File-' + index).value
        // const signedValue = document.getElementById(`signedDataFile-${index}`).value
        const flashData = JSON.parse(decodeURIComponent(value))
        const key = flashData.cert['2.5.29.14']
        const newData = {
          documents: [{
            id: singleDocument.document.id,
            attachments: [
              {
                id: item.id,
                hash: signedValue,
                data: value,
                status: 5
              }
            ]
          }]
        }
        api.documents.checkFlashKey({ key: key, attachment_id: item.id })
          .then(({ data }) => {
            if (data.success) {
              verifyDocument(newData)
                .then((response) => {
                  if (response.success) {
                    message.success('Файл успешно подписан!')
                    setDocumentState({ ...defaultDocumentState })
                    getDocumentById(match.params.id)
                  } else {
                    throw new Error(response.error)
                  }
                })
                .catch(error => {
                  message.error(error.message)
                })
            } else {
              throw new Error(data.error)
            }
          })
          .catch(error => {
            message.error(error.message)
          })
      }, 1000)
    } catch (error) {
      setDocumentState({
        ...documentState,
        showModal: true,
        isErrorWitchEcp: false,
        modalType: 'error'
      })
    }
  }

  const downloadDocumentContent = (item, withCert, isFile = false) => {
    if (isFile) {
      axios.get(item.original_path, {
        'responseType': 'arraybuffer',
        headers: {
          'Authorization': 'Bearer ' + window.localStorage.getItem('authToken'),
          'Access-Control-Expose-Headers': 'Content-Disposition,X-Suggested-Filename'
        }
      })
        .then(({ data }) => {
          if (data) {
            fileDownload(data, item.name)
            message.success('Файл успешно загружен!')
          }
        })
        .catch(error => {
          message.error(error.message)
        })
    } else {
      api.document.downloadDocument(item.id, withCert)
        .then(({ data }) => {
          console.log(data)
          if (data.success) {
            axios.get(data.data, {
              'responseType': 'arraybuffer',
              headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('authToken'),
                'Access-Control-Expose-Headers': 'Content-Disposition,X-Suggested-Filename'
              }
            })
              .then(({ data }) => {
                if (data) {
                  fileDownload(data, getFileName())
                  message.success('Архив успешно загружен!')
                }
              })
              .catch(error => {
                message.error(error.message)
              })
          } else {
            throw new Error(data.error)
          }
        })
        .catch(error => {
          message.error(error.message)
        })
    }
  }

  const nextCert = () => {
    if (documentState.activeFileCert === documentState.fileCerts.length - 1) {
      return
    }

    setDocumentState({
      ...documentState,
      activeFileCert: documentState.activeFileCert + 1
    })
  }

  const prevCert = () => {
    if (documentState.activeFileCert === 0) {
      return
    }

    setDocumentState({
      ...documentState,
      activeFileCert: documentState.activeFileCert - 1
    })
  }

  const handleEditDocumentName = str => {
    if (str === '') {
      message.error('Поле не может быть пустым')
      return null
    }
    updateDocumentById(document.id, { name: str, description: document.description })
      .then(response => {
        if (response.success) {
          message.success('Данные обновлены')
        } else {
          throw new Error(response.error)
        }
      })
      .catch(error => {
        message.error(error.message)
      })
  }

  const handleEditDocumentDescription = str => {
    if (str === '') {
      message.error('Поле не может быть пустым')
      return null
    }
    updateDocumentById(document.id, { name: document.name, description: str })
      .then(response => {
        if (response.success) {
          message.success('Данные обновлены')
        } else {
          throw new Error(response.error)
        }
      })
      .catch(error => {
        message.error(error.message)
      })
  }

  const handleAgreeFile = item => {
    switch (item.status.status_data.id) {
      case 2: {
        const agreeObject = {
          attachments: [
            {
              id: item.id,
              status: 4
            }
          ]
        }
        agreeFile(agreeObject)
          .then(({ data }) => {
            if (data.success) {
              message.success('Документ согласован')
              getDocumentById(match.params.id)
            } else {
              throw new Error(data.error)
            }
          })
          .catch(error => {
            message.error(error.message)
          })
        break
      }
      default: {
        return null
      }
    }
  }

  const handleDeclineFile = item => {
    switch (item.status.status_data.id) {
      case 1: {
        return null
      }
      case 4: {
        return null
      }
      case 5: {
        return null
      }
      case 6: {
        return null
      }
      default: {
        const declineObject = {
          attachments: [
            {
              id: item.id,
              status: 6
            }
          ]
        }
        agreeFile(declineObject)
          .then(({ data }) => {
            if (data.success) {
              message.success('Документ отклонен')
              getDocumentById(match.params.id)
            } else {
              throw new Error(data.error)
            }
          })
          .catch(error => {
            message.error(error.message)
          })
      }
    }
  }

  const getButtonTooltipText = (id, type) => {
    if (type === 'agree') {
      switch (id) {
        case 2: return 'Согласовать документ'
        case 4: return 'Документ согласован'
        case 6: return 'В согласовании отказано'
        default: return 'Документ не требует согласования'
      }
    } else {
      switch (id) {
        case 2: return 'Отклонить в согласовании'
        case 4: return 'Нельзя отклонить согласованный документ'
        case 6: return 'Документ отклонен'
        default: return 'Документ не требует согласования'
      }
    }
  }

  const getEcpCount = arr => {
    if (arr.length) {
      let acpCount = arr.filter(i => i.verification_hash !== null)
      return acpCount.length
    }
  }

  const getFileName = () => {
    const activeCompanyNumber = user.data.hasOwnProperty('companies') && +user.data.companies.find(i => i.company_id === user.data.active_company_id).company_number
    const senderEmail = sender && sender.user_email
    const documentData = moment.utc(singleDocument.created_at, 'YYYY-MM-DD HH:mm:ss').local().format('DDMMYYYYHHmmss')
    const documentName = document && document.name
    const fullName = `${activeCompanyNumber}_${senderEmail}_${documentData}_${documentName}.zip`
    return fullName
  }

  return (
    <Fragment>
      <Spin spinning={isFetching}>
        <div className='content'>
          <div className='document'>
            <div className='document__header'>
              <div className='document__header_left'>
                <div className='back' onClick={() => history.goBack()} >
                  <Icon type='left' />
                </div>

                {(statuses && statuses.length && statuses[0].user_company_document_list_id === 1)
                  ? <Paragraph
                    className='document-title'
                    editable={{ onChange: handleEditDocumentName }}
                  >
                    {document && document.name}
                  </Paragraph>
                  : <h2 className='document__title'>{document && document.name}</h2>
                }
              </div>

              <div className='document__header_right'>
                <p className='document__date'>
                  {moment.utc(singleDocument.created_at, 'YYYY-MM-DD HH:mm:ss').local().format('DD/MM/YYYY HH:mm:ss')}
                </p>
              </div>
            </div>
            <div className='document__content'>
              <div className='document__info info'>
                <div className='info__item'>
                  <div className='info__title'>Получатели</div>
                  <div className='info__content'>
                    {recipient &&
                      <div style={{ padding: '.5rem 0' }}>
                        <Text>{recipient['user_email']}</Text>
                        <br />
                        <Text>{`[ ${recipient['company_name']} ]`}</Text>
                      </div>
                    }
                  </div>
                </div>

                <div className='info__item'>
                  <div className='info__title'>Отправители</div>
                  <div className='info__content'>
                    {sender &&
                    <div>
                      <Text>{sender.user_email}</Text>
                      <br />
                      <Text>{`[ ${sender.company_name} ]`}</Text>
                    </div>
                    }
                  </div>
                </div>

                <div className='info__item'>
                  <div className='info__title'>Комментарий</div>
                  {(statuses && statuses.length && statuses[0].user_company_document_list_id === 1)
                    ? <Paragraph
                      editable={{ onChange: handleEditDocumentDescription }}
                      className='info__content'
                    >
                      {document && document.description}
                    </Paragraph>
                    : <div className='info__content'>{document && document.description}</div>
                  }
                </div>
              </div>
              <div className='document__attached-doc attached-doc'>
                <List
                  itemLayout='horizontal'
                  locale={{ emptyText: 'Нет приложенных документов' }}
                  dataSource={document && document.attachments}
                  renderItem={(item, index) => (
                    <List.Item key={index}
                      actions={singleDocument.status_name !== 'Отправленные' && [
                        <Tooltip
                          arrowPointAtCenter
                          title={getButtonTooltipText(item.status.status_data.id, 'agree')}
                        >
                          <Icon
                            type='check-circle'
                            style={(() => {
                              switch (item.status.status_data.id) {
                                case 2: return normal
                                case 4: return active
                                default: return disabled
                              }
                            })()}
                            onClick={() => handleAgreeFile(item)}
                          />
                        </Tooltip>,

                        <Tooltip
                          title={getButtonTooltipText(item.status.status_data.id, 'decline')}
                          arrowPointAtCenter>
                          <Icon
                            type='stop'
                            style={(() => {
                              switch (item.status.status_data.id) {
                                case 2: return normal
                                case 3: return normal
                                case 6: return decline
                                default: return disabled
                              }
                            })()}
                            onClick={() => handleDeclineFile(item)} />
                        </Tooltip>,

                        <Tooltip title='Подписать документ' arrowPointAtCenter>
                          <Icon
                            type='edit'
                            style={isIE
                              ? (() => {
                                switch (item.status.status_data.id) {
                                  case 3: return normal
                                  case 5: return active
                                  default: return disabled
                                }
                              })() : disabled}
                            onClick={() => verifyFile(item, index)} />
                        </Tooltip>,

                        <Tooltip
                          title='Скачать документ'
                          placement='topRight'
                          arrowPointAtCenter
                        >
                          <Icon
                            style={{ color: '#3278fb', fontSize: '1.6rem' }}
                            onClick={() => downloadDocumentContent(item, false, true)}
                            type='download'
                          />
                        </Tooltip>
                      ]
                      }
                    >
                      <div className='single-document'>
                        <Tooltip
                          title='Просмотреть содержиоме файла'
                          placement='top'
                          arrowPointAtCenter
                        >
                          <Icon
                            type='eye'
                            style={{ color: '#3278fb', marginRight: 10, fontSize: 20 }}
                            onClick={() => showModal(item)}
                          />
                        </Tooltip>

                        <p style={{ marginRight: 10 }} className='single-document__name'>{item.name}</p>

                        {getEcpCount(item.users_companies) > 0 &&
                        <Tag
                          color='#3278fb'
                          style={{ cursor: 'pointer' }}
                          onClick={() => showUserData('ecp', item.users_companies)}
                        >
                          ЭЦП {getEcpCount(item.users_companies)}
                        </Tag>
                        }

                        {item.status &&
                          <Tag color={item.status.status_data.color}>{item.status.status_data.name}</Tag>
                        }
                      </div>
                    </List.Item>
                  )}
                />
              </div>
            </div>

            { (document && document.attachments) &&
              <Fragment>
                <div className='document__actions'>
                  <div className='document__actions__left'>
                    {document.attachments.length
                      ? <Fragment>
                        <Button
                          type='primary'
                          style={{ marginRight: 15 }}
                          onClick={() => downloadDocumentContent(document, false)}
                        >
                          <Icon type='file-zip' />
                            Скачать всё
                        </Button>

                        <Button
                          type='primary'
                          onClick={() => downloadDocumentContent(document, true)}
                        >
                          <Icon type='file-zip' />
                            Скачать всё с сигнатурами
                        </Button>
                      </Fragment>
                      : ''
                    }
                  </div>

                  <div className='document__actions__right'>
                    <Button onClick={() => showUserData('send')} type='primary'>
                      <Icon type='redo' />
                      Перенаправить
                    </Button>
                  </div>
                </div>
              </Fragment>
            }
          </div>
        </div>
      </Spin>
      {documentState.isVisible &&
        <div className='pdf-container'>
          <div className='pdf-container__close'>
            <div className='close' style={{ backgroundImage: `url(${close})` }} onClick={() => hideModal()} />
          </div>
          {['jpg', 'png', 'jpeg'].includes(documentState.fileType.split('.').pop())
            ? <div className='img-wrapp'>
              <img className='modal-img' src={documentState.fileLink} alt='img' />
            </div>
            : <PDFViewer
              backend={PDFJSBACKEND}
              src={documentState.fileLink}
            />
          }

        </div>
      }
      {documentState.showModal &&
        <Modal
          visible
          closable={false}
          footer={null}
        >
          {documentState.modalType === 'ecp' &&
          <Fragment>
            <div className='modal-title'>
              <Text strong>Просмотр ЭЦП,
                № {documentState.activeFileCert + 1} из {documentState.fileCerts.length} </Text>
              <div className='arr-wrapp' onClick={prevCert}>
                <Icon type='left' />
              </div>
              <div className='arr-wrapp' onClick={nextCert}>
                <Icon type='right' />
              </div>
            </div>
            <div className='cert-modal'>
              <div className='cert-modal__item'>
                <div className='cert-modal__item-left'>
                  <Text type='secondary'>Данные из сертификата ЭЦП</Text>
                </div>

                <div className='cert-modal__item-right'>
                  <div className='cert-item'>
                    <Text type='secondary'>УНП: {documentState.ecpInfo.unp}</Text>
                  </div>

                  <div className='cert-item'>
                    <Text type='secondary'>Организация: {documentState.ecpInfo.org}</Text>
                  </div>

                  <div className='cert-item'>
                    <Text type='secondary'>Должность: {documentState.ecpInfo.position}</Text>
                  </div>

                  <div className='cert-item'>
                    <Text type='secondary'>ФИО: {documentState.ecpInfo.name}</Text>
                  </div>

                  <div className='cert-item'>
                    <Text type='secondary'>Адресс: {documentState.ecpInfo.address}</Text>
                  </div>
                </div>
              </div>
              <div className='cert-modal__item'>
                <div className='cert-modal__item-left'>
                  <Text type='secondary'>Срок действия сертификата</Text>
                </div>

                <div className='cert-modal__item-right'>
                  <div className='cert-item'>
                    <Text type='secondary'>с {documentState.ecpInfo.validity_from}</Text>
                  </div>

                  <div className='cert-item'>
                    <Text type='secondary'>по {documentState.ecpInfo.validity_to}</Text>
                  </div>
                </div>
              </div>

              <div className='cert-modal__item'>
                <div className='cert-modal__item-left'>
                  <Text type='secondary'>Дата создания ЭЦП</Text>
                </div>

                <div className='cert-modal__item-right'>
                  <div className='cert-item'>
                    <Text
                      type='secondary'>{moment.utc(documentState.fileCerts[documentState.activeFileCert].created_at, 'YYYY-MM-DD HH:mm:ss').local().format('DD/MM/YYYY HH:mm:ss')}</Text>
                  </div>
                </div>
              </div>

              <div className='cert-modal-footer'>
                <Text>
                  <strong>&#10003; Проверка Сертификата, СОС: Пройдена</strong>
                </Text><br />

                <Text>
                  <strong>&#10003; Проверка Сигнатуры: Пройдена</strong>
                </Text>
              </div>
            </div>

            <Button
              style={{ marginTop: 20 }}
              onClick={() => setDocumentState({ ...documentState, showModal: !documentState.showModal })}
              type='primary'
            >
              Закрыть
            </Button>
          </Fragment>
          }
          {documentState.modalType === 'send' &&
          <Fragment>
            <Text>Получатели:</Text>
            <Select
              mode='tags'
              labelInValue
              tokenSeparators={[',']}
              value={documentState.value}
              filterOption={false}
              notFoundContent={documentState.fetching ? <Spin size='small' /> : null}
              onSearch={fetchUser}
              onChange={handleSelect}
              style={{ width: '100%', margin: '2rem 0 5rem 0' }}
            >
              {documentState.data.map(element => <Option key={element.key}>{element.label}</Option>)}
            </Select>

            <Button
              type='primary'
              style={{ marginTop: 20 }}
              onClick={sendToUser}
            >
              Отправить
            </Button>

            <Button
              type='primary'
              style={{ marginLeft: 20 }}
              onClick={() => setDocumentState({ ...documentState, showModal: false })}
              ghost
            >
              Отмена
            </Button>
          </Fragment>
          }

          {documentState.modalType === 'error' &&
          <Fragment>
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
          </Fragment>
          }

        </Modal>
      }
      <input type='hidden' id='attr' size='80' value='1.2.112.1.2.1.1.1.1.2' />

      <input type='hidden' id='companyData' />

      <div id='attrCertSelectContainer' style={{ display: 'none' }}>
        <span id='certExtAbsent' />

        <select style={{ visibility: 'hidden' }} id='attrCertSelect' />
      </div>

      <input type='hidden' id='attrValue' size='80' disabled='disabled' />
    </Fragment>
  )
}

export default SingleDocumentPage
