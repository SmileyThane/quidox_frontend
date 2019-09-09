import React, { Fragment } from 'react'

import { Table, PageDescription } from '../../components'

const DraftsPage = props => {
  const {
    user: { data },
    getDraftDocumentsByActiveCompany,
    removeDocumentById,
    removeDocumentsByIds
  } = props
  return (
    <Fragment>
      <div className='content'>
        <Table
          rowKey='id'
          className='document-table'
          removeDocument={removeDocumentById}
          removeDocuments={removeDocumentsByIds}
          getDocumentsWithParams={getDraftDocumentsByActiveCompany}
          activeCompany={data.active_company_id}
          type='out-unconfirmed'
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
