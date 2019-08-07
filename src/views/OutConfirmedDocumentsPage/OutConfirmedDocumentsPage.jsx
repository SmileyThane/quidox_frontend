import React, { useEffect } from 'react'

import { Table } from '../../components'

const OutConfirmedDocumentsPage = props => {
  const {
    user: { data },
    documents: { isFetching, outDocumentsList },
    getOutСonfirmedDocumentsByActiveCompanyId,
    removeDocumentById,
    removeDocumentsByIds
  } = props

  useEffect(() => {
    if (data) {
      getOutСonfirmedDocumentsByActiveCompanyId(data.active_company_id)
    }
  }, [data, getOutСonfirmedDocumentsByActiveCompanyId])

  return (
    <div className='content'>
      <Table
        rowKey='id'
        dataSource={outDocumentsList && outDocumentsList.outConfirmedDocuments}
        loading={isFetching}
        className='document-table'
        removeDocument={removeDocumentById}
        removeDocuments={removeDocumentsByIds}
        getDocumentsWithParams={getOutСonfirmedDocumentsByActiveCompanyId}
        activeCompany={data.active_company_id}
        type='out-confirmed'
        columnName='Получатель'
      />
    </div>
  )
}

export default OutConfirmedDocumentsPage
