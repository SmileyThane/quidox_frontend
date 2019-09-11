import React, { Fragment } from 'react'

import { Table } from '../../components'

const ArchiveDocumentsPage = props => {

    const {
      user: { data },
      documents: { archiveDocuments, isFetching },
      getDocumentsByActiveCompanyId
    } = props

  return (
    <Fragment>
      <div className='content'>
        <Table
          className='document-table'
          tableData={archiveDocuments}
          loading={isFetching}
          getDocumentsWithParams={getDocumentsByActiveCompanyId}
          activeCompany={data.active_company_id}
          type='archive'
          columnName='Получатель'
          status={4}
        />
      </div>
    </Fragment>
  )
}

export default ArchiveDocumentsPage
