import React, { useEffect } from 'react'

import { Link } from 'react-router-dom'
import { Table, Icon } from 'antd'

const UnconfirmedMessagesPage = props => {
  const {
    user: { data },
    documents: { isFetching, inboxDocuments },
    getInboxUnconfirmedDocumentsByActiveCompanyId
  } = props

  useEffect(() => {
    if (data) {
      getInboxUnconfirmedDocumentsByActiveCompanyId(data.active_company_id)
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
        dataSource={inboxDocuments && inboxDocuments.inboxUnconfirmedDocuments}
        loading={isFetching}
        className='document-table'
      />
    </div>
  )
}

export default UnconfirmedMessagesPage
