import React, { useEffect } from 'react'

import { Table } from '../../components'

const SentMessagesPage = props => {
  const {
    user: { data },
    documents: { isFetching, outDocumentsList },
    getOutDocumentsByActiveCompanyId,
    removeDocumentById,
    removeDocumentsByIds
  } = props

  useEffect(() => {
    if (data) {
      getOutDocumentsByActiveCompanyId(data.active_company_id)
    }
  }, [data, getOutDocumentsByActiveCompanyId])

  return (
    <div className='content'>
      <Table
        rowKey='id'
        dataSource={outDocumentsList && outDocumentsList}
        loading={isFetching}
        className='document-table'
        removeDocument={removeDocumentById}
        removeDocuments={removeDocumentsByIds}
        getDocumentsWithParams={getOutDocumentsByActiveCompanyId}
        activeCompany={data.active_company_id}
        type='out'
        columnName='Отправитель'
      />
    </div>
  )
}

export default SentMessagesPage
