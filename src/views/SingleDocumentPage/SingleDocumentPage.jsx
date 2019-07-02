import React, { useEffect, useState, Fragment } from 'react'

import { Document, Page, pdfjs } from 'react-pdf'
import { getFileName } from '../../helpers'
import { Spin, Icon, List, Modal } from 'antd'
import history from '../../history'
import { Button } from '../../components'
import './SingleDocumentPage.scss'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const defaultDocumentState = {
  isVasible: false,
  numPages: null,
  pageNumber: 1,
  pdfLink: null
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
                  renderItem={(item, index) => (
                    <List.Item actions={[<Icon style={{ color: '#3278fb', fontSize: 20 }} type='download' />]}>
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
        <Modal
          visible
          onCancel={() => hideModal()}
        >
          <Document
            file={documentState.pdfLink}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={documentState.pageNumber} />
          </Document>
          <p>Page {documentState.pageNumber} of {documentState.numPages}</p>
        </Modal>
      }
    </Fragment>
  )
}

export default SingleDocumentPage
