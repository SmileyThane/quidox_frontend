import React, { useEffect, useState, Fragment } from 'react'

import axios from 'axios'
import { Spin, Icon, List, Tag, Popover, Modal, Select, message } from 'antd'
import history from '../../history'
import { findUsersByParams } from '../../services/api/user'
import _ from 'lodash'
import { Button, PDFViewer } from '../../components'
import PDFJSBACKEND from '../../backends/pdfjs'
import './SingleDocumentPage.scss'

const defaultDocumentState = {
  isVasible: false,
  fileLink: '',
  userData: [],
  showModal: false,
  data: [],
  value: [],
  fetching: false,
  modalType: 'ecp',
  base64files: [],
  certs: [],
  fileHashes: [],
  fileData: []
}

const SingleDocumentPage = props => {
  const {
    document: { isFetching, data },
    match,
    getDocumentById,
    sendDocumentToUser
  } = props

  const [documentState, setDocumentState] = useState({ ...defaultDocumentState })

  useEffect(() => {
    if (match) {
      getDocumentById(match.params.id)
    }
  }, [match, getDocumentById])

  const showModal = item => {
    setDocumentState({
      ...documentState,
      isVasible: true,
      fileLink: item.preview_path
    })
  }

  const hideModal = () => {
    setDocumentState({
      ...documentState,
      isVasible: false
    })
  }

  const splitting = (str) => {
    const arr = []
    str.split(';').forEach(element => {
      arr.push(element.replace(/[-+()><=\s]/g, ' '))
    })
    return arr
  }

  const showUserData = (type, data = {}) => {
    setDocumentState({
      ...documentState,
      showModal: !documentState.showModal,
      userData: data,
      modalType: type
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
      user_company_id: documentState.value.map(i => i.key)
    }
    sendDocumentToUser(docDataToUser)
      .then(() => {
        message.success('Сообщение успешно отправлено!')
        setDocumentState({
          ...documentState,
          fetching: false,
          showModal: false
        })
      })
      .catch(error => {
        message.error(error.message)
        setDocumentState({ ...defaultDocumentState })
      })
  }

  const verifyFile = (base64, index) => {
    var input = document.createElement('input')
    input.type = 'hidden'
    input.id = 'dataFile-' + index
    document.body.appendChild(input)
    document.getElementById('dataFile-' + index).value = base64
    window.sign('File-' + index)
    setTimeout(() => {
      const value = document.getElementById('verifiedData' + 'File-' + index).value
      const signedValue = document.getElementById('signedData' + 'File-' + index).value
      setDocumentState({
        ...documentState,
        base64files: [
          ...documentState.base64files.slice(0, index),
          base64,
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
        setDocumentState({ ...defaultDocumentState })
      })
      .catch(error => {
        message.error(error.message)
      })
  }

  const { Option } = Select

  return (
    <Fragment>
      <Spin spinning={isFetching}>
        <div className='content'>
          <div className='document'>
            <div className='document__header'>
              <div className='document__header_left'>
                <Icon className='document__icon' type='left-square' onClick={() => history.goBack()} />
                <h2 className='document__title'>{data.name}</h2>
              </div>
              <div className='document__header_right'>
                <p className='document__date'>{data.created_at}</p>
              </div>
            </div>
            <div className='document__content'>
              <div className='document__info info'>
                <div className='info__item'>
                  <div className='info__title'>Отправители</div>
                  <div className='info__content'>{data.author && data.author.company_name}</div>
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
                      actions={[
                        <Icon type='edit' style={{ color: '#3278fb', fontSize: 18, marginRight: 5 }} onClick={() => verifyFile(item.encoded_file, index)} />,
                        <a href={item.original_path}><Icon style={{ color: '#3278fb', fontSize: 20 }} type='download' /></a>
                      ]}>
                      <div className='single-document'>
                        <Icon style={{ color: '#3278fb', marginRight: 10, fontSize: 20 }} type='eye' onClick={() => showModal(item)} />
                        <p style={{ marginRight: 10 }} className='single-document__name'>{item.name}</p>
                        {item.users_companies.length ? item.users_companies.map((item, index) => (
                          <Fragment key={index}>
                            {item.is_verified
                              ? <Popover
                                content={
                                  <div>
                                    <p style={{ fontSize: 10 }}>Дата подписи: {item.verification_date}</p>
                                    <p style={{ fontSize: 10 }}>{splitting(item.verification_info)[0]}</p>
                                  </div>
                                }
                              >
                                <Tag onClick={() => showUserData('ecp', splitting(item.verification_info))} style={{ cursor: 'pointer' }} color='#3278fb'>ЭЦП</Tag>
                              </Popover>
                              : null
                            }
                          </Fragment>
                        ))
                          : null
                        }
                      </div>
                    </List.Item>
                  )}
                />
              </div>
            </div>
            <div className='document__actions'>
              <div className='document__actions__left'>
                <Button style={{ marginRight: 15 }} ghost type='primary'>
                  <Icon type='download' />
              Скачать всё
                </Button>
                <Button ghost type='primary'>
                  <Icon type='download' />
              Скачать всё с сигнатурами
                </Button>
              </div>
              <div className='document__actions__right'>
                <Button onClick={() => showUserData('send')} type='primary'>
                  <Icon type='redo' />
                  Перенаправить
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Spin>
      {documentState.isVasible &&
        <div className='pdf-container'>
          <div className='pdf-container__close'>
            <Icon style={{ fontSize: 30 }} type='close' onClick={() => hideModal()} />
          </div>
          {['jpg', 'png', 'jpeg'].includes(documentState.fileLink.split('.').pop())
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
          title={documentState.modalType === 'ecp' ? 'Данные ЭЦП' : 'Получатели'}
          visible
          closable={false}
          footer={null}
        >
          {documentState.modalType === 'ecp'
            ? <Fragment>
              {documentState.userData.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
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
    </Fragment>
  )
}

export default SingleDocumentPage
