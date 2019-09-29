import React, { Fragment } from 'react'

import { Table, PageDescription } from '../../components'

const AttachmentsPage = props => {
  const {
    getDocumentsByActiveCompanyId,
    user: { data },
    documents: { documents, isFetching }
  } = props

  const params = new URLSearchParams(props.location.search)
  const status = params.get('status')

  return (
    <Fragment>
      <div className='content'>
        <Table
          className='document-table'
          tableData={documents}
          loading={isFetching}
          getDocumentsWithParams={getDocumentsByActiveCompanyId}
          activeCompany={data.active_company_id}
          type='attachment'
          status={Number(status)}
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

export default AttachmentsPage
