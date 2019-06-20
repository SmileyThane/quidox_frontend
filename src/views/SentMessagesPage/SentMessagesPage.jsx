import React, { useEffect } from 'react'

import { Table } from 'antd'

const SentMessagesPage = props => {
  const {
    user: { data },
    documents: { isFetching, outDocumentsList },
    getOutDocumentsByActiveCompanyId
  } = props

  useEffect(() => {
    if (data) {
      getOutDocumentsByActiveCompanyId(data.active_company_id)
    }
  }, [data])

  const columns = [{
    title: 'Название сообщения',
    dataIndex: 'name'
  },
  {
    title: 'Текст сообщения',
    dataIndex: 'description'
  },
  {
    title: 'Дата создания',
    dataIndex: 'created_at'
  }]

  return (
    <div className='content'>
      <Table
        rowKey='id'
        columns={columns}
        dataSource={outDocumentsList && outDocumentsList}
        loading={isFetching}
      />
    </div>
  )
}

export default SentMessagesPage
