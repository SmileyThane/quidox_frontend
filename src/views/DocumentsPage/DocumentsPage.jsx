import React, { Fragment } from 'react'

import { Table, PageDescription } from '../../components'

const DocumentsPage = props => {

  const {
    user: { data },
    match,
    documents: { documents, isFetching },
    getDocumentsByActiveCompanyId
  } = props

  return (
    <Fragment>
      <div className='content'>
        <Table
          className='document-table'
          tableData={documents}
          loading={isFetching}
          getDocumentsWithParams={getDocumentsByActiveCompanyId}
          activeCompany={data.active_company_id}
          type='draft'
          status={+match.params.id}
        />
      </div>

      <PageDescription
        // isVisible={(draftDocuments.data && !draftDocuments.data.length)}
        title='В эту папку Вы сможете сохранить черновик любого сообщения.'
        text={['Вы сможете в любой момент продолжить редактирование сообщения и отправить его адресату.']}
      />
    </Fragment>
  )
}

export default DocumentsPage
