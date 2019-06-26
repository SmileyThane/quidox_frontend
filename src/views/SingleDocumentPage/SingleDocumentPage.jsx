import React, { useEffect } from 'react'

import { Spin, Icon } from 'antd'
import history from '../../history'
import { Button } from '../../components'
import './SingleDocumentPage.scss'

const SingleDocumentPage = props => {

  const {
    document: { isFetching, data },
    match,
    getDocumentById
  } = props

  useEffect(() => {
    getDocumentById(match.params.id)
  }, [])
  console.log(data)
  return (
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
              <p style={{ textAlign: 'center' }}>Нет вложеннный документов</p>
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
  )
}

export default SingleDocumentPage
