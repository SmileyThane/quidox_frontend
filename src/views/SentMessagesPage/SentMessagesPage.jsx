import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Table, Icon } from 'antd'

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
    key: 'name',
    width: 300,
    render: record => <Link to={`/documents/${record.id}`}>{record.name}</Link>
  },
  {
    title: 'Текст сообщения',
    dataIndex: 'description',
    width: 500
  },
  {
    title: 'Дата создания',
    dataIndex: 'created_at',
    width: 200
  },
  {
    title: 'Действия',
    width: 150,
    render: record => <Icon type='delete' onClick={() => console.log(record.id)} />
  }]

  return (
    <div className='content'>
      <Table
        rowKey='id'
        columns={columns}
        dataSource={outDocumentsList && outDocumentsList}
        loading={isFetching}
        className='document-table'
      />
    </div>
  )
}

export default SentMessagesPage
