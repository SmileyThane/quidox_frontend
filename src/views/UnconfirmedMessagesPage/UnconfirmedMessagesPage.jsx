import React, { useEffect } from 'react'

import { Table } from 'antd'

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
        dataSource={inboxDocuments && inboxDocuments.inboxUnconfirmedDocuments}
        loading={isFetching}
      />
    </div>
  )
}

export default UnconfirmedMessagesPage
