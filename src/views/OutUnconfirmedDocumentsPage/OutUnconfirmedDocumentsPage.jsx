import React, { useEffect } from 'react'

import { Table } from '../../components'

const OutUnconfirmedDocumentsPage = props => {
  const {
    user: { data },
    documents: { isFetching, outDocumentsList },
    getOutUnconfirmedDocumentsByActiveCompanyId,
    removeDocumentById,
    removeDocumentsByIds
  } = props

  useEffect(() => {
    if (data) {
      getOutUnconfirmedDocumentsByActiveCompanyId(data.active_company_id)
    }
  }, [data, getOutUnconfirmedDocumentsByActiveCompanyId])

  return (
    <div className='content'>
      <Table
        rowKey='id'
        dataSource={outDocumentsList && outDocumentsList.outUnconfirmedDocuments}
        loading={isFetching}
        className='document-table'
        removeDocument={removeDocumentById}
        removeDocuments={removeDocumentsByIds}
        getDocumentsWithParams={getOutUnconfirmedDocumentsByActiveCompanyId}
        activeCompany={data.active_company_id}
        type='out-unconfirmed'
        columnName='Получатель'
      />
    </div>
  )
}

export default OutUnconfirmedDocumentsPage
