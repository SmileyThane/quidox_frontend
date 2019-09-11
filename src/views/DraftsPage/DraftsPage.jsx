import React, { Fragment } from 'react'

import { Table, PageDescription } from '../../components'

const DraftsPage = props => {
  const {
    user: { data },
    documents: { draftDocuments, isFetching },
    getDocumentsByActiveCompanyId
  } = props
  return (
    <Fragment>
      <div className='content'>
        <Table
          className='document-table'
          tableData={draftDocuments}
          loading={isFetching}
          getDocumentsWithParams={getDocumentsByActiveCompanyId}
          activeCompany={data.active_company_id}
          type='draft'
          columnName='Получатель'
          status={1}
        />
      </div>

      <PageDescription
        title='В эту папку Вы сможете сохранить черновик любого сообщения.'
        text={['Вы сможете в любой момент продолжить редактирование сообщения и отправить его адресату.']}
      />
    </Fragment>
  )
}

export default DraftsPage
