import React, { useEffect } from 'react'

import { Table } from '../../components'

const DraftsPage = props => {
  const {
    user: { data },
    documents: { draftDocuments, isFetching },
    getDraftDocumentsByActiveCompany,
    removeDocumentById,
    removeDocumentsByIds
  } = props
  return (
    <div className='content'>
      <Table
        rowKey='id'
        tableData={draftDocuments}
        loading={isFetching}
        className='document-table'
        removeDocument={removeDocumentById}
        removeDocuments={removeDocumentsByIds}
        getDocumentsWithParams={getDraftDocumentsByActiveCompany}
        activeCompany={data.active_company_id}
        type='out-unconfirmed'
        columnName='Получатель'
      />
    </div>
  )
}

export default DraftsPage
