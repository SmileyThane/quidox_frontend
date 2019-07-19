import React, { useEffect, useState, Fragment } from 'react'

import { getFileName } from '../../helpers'
import { Spin, Icon, List, Tag, Popover, Modal } from 'antd'
import history from '../../history'
import { Button, PDFViewer } from '../../components'
import PDFJSBACKEND from '../../backends/pdfjs'
import './SingleDocumentPage.scss'

const defaultDocumentState = {
  isVasible: false,
  fileLink: '',
  userData: [],
  showModal: false
}

const SingleDocumentPage = props => {
  const {
    document: { isFetching, data },
    match,
    getDocumentById
  } = props

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
    const strItem = str.split(';').forEach(element => {
      arr.push(element.replace(/[-+()><=\s]/g, ' '))
    })
    return arr
  }

  const showUserData = (data) => {
    setDocumentState({
      ...documentState,
      showModal: !documentState.showModal,
      userData: data
    })
  }


  const [documentState, setDocumentState] = useState({ ...defaultDocumentState })

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
                    <List.Item key={index} actions={[<a href={item.original_path}><Icon style={{ color: '#3278fb', fontSize: 20 }} type='download' /></a>]}>
                      <div className='single-document'>
                        <Icon style={{ color: '#3278fb', marginRight: 10, fontSize: 20 }} type='eye' onClick={() => showModal(item)} />
                        <p style={{ marginRight: 10 }} className='single-document__name'>{getFileName(item.original_path)}</p>
                        {item.users_companies.length ? item.users_companies.map((item, index) => (
                            <Fragment key={index}>
                              {item.is_verified ? 
                                <Popover 
                                  content={
                                    <div>
                                      <p>Дата подписи: {item.verification_date}</p>
                                      <p>{splitting(item.verification_info)[0]}</p>
                                    </div>
                                  }
                                  >
                                  <Tag  onClick={() => showUserData(splitting(item.verification_info))} style={{ cursor: 'pointer' }} color="#3278fb">ЭЦП</Tag>
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
                <Button type='primary'>
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
            ?
            <div class='img-wrapp'>
              <img class='modal-img' src={documentState.fileLink} alt="img"/>
            </div>
            :
            <PDFViewer
              backend={PDFJSBACKEND}
              src={documentState.fileLink}
            />
          }

        </div>
      }
      {documentState.showModal &&
        <Modal
          title='Данные ЕЦП'
          visible
          closable={false}
          footer={null}
        >
          <Fragment>
            {documentState.userData.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
            <Button style={{ marginTop: 20 }} onClick={() => setDocumentState({ ...documentState, showModal: !documentState.showModal })} type='primary'>Закрыть</Button>
          </Fragment>
        </Modal>
      }
    </Fragment>
  )
}

export default SingleDocumentPage
