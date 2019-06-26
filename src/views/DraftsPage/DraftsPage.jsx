import React, { useEffect } from 'react'

import { Table } from '../../components'

const DraftsPage = props => {
  const {
    user: { data },
    documents: { draftDocumentsList, isFetching },
    getDraftDocumentsByActiveCompany,
    removeDocumentById
  } = props

  useEffect(() => {
    if (data) {
      getDraftDocumentsByActiveCompany(data.active_company_id)
    }
  }, [data])

  return (
    <div className='content'>
      <Table
        rowKey='id'
        dataSource={draftDocumentsList && draftDocumentsList}
        loading={isFetching}
        className='document-table'
        removeDocument={removeDocumentById}
      />
    </div>
  )
}

export default DraftsPage
