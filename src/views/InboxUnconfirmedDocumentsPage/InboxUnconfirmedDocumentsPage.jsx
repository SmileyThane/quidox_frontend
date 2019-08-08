import React, { useEffect } from 'react'

import { Table } from '../../components'

const InboxUnconfirmedDocumentsPage = props => {
  const {
    user: { data },
    documents: { isFetching, inboxDocuments },
    getInboxUnconfirmedDocumentsByActiveCompanyId,
    removeDocumentById,
    removeDocumentsByIds
  } = props

  useEffect(() => {
    if (data) {
      getInboxUnconfirmedDocumentsByActiveCompanyId(data.active_company_id)
    }
  }, [data, getInboxUnconfirmedDocumentsByActiveCompanyId])

  return (
    <div className='content'>
      <Table
        rowKey='id'
        dataSource={inboxDocuments && inboxDocuments.inboxUnconfirmedDocuments}
        loading={isFetching}
        className='document-table'
        removeDocument={removeDocumentById}
        removeDocuments={removeDocumentsByIds}
        getDocumentsWithParams={getInboxUnconfirmedDocumentsByActiveCompanyId}
        activeCompany={data.active_company_id}
        type='unconfirmed'
        columnName='Отправитель'
      />
    </div>
  )
}

export default InboxUnconfirmedDocumentsPage
