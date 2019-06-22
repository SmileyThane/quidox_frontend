import React, { useEffect } from 'react'

import { Spin } from 'antd'
import history from '../../history'

const SingleDocumentPage = props => {

  const {
    document: { isFetching, data },
    match,
    getDocumentById
  } = props

  useEffect(() => {
    getDocumentById(match.params.id)
  }, [])

  return (
    <Spin spinning={isFetching}>
      <p onClick={() => history.goBack()}>Назад</p>
      <div className='content' />
    </Spin>
  )
}

export default SingleDocumentPage
