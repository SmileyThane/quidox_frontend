import React, { useEffect } from 'react'

import { Table } from '../../components'

const DraftsPage = props => {
  const {
    user: { data },
    documents: { draftDocumentsList, isFetching },
    getDraftDocumentsByActiveCompany,
    removeDocumentById,
    removeDocumentsByIds
  } = props

  useEffect(() => {
    if (data) {
      getDraftDocumentsByActiveCompany(data.active_company_id)
    }
  }, [data, getDraftDocumentsByActiveCompany])

  return (
    <div className='content'>
      <Table
        rowKey='id'
        dataSource={draftDocumentsList && draftDocumentsList}
        loading={isFetching}
        className='document-table'
        removeDocument={removeDocumentById}
        removeDocuments={removeDocumentsByIds}
        getDocumentsWithParams={getDraftDocumentsByActiveCompany}
        activeCompany={data.active_company_id}
        type='draft'
      />
    </div>
  )
}

export default DraftsPage
