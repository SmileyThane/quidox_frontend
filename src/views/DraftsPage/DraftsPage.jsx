import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Table } from 'antd'

const DraftsPage = props => {
  const {
    user: { data },
    documents: { draftDocumentsList, isFetching },
    getDraftDocumentsByActiveCompany
  } = props

  useEffect(() => {
    if (data) {
      getDraftDocumentsByActiveCompany(data.active_company_id)
    }
  }, [data])

  const columns = [{
    title: 'Название сообщения',
    key: 'name',
    render: record => <Link to={`/documents/${record.id}`}>{record.name}</Link>
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
        dataSource={draftDocumentsList && draftDocumentsList}
        loading={isFetching}
      />
    </div>
  )
}

export default DraftsPage
