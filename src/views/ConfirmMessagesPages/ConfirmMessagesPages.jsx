import React, { useEffect } from 'react'
import { Table } from 'antd'

const ConfirmMessagesPages = props => {
  const {
    user: { data },
    documents: { isFetching, inboxDocuments },
    getInboxСonfirmedDocumentsByActiveCompanyId
  } = props

  useEffect(() => {
    if (data) {
      getInboxСonfirmedDocumentsByActiveCompanyId(data.active_company_id)
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
        dataSource={inboxDocuments && inboxDocuments.inboxConfirmedDocuments}
        loading={isFetching}
      />
    </div>
  )
}

export default ConfirmMessagesPages
