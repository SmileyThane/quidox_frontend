import React, { useEffect } from 'react'

import { Table } from '../../components'

const ConfirmMessagesPages = props => {
  const {
    user: { data },
    documents: { isFetching, inboxDocuments },
    getInboxСonfirmedDocumentsByActiveCompanyId,
    removeDocumentById,
    removeDocumentsByIds
  } = props

  useEffect(() => {
    if (data) {
      getInboxСonfirmedDocumentsByActiveCompanyId(data.active_company_id)
    }
  }, [data])

  return (
    <div className='content'>
      <Table
        rowKey='id'
        dataSource={inboxDocuments && inboxDocuments.inboxConfirmedDocuments}
        loading={isFetching}
        className='document-table'
        removeDocument={removeDocumentById}
        removeDocuments={removeDocumentsByIds}
        type='confirmed'
      />
    </div>
  )
}

export default ConfirmMessagesPages
