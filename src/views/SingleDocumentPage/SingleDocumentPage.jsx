import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import fileDownload from 'js-file-download'
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'

import { api } from '../../services'
import { findUsersByParams } from '../../services/api/user'
import { copy2Clipboard } from '../../utils'
import history from '../../history'
import forbiddenEmails from '../../constants/forbiddenEmails'
import PDFJSBACKEND from '../../backends/pdfjs'

import {
  Table,
  Icon,
  List,
  message,
  Modal,
  notification,
  Select,
  Spin,
  Tag,
  Tooltip,
  Typography,
  Descriptions
} from 'antd'

import {
  DownloadButtons,
  FileActions,
  FileHistory
} from './internal'

import {
  LayoutScroll,
  FooterFixed,
  GoBack,
  AvestErrorHandling,
  Button,
  EscDataSlider,
  PDFViewer,
  UploadFiles
} from '../../components'

import { close } from '../../resources/img'

import {
  Layout,
  Header,
  Details,
  Attached
} from './styled'

import { styleguide } from '../../constants'

import './SingleDocumentPage.scss'

var signFetching = false

const { colors } = styleguide

const {
  Title,
  Text,
  Paragraph
} = Typography

const { Column } = Table

const { Option } = Select

const defaultDocumentState = {
  isVisible: false,
  fileLink: '',
  fileType: '',
  showModal: false,
  comment: '',
  commentFile:'',
  commentLink:'',
  data: [],
  value: [],
  fetching: false,
  modalType: 'ecp',
  isHistoryModalOpen: false,
  fileHistory: [],
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
  const [fetch, setFetch] = useState(false)
  const {
    documents: { isFetching, singleDocument },
    match,
    getDocumentById,
    sendDocumentToUser,
    updateDocumentById,
    getUser
  } = props

  const { document, sender, recipient, statuses } = singleDocument

  const [documentState, setDocumentState] = useState({ ...defaultDocumentState })

  useEffect(() => {
    let search = window.location.search
    let params = new URLSearchParams(search)
    let hash = params.get('hash')
    let attachmentId = params.get('attachment_id')
    if (hash && attachmentId) {
      try {
        setFetch(true)
        let id = match.params.id
        axios.get(`${process.env.REACT_APP_BASE_URL}/attachment/sim-sign/check/${attachmentId}?hash=${hash}`, {
          headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem('authToken') || 'Bearer ' + window.sessionStorage.getItem('authToken'),
          }
        })
          .then(response => {
            setFetch(false)
            const { data: { success } } = response
            if (success) {
              message.success('Совершено успешное подписание!')
              getDocumentById(match.params.id)
            } else {
              setFetch(false)
            }
          })
          .catch(error => {
            signFetching = false
            message.error('Извините, что-то пошло не так. Перезагрузите страницу и попробуйте еще раз.')
            // setTimeout(() => {
            // window.location.reload();
            // }, 2000)
          })
      } catch (error) {
        setFetch(false)
      }
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

  const closeHistoryModal = () => {
    setDocumentState({
      ...documentState,
      isHistoryModalOpen: false,
      fileHistory: []
    })
  }

  const openModal = type => {
    documentState.data = documentState.value = [];
    if (singleDocument.status_id === 1 && recipient.id !== sender.id) {
      let value = {"key": recipient['id'], "label": recipient['user_email'] + '[' + recipient['company_name'] +']' };
      documentState.value.push(value);
    }
    setDocumentState({
      ...documentState,
      modalType: type,
      showModal: true
    })
  }

  const setUsersByParams = (v) => {
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

  const fetchUser = _.debounce(v => {
    if (v.length > 2) {
      setDocumentState({
        ...documentState,
        fetching: true
      })
      setUsersByParams(v);
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

  const downloadCommentFile = () => {
    axios.get(documentState.commentLink, {
      'responseType': 'arraybuffer',
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.getItem('authToken') || 'Bearer ' + window.sessionStorage.getItem('authToken'),
        'Access-Control-Expose-Headers': 'Content-Disposition,X-Suggested-Filename'
      }
    })
      .then(({ data }) => {
        if (data) {
          fileDownload(data, documentState.commentFile)
          message.success('Файл успешно загружен!')
        }
      })
      .catch(error => {
        message.error(error.message)
      })
  }

  return (
    <LayoutScroll withFooter>
      <Layout>
        <Layout.Inner>
          <Spin spinning={(isFetching || fetch)}>
            <Header>
              <GoBack />

              <Header.Inner>
                {(statuses && statuses.length && statuses[0].user_company_document_list_id === 1) ? (
                  <Header.Title
                    level={3}
                    editable={{ onChange: handleEditDocumentName }}
                  >
                    {document && document.name}
                  </Header.Title>
                ) : (
                  <Header.Title level={3}>
                    {document && document.name}
                  </Header.Title>
                )}

                <Header.Secondary>
                  {moment.utc(singleDocument.created_at, 'YYYY-MM-DD HH:mm:ss').local().format('DD/MM/YYYY HH:mm:ss')}
                </Header.Secondary>
              </Header.Inner>
            </Header>

            <Details>
              <Details.Inner>
                <Details.Item>
                  <Details.Label>Получатели:</Details.Label>

                  {recipient && (
                    <Details.Info>
                      <Details.Text>{recipient['user_email']}</Details.Text>
                      <Details.Secondary>{recipient['company_name']}</Details.Secondary>
                    </Details.Info>)}
                </Details.Item>

                <Details.Item>
                  <Details.Label>Отправители:</Details.Label>

                  {sender && (
                    <Details.Info>
                      <Details.Text>{sender.user_email}</Details.Text>
                      <Details.Secondary>{sender.company_name}</Details.Secondary>
                    </Details.Info>)}
                </Details.Item>
              </Details.Inner>

              <Details.Inner>
                <Details.Item align='vertical'>
                  <Details.Label>Комментарий:</Details.Label>

                  {(statuses && statuses.length && statuses[0].user_company_document_list_id === 1) ? (
                    <Details.Text editable={{ onChange: handleEditDocumentDescription }}>
                      {document && document.description}
                    </Details.Text>
                  ) : (
                    <Details.Text>{document && document.description}</Details.Text>
                  )}
                </Details.Item>
              </Details.Inner>
            </Details>

            {singleDocument.status_id !== 1 ? (
              <Attached>
                <Table
                  className='ui-table-inside'
                  rowKey={record => record.id}
                  dataSource={document && document.attachments}
                  pagination={false}
                >
                  <Column
                    title='Вложения'
                    dataIndex='name'
                    key='name'
                    width={360}
                    render={(name, record, index) => (
                      <Attached.Name>
                        <Attached.Name.Text>{`${index + 1}. ${name}`}</Attached.Name.Text>
                        <Attached.Name.Type>PDF</Attached.Name.Type>

                        <Tooltip
                          title='Просмотреть содержимое файла'
                          placement='top'
                          arrowPointAtCenter
                        >
                          <Attached.Action onClick={() => showModal(record)}>
                            <Icon type='eye' />
                          </Attached.Action>
                        </Tooltip>

                        <FileActions
                          file={record}
                          documentId={singleDocument.document.id}
                          getDocument={() => getDocumentById(match.params.id)}
                          canBeSigned={singleDocument.can_be_signed}
                          messageId={singleDocument.status_id}
                        />
                      </Attached.Name>
                    )}
                  />

                  <Column
                    title='Тип документа'
                    dataIndex='type'
                    key='type'
                    render={() => <Text>Дополнительное соглашение</Text>}
                  />

                  <Column
                    title='Стоимость'
                    key='amount'
                    dataIndex='amount'
                    render={() => <Text>1000 BYN</Text>}
                  />

                  <Column
                    title='Подписать до'
                    dataIndex='date'
                    key='date'
                    render={() => <Text>30.11.2020</Text>}
                  />

                  <Column
                    title='Статус'
                    dataIndex='status'
                    key='status'
                    render={status => (
                      <Tag color='orange'>{status.status_data.name}</Tag>
                    )}
                  />

                  <Column
                    title='Подписан'
                    dataIndex='users_companies'
                    key='users_companies'
                    align='right'
                    render={companies => (
                      getEcpCount(companies) > 0 && (
                        <Tag
                          color={colors.primary}
                          onClick={() => showUserData('ecp', companies)}
                          style={{ cursor: 'pointer' }}
                        >
                          ЭЦП {getEcpCount(companies)}
                        </Tag>)
                    )}
                  />
                </Table>
              </Attached>
            ) : (
              <UploadFiles document_id={singleDocument.document_id} />
            )}
          </Spin>
        </Layout.Inner>

        {(document && document.attachments) && (
          <FooterFixed>
            <Layout.Actions>
              {singleDocument.status_id === 1 && (
                <Button
                  type='primary'
                  onClick={() => openModal('send')}
                  icon='redo'
                  ghost
                >
                  Отправить
                </Button>)}

              {singleDocument.status_id !== 1 && singleDocument.document.is_chain === 0 && (
                <Button
                  type='primary'
                  onClick={() => openModal('send')}
                  icon='redo'
                  ghost
                >
                  Перенаправить
                </Button>)}

              <Button
                type='primary'
                disabled={singleDocument.status_id === 1}
                onClick={() => handleMessageShare()}
                icon='share-alt'
                ghost
              >
                Поделиться
              </Button>
            </Layout.Actions>

            {!!document.attachments.length && (
              <DownloadButtons document={document} />)}
          </FooterFixed>)}

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
        {documentState.isHistoryModalOpen &&
        <Modal
          visible
          footer={null}
          closable={false}
        >
          <FileHistory history={documentState.fileHistory} />
          <Button type='primary' onClick={closeHistoryModal}>Закрыть</Button>
        </Modal>
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
            <Button  style={{ marginTop: 20 }} disabled={documentState.commentFile == ""} type='primary' onClick={downloadCommentFile}>Скачать вложение</Button>
            <br/>
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
            <p><strong>Проверьте указанных Вами получателей!</strong></p>
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
      </Layout>
    </LayoutScroll>
  )
}

export default SingleDocumentPage
