import React, { useEffect, useState, Fragment } from 'react'
import axios from 'axios'
import generateHash from 'random-hash'
import moment from 'moment'
import fileDownload from 'js-file-download'
import _ from 'lodash'

import { api } from '../../services'
import { Spin, Icon, List, Tag, Modal, Select, message, Typography, Popover } from 'antd'
import history from '../../history'
import { findUsersByParams } from '../../services/api/user'
import { Button, PDFViewer } from '../../components'
import PDFJSBACKEND from '../../backends/pdfjs'

import { close } from './img'
import './SingleDocumentPage.scss'

const { Text } = Typography

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
  ecpInfo: null
}
// eslint-disable-next-line spaced-comment
const isIE = /*@cc_on!@*/false || !!document.documentMode

const { Option } = Select

const SingleDocumentPage = props => {
  const {
    document: { isFetching, data },
    match,
    getDocumentById,
    sendDocumentToUser,
    verifyDocument
  } = props

  const [documentState, setDocumentState] = useState({ ...defaultDocumentState })

  useEffect(() => {
    if (match) {
      getDocumentById(match.params.id)
    }
  }, [match, getDocumentById])

  useEffect(() => {
    if (documentState.fileCerts[documentState.activeFileCert]) {
      showUserData('ecp', documentState.fileCerts, documentState.activeFileCert)
    }
  }, [documentState.activeFileCert])

  const showModal = item => {
    axios.get(item['preview_path'], {
      'responseType': 'arraybuffer',
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.getItem('authToken'),
        'Access-Control-Expose-Headers': 'Content-Disposition,X-Suggested-Filename'
      }
    })
      .then(response => {
        console.log(response)
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

  const showUserData = (type, dataArray = []) => {
    let ecpInfo = {}

    if (type === 'ecp') {
      const ecpData = JSON.parse(decodeURIComponent(dataArray[documentState.activeFileCert].verification_info))
      console.log(ecpData.cert)
      ecpInfo = {
        unp: ecpData.cert['1.2.112.1.2.1.1.1.1.2'],
        org: ecpData.subject['2.5.4.3'],
        position: ecpData.cert['1.2.112.1.2.1.1.5.1'],
        address: ecpData.subject['2.5.4.7'] + ' ' + ecpData.subject['2.5.4.9'],
        name: ecpData.subject['2.5.4.4'] + ' ' + ecpData.subject['2.5.4.41'],
        validity_from: ecpData.date[0],
        validity_to: ecpData.date[1]
      }
    }

    setDocumentState({
      ...documentState,
      showModal: true,
      userData: data,
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
      document_ids: data.attachments.map(i => i.document_id),
      user_company_id: JSON.stringify(documentState.value.map(i => i.key))
    }
    sendDocumentToUser(docDataToUser)
      .then(response => {
        if (response.success) {
          message.success('Сообщение успешно отправлено!')
          setDocumentState({
            ...documentState,
            fetching: false,
            showModal: false
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

  const verifyFile = (item, index) => {
    const base64 = item.encoded_file
    var input = document.createElement('input')
    input.type = 'hidden'
    input.id = 'dataFile-' + index
    document.body.appendChild(input)
    document.getElementById('dataFile-' + index).value = base64
    window.sign('File-' + index)
    setTimeout(() => {
      const value = document.getElementById('verifiedData' + 'File-' + index).value
      const signedValue = document.getElementById('signedData' + 'File-' + index).value
      const flashData = JSON.parse(decodeURIComponent(value))
      const key = flashData.cert['1.2.112.1.2.1.1.1.1.2'] + flashData.cert['1.2.112.1.2.1.1.1.1.1']
      const newData = {
        documents: [{
          id: data.id,
          attachments: [
            {
              id: item.id,
              hash: signedValue,
              data: value
            }
          ]
        }]
      }
      api.documents.checkFlashKey({ key: key, attachment_id: item.id })
        .then(({ data }) => {
          if (data.success) {
            verifyDocument(newData)
              .then((response) => {
                console.log('response', response)
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
                  fileDownload(data, `${generateHash({ length: 10 })}.zip`)
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
                <h2 className='document__title'>{data.name}</h2>
              </div>
              <div className='document__header_right'>
                <p className='document__date'>{moment.utc(data.created_at, 'YYYY-MM-DD HH:mm').local().format('DD/MM/YYYY h:mm')}</p>
              </div>
            </div>
            <div className='document__content'>
              <div className='document__info info'>
                <div className='info__item'>
                  <div className='info__title'>Получатели</div>
                  <div className='info__content'>
                    {data.attached_to_users &&
                      data.attached_to_users.map(user => (
                        <div key={user.id} style={{ padding: '.5rem 0' }}>
                          <Text>{user.user_company && user.user_company.user_email}</Text>
                          <br />
                          <Text>{user.user_company && '[ ' + user.user_company.company_name + ' ]'}</Text>
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div className='info__item'>
                  <div className='info__title'>Отправители</div>
                  <div className='info__content'>
                    {data.author &&
                    <div>
                      <Text>{ data.author && data.author.user_email}</Text>
                      <br />
                      <Text>{data.author && '[ ' + data.author.company_name + ' ]'}</Text>
                    </div>
                    }
                  </div>
                </div>
                <div className='info__item'>
                  <div className='info__title'>Комментарий</div>
                  <div className='info__content'>{data.description}</div>
                </div>
              </div>
              <div className='document__attached-doc attached-doc'>
                <List
                  itemLayout='horizontal'
                  dataSource={data.attachments}
                  renderItem={(item, index) => (
                    <List.Item key={index}
                      actions={isIE
                        ? [
                          <Icon type='edit' style={{ color: '#3278fb', fontSize: 18, marginRight: 5 }} onClick={() => verifyFile(item, index)} />,
                          <Icon style={{ color: '#3278fb', fontSize: 20 }} onClick={() => downloadDocumentContent(item, false, true)} type='download' />
                        ]
                        : [
                          <Popover
                            placement='topRight'
                            content={
                              <Fragment>
                                <Text>Подпись файла возможна только в браузере Internet Explorer верифицированным пользователем</Text>
                                <Button type='link'>
                                  Подробнее
                                </Button>
                              </Fragment>
                            }
                          >
                            <Icon type='edit' style={{ color: '#E0E0E0', fontSize: 18, marginRight: 5, cursor: 'not-allowed'}}/>
                          </Popover>,
                          <Icon style={{ color: '#3278fb', fontSize: 20 }} onClick={() => downloadDocumentContent(item, false, true)} type='download' />
                        ]
                      }
                    >
                      <div className='single-document'>
                        <Icon style={{ color: '#3278fb', marginRight: 10, fontSize: 20 }} type='eye' onClick={() => showModal(item)} />
                        <p style={{ marginRight: 10 }} className='single-document__name'>{item.name}</p>
                        {item.users_companies.length
                          ? <Tag
                            onClick={() => showUserData('ecp', item.users_companies)}
                            style={{ cursor: 'pointer' }} color='#3278fb'>
                              ЭЦП {item.users_companies.length}
                          </Tag>
                          : ''
                        }
                      </div>
                    </List.Item>
                  )}
                />
              </div>
            </div>
            { (data && data.attachments) &&
              <Fragment>
                <div className='document__actions'>
                  <div className='document__actions__left'>
                    {data.attachments.length
                      ? <Fragment>
                        <Button style={{ marginRight: 15 }} type='primary' onClick={() => downloadDocumentContent(data, false)}>
                          <Icon type='file-zip' />
                            Скачать всё
                        </Button>
                        <Button type='primary' onClick={() => downloadDocumentContent(data, true)}>
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
          title={null}
          visible
          closable={false}
          footer={null}
        >
          {documentState.modalType === 'ecp'
            ? <Fragment>
              <div className='modal-title'>
                <Text strong>Просмотр ЭЦП, № {documentState.activeFileCert + 1} из {documentState.fileCerts.length} </Text>
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
                    { false && <div className='cert-item'>
                      <Text type='secondary'>OID 2.5.4.10=:</Text>
                    </div>
                    }
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
                      <Text type='secondary'>{documentState.fileCerts[documentState.activeFileCert].created_at}</Text>
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
              <Button style={{ marginTop: 20 }} onClick={() => setDocumentState({ ...documentState, showModal: !documentState.showModal })} type='primary'>Закрыть</Button>
            </Fragment>
            : <Fragment>
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
              <Button style={{ marginTop: 20 }} type='primary' onClick={sendToUser}>Отправить</Button>
              <Button style={{ marginLeft: 20 }} type='primary' ghost onClick={() => setDocumentState({ ...documentState, showModal: false })}>Отмена</Button>
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

// api.documents.checkFlashKey({ key: companyState.newCompanyKey })
//     .then(({ data }) => {
//       console.log(data.success)
//     })
