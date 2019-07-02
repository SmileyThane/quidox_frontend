import React, { useEffect, useState, Fragment } from 'react'

import { getFileName } from '../../helpers'
import { Spin, Icon, List } from 'antd'
import history from '../../history'
import { Button, PDFViewer } from '../../components'
import PDFJSBACKEND from '../../backends/pdfjs'
import './SingleDocumentPage.scss'

const defaultDocumentState = {
  isVasible: false,
  pdfLink: ''
}

const SingleDocumentPage = props => {
  const {
    document: { isFetching, data },
    match,
    getDocumentById
  } = props

  useEffect(() => {
    getDocumentById(match.params.id)
  }, [])

  const onDocumentLoadSuccess = ({ numPages }) => {
    setDocumentState({
      ...documentState,
      numPages
    })
  }

  const showModal = item => {
    setDocumentState({
      ...documentState,
      isVasible: true,
      pdfLink: item.preview_path
    })
  }

  const hideModal = () => {
    setDocumentState({
      ...documentState,
      isVasible: false
    })
  }

  const [documentState, setDocumentState] = useState({ ...defaultDocumentState })

  console.log(data)
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
                  <div className='info__title'>Комментарий</div>
                  <div className='info__content'>{data.description}</div>
                </div>
              </div>
              <div className='document__attached-doc attached-doc'>
                <List
                  itemLayout='horizontal'
                  dataSource={data.attachments}
                  renderItem={item => (
                    <List.Item actions={[<a href={item.original_path}><Icon style={{ color: '#3278fb', fontSize: 20 }} type='download' /></a>]}>
                      <div className='single-document'>
                        <Icon style={{ color: '#3278fb', marginRight: 10, fontSize: 20 }} type='eye' onClick={() => showModal(item)} />
                        <p className='single-document__name'>{getFileName(item.original_path)}</p>
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
            <Icon style={{ fontSize: 30 }} type='close' onClick={() => setDocumentState({ ...documentState, isVasible: false })} />
          </div>
          <PDFViewer
            backend={PDFJSBACKEND}
            src={documentState.pdfLink}
          />
        </div>
      }
    </Fragment>
  )
}

export default SingleDocumentPage
