import React, { useEffect, useState, Fragment } from 'react'
import axios from 'axios'
import moment from 'moment'

import {
  Icon,
  List, message, Modal, notification, Select, Spin,
  Tag, Tooltip,
  Typography
} from 'antd'

import './SingleDocumentPage.scss'
import { DownloadButtons } from '../SingleDocumentPage/internal'
import { AvestErrorHandling, Button, EscDataSlider, PDFViewer } from '../../components'
import _ from 'lodash'
import { findUsersByParams } from '../../services/api/user'
import { api } from '../../services'
import { copy2Clipboard } from '../../utils'
import { close } from '../../resources/img'
import PDFJSBACKEND from '../../backends/pdfjs'

const defaultDocumentState = {
  isVisible: false,
  fileLink: '',
  fileType: '',
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
  isErrorWitchEcp: false,
  declineMessage: '',
  singleFile: null
}

const { Text, Paragraph } = Typography

const SingleSharedDocumentPage = props => {

  const [message, setMessage, match] = useState(null)
  useEffect(() => {
    const { id, code } = props.match.params
    axios.get(`${process.env.REACT_APP_BASE_URL}/document/${id}/shared/${code}`)
      .then(({ data }) => {
        if (data.success) {
          setMessage(data.data)
        }
      })
  }, [])

  const [documentState, setDocumentState] = useState({ ...defaultDocumentState })

  const getEcpCount = arr => {
    if (arr.length) {
      let acpCount = arr.filter(i => i.verification_hash !== null)
      return acpCount.length
    }
  }

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
        message.error(error.message)
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

  const openModal = type => {
    setDocumentState({
      ...documentState,
      modalType: type,
      showModal: true
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


  const handleMessageShare = () => {
    api.document.getDocumentLink(match.params.id)
      .then(({ data }) => {
        if (data.success) {
          // copy2Clipboard(data.data.shared_link)
          copy2Clipboard(data.data.shared_link)
          notification.success({
            message: 'Ссылка на переход к просмотру документа:\n' +
              window.location.protocol + '//' + window.location.host +
              `${'/document/' + data.data.id + '/shared/' + data.data.verification_code}`
          })
        } else {
          notification.error({
            message: 'Ошибка получения ссылки'
          })
        }
      })
  }

  // const { document, sender, recipient, statuses } = message
  console.log(message)
  return (
    <Fragment>
      {message && Object.keys(message).length &&
      <div className='content'>
        <div className='document'>
          <div className='document__header'>
            <div className='document__header_left'>

              {(message.statuses && message.statuses.length && message.statuses[0].user_company_document_list_id === 1)
                ? <Paragraph
                  className='document-title'
                >
                  {message.document && message.document.name}
                </Paragraph>
                : <h2 className='document__title'>{message.document && message.document.name}</h2>
              }
            </div>

            <div className='document__header_right'>
              <p className='document__date'>
                {moment.utc(message.created_at, 'YYYY-MM-DD HH:mm:ss').local().format('DD/MM/YYYY HH:mm:ss')}
              </p>
            </div>
          </div>
          <div className='document__content'>
            <div className='document__info info'>
              <div className='info__item'>
                <div className='info__title'>Получатели</div>
                <div className='info__content'>
                  {message.recipient &&
                  <div style={{ padding: '.5rem 0' }}>
                    <Text>{message.recipient['user_email']}</Text>
                    <br />
                    <Text>{`[ ${message.recipient['company_name']} ]`}</Text>
                  </div>
                  }
                </div>
              </div>

              <div className='info__item'>
                <div className='info__title'>Отправители</div>
                <div className='info__content'>
                  {message.sender &&
                  <div>
                    <Text>{message.sender.user_email}</Text>
                    <br />
                    <Text>{`[ ${message.sender.company_name} ]`}</Text>
                  </div>
                  }
                </div>
              </div>

              <div className='info__item'>
                <div className='info__title'>Комментарий</div>
                {(message.statuses && message.statuses.length && message.statuses[0].user_company_document_list_id === 1)
                  ? <Paragraph
                    className='info__content'
                  >
                    {message.document && message.document.description}
                  </Paragraph>
                  : <div className='info__content'>{message.document && message.document.description}</div>
                }
              </div>
            </div>
            <div className='document__attached-doc attached-doc'>
              <List
                itemLayout='horizontal'
                locale={{ emptyText: 'Нет приложенных документов' }}
                dataSource={message.document && message.document.attachments}
                style={{ maxHeight: '20rem', overflowY: 'scroll' }}
                renderItem={(item, index) => (
                  <List.Item key={item.id}
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
                    </div>
                  </List.Item>
                )}
              />
            </div>
          </div>
          {(message.document && message.document.attachments) &&
          <Fragment>
            <div className='document__actions'>
              <div className='document__actions__left'>
                {!!message.document.attachments.length &&
                <DownloadButtons document={message.document}/>
                }
              </div>
            </div>
          </Fragment>
          }

        </div>
      </div>
      }
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
        {documentState.modalType === 'error' &&
        <AvestErrorHandling onCancel={handleCloseModal}/>
        }
      </Modal>
      }
    </Fragment>
  )
}

export default SingleSharedDocumentPage
