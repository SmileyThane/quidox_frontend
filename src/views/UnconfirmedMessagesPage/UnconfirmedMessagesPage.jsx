import React, { useEffect } from 'react'

import { Table } from '../../components'

const UnconfirmedMessagesPage = props => {
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
  }, [data])

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
      />
    </div>
  )
}

export default UnconfirmedMessagesPage
