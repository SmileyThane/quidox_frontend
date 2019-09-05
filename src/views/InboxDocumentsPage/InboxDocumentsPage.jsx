import React from 'react'

import { Table } from '../../components'

const InboxDocumentsPage = props => {
  const {
    user: { data },
    documents: { isFetching, inboxDocuments },
    getInboxDocumentsByActiveCompanyId,
    removeDocumentById,
    removeDocumentsByIds
  } = props

  return (
    <div className='content'>
      <Table
        rowKey='id'
        tableData={inboxDocuments}
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
