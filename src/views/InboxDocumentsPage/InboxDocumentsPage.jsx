import React, { useEffect } from 'react'

import { Table } from '../../components'

const InboxDocumentsPage = props => {
  const {
    user: { data },
    documents: { isFetching, inboxDocumentsList },
    getInboxDocumentsByActiveCompanyId,
    removeDocumentById,
    removeDocumentsByIds
  } = props

  useEffect(() => {
    if (data) {
      getInboxDocumentsByActiveCompanyId(data.active_company_id)
    }
  }, [data, getInboxDocumentsByActiveCompanyId])

  return (
    <div className='content'>
      <Table
        rowKey='id'
        dataSource={inboxDocumentsList && inboxDocumentsList}
        loading={isFetching}
        className='document-table'
        removeDocument={removeDocumentById}
        removeDocuments={removeDocumentsByIds}
        getDocumentsWithParams={getInboxDocumentsByActiveCompanyId}
        activeCompany={data.active_company_id}
        type='unconfirmed'
        columnName='Отправитель'
      />
    </div>
  )
}

export default InboxDocumentsPage
