import React from 'react'

import { Table } from '../../components'

const OutDocumentsPage = props => {
  const {
    user: { data },
    documents: { isFetching, outDocuments },
    getOutDocumentsByActiveCompanyId,
    removeDocumentById,
    removeDocumentsByIds
  } = props

  console.log('outDocuments:', outDocuments)
  return (
    <div className='content'>
      <Table
        rowKey='id'
        tableData={outDocuments}
        loading={isFetching}
        className='document-table'
        removeDocument={removeDocumentById}
        removeDocuments={removeDocumentsByIds}
        getDocumentsWithParams={getOutDocumentsByActiveCompanyId}
        activeCompany={data.active_company_id}
        type='out-unconfirmed'
        columnName='Получатель'
      />
    </div>
  )
}

export default OutDocumentsPage
