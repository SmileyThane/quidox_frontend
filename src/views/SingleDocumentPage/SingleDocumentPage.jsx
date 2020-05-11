import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'

import forbiddenEmails from '../../constants/forbiddenEmails'
import history from '../../history'
import PDFJSBACKEND from '../../backends/pdfjs'

import { Icon, List, message, Modal, notification, Select, Spin, Tag, Tooltip, Typography } from 'antd'
import { DownloadButtons, FileActions } from './internal'
import { findUsersByParams } from '../../services/api/user'
import { AvestErrorHandling, Button, EscDataSlider, PDFViewer, UploadFiles } from '../../components'
import { close } from '../../resources/img'

import { api } from '../../services'
import { copy2Clipboard } from '../../utils'
import './SingleDocumentPage.scss'
import GoBack from '../../components/GoBack'

var signFetching = false
const { Text, Paragraph } = Typography
const { Option } = Select

const defaultDocumentState = {
  isVisible: false,
  fileLink: '',
  fileType: '',
  showModal: false,
  comment: '',
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
  isErrorWitchEcp: false,
  declineMessage: '',
  singleFile: null
}

const SingleDocumentPage = props => {

  const {
    documents: { isFetching, singleDocument },
    match,
    getDocumentById,
    sendDocumentToUser,
    updateDocumentById,
    getUser,

  } = props

  const { document, sender, recipient, statuses } = singleDocument

  const [documentState, setDocumentState] = useState({ ...defaultDocumentState })

  useEffect(() => {
    let search = window.location.search
    let params = new URLSearchParams(search)
    let hash = params.get('hash')
    let attachmentId = params.get('attachment_id')
    if (hash && attachmentId) {
      signFetching = true;
      setTimeout(() => {
        try {
          let id = match.params.id
          axios.get(`${process.env.REACT_APP_BASE_URL}/attachment/sim-sign/check/${attachmentId}?hash=${hash}`, {
            headers: {
              'Authorization': 'Bearer ' + window.localStorage.getItem('authToken') || 'Bearer ' + window.sessionStorage.getItem('authToken'),
            }
          })
            .then(({ success }) => {
              if (success) {
                message.success('Совершено успешное подписание!')
                signFetching = false;
                getDocumentById(match.params.id)
              }
            })
            .catch(error => {
              message.error('Система обрабатывает подпись. Пожалуйста подождите!')
              // message.error(error.message)
              setTimeout(() => {
              window.location.reload();
              }, 2000)
            })
        } catch (error) {
        }
      }, 2000)
    }
  }, [])

  useEffect(() => {
    if (match) {
      getDocumentById(match.params.id)
    }
  }, [])

  useEffect(() => {
    if (documentState.isErrorWitchEcp) {
      setTimeout(() => {
        try {
          window.pluginLoaded()
        } catch (error) {
        }
      }, 3000)
    }
  }, [documentState.isErrorWitchEcp])

  const showModal = item => {
    axios.get(item['preview_path'], {
      'responseType': 'arraybuffer',
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.getItem('authToken') || 'Bearer ' + window.sessionStorage.getItem('authToken'),
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
        message.success('Система создает копию для предпросмотра. Пожалуйста подождите!')
        // message.error(error.message)
      })
  }

  const hideModal = () => {
    setDocumentState({
      ...documentState,
      isVisible: false
    })
  }

  const handleCloseModal = () => {
    setDocumentState({
      ...defaultDocumentState
    })
  }

  const showUserData = (type, arr = []) => {
    const dataArray = arr.filter(i => i.verification_hash)
    if (type === 'ecp') {
      setDocumentState({
        ...documentState,
        showModal: true,
        modalType: type,
        fileCerts: dataArray
      })
    }
  }

  const showComment = (type, comment) => {
    setDocumentState({
      ...documentState,
      showModal: true,
      modalType: type,
      comment: comment
    })
  }

  const openModal = type => {
    setDocumentState({
      ...documentState,
      modalType: type,
      showModal: true
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

    if (documentState.value.filter(i => forbiddenEmails.includes(i.key)).length) {
      notification.error({
        message: 'Отправка/перенаправление по реквизиту УНП для данного адресата запрещено. Укажите точный адрес (E-mail) получателя.'
      })
      return false
    }
    console.log(documentState.value.filter(i => forbiddenEmails.includes(i)))
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

  const getEcpCount = arr => {
    if (arr.length) {
      let acpCount = arr.filter(i => i.verification_hash !== null)
      return acpCount.length
    }
  }

  const handleMessageShare = () => {
    api.document.getDocumentLink(match.params.id)
      .then(({ data }) => {
        if (data.success) {
          let link = window.location.protocol + '//' + window.location.host +
            `${'/document/' + data.data.id + '/shared/' + data.data.verification_code}`
          copy2Clipboard(link)
          message.success('Ссылка на переход к просмотру документа:\n' + link)
        } else {
          notification.error({
            message: 'Ошибка получения ссылки'
          })
        }
      })
  }
  console.log(documentState.value)
  // alert('res' + (isFetching || signFetching))

  return (
    <Fragment>
      <Spin spinning={(isFetching ||signFetching)}>
        <div className='content'>
          <div className='document'>
            <div className='document__header'>
              <div className='document__header_left'>
                <GoBack><Icon type='left'/></GoBack>

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
                      <br/>
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
                      <br/>
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
                {singleDocument.status_id !== 1
                  ?
                  <List
                    itemLayout='horizontal'
                    locale={{ emptyText: 'Нет приложенных документов' }}
                    dataSource={document && document.attachments}
                    style={{ maxHeight: '20rem' }}
                    renderItem={(item, index) => (
                      <List.Item key={item.id}
                                 extra={
                                   <FileActions
                                     file={item}
                                     documentId={singleDocument.document.id}
                                     getDocument={() => getDocumentById(match.params.id)}
                                     // isHidden={singleDocument.status_name !== 'Отправленные'}
                                     canBeSigned={singleDocument.can_be_signed}
                                     messageId={singleDocument.status_id}
                                   />
                                 }
                      >
                        <div className='single-document'>
                          <Tooltip
                            title='Просмотреть содержимое файла'
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

                          {item.status && item.status.comment && item.status.comment.length &&
                          <Tooltip
                            title='Просмотреть комментарий'
                            placement='top'
                            arrowPointAtCenter
                          >
                            <Icon type='question-circle' onClick={() => showComment('comment', item.status.comment)}/>
                          </Tooltip>
                          }
                        </div>
                      </List.Item>
                    )}
                  />
                  : <UploadFiles document_id={singleDocument.document_id}/>
                }
              </div>
            </div>

            {(document && document.attachments) &&
            <Fragment>
              <div className='document__actions'>
                <div className='document__actions__left'>
                  {!!document.attachments.length &&
                  <DownloadButtons document={document}/>
                  }
                </div>

                <div className='document__actions__right'>
                  {singleDocument.status_id == 1 &&
                  <Button onClick={() => openModal('send')} type='primary' style={{ marginRight: '1rem' }}>
                    <Icon type='redo'/>
                     Отправить
                  </Button>
                  }
                  {singleDocument.status_id != 1 &&
                  <Button onClick={() => openModal('send')} type='primary' style={{ marginRight: '1rem' }}>
                    <Icon type='redo'/>
                    Перенаправить
                  </Button>
                  }
                  <Button disabled={singleDocument.status_id === 1} onClick={() => handleMessageShare()} type='primary'>
                    <Icon type='share-alt'/>
                    Поделиться
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
          <div className='close' style={{ backgroundImage: `url(${close})` }} onClick={() => hideModal()}/>
        </div>
        {['jpg', 'png', 'jpeg'].includes(documentState.fileType.split('.').pop())
          ? <div className='img-wrapp'>
            <img className='modal-img' src={documentState.fileLink} alt='img'/>
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
        <EscDataSlider onCancel={handleCloseModal} data={documentState.fileCerts}/>
        }
        {documentState.modalType === 'comment' &&
        <div>
          <Text>{documentState.comment}</Text><br/>
          <Button style={{ marginTop: 20 }} type='primary' onClick={handleCloseModal}>Закрыть</Button>
        </div>
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
            notFoundContent={documentState.fetching ? <Spin size='small'/> : null}
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
        <AvestErrorHandling onCancel={handleCloseModal}/>
        }
      </Modal>
      }
    </Fragment>
  )
}

export default SingleDocumentPage
