import React, { Fragment } from 'react'

import { Table, PageDescription } from '../../components'

import './InboxDocumentsPage.scss'

const InboxDocumentsPage = props => {
  const {
    user: { data },
    documents: { isFetching, inboxDocuments },
    getDocumentsByActiveCompanyId,
    removeDocumentById,
    removeDocumentsByIds
  } = props

  console.log(inboxDocuments)
  return (
    <Fragment>
      <div className='content'>
        <Table
          rowKey='id'
          tableData={inboxDocuments}
          loading={isFetching}
          className='document-table'
          removeDocument={removeDocumentById}
          removeDocuments={removeDocumentsByIds}
          getDocumentsWithParams={getDocumentsByActiveCompanyId}
          activeCompany={data.active_company_id}
          type='unconfirmed'
          columnName='Отправитель'
          status={2}
        />
      </div>

      <PageDescription
        isVisible={(inboxDocuments.data && !inboxDocuments.data.length)}
        title='В этой папке будут находиться все полученные Вами сообщения.'
        text={[
          'Вы сможете просматривать и пересылать входящие сообщения, подписывать и сохранять полученные документы.',
          'Работа только с входящими сообщениями и документами - бесплатно в течение 36 месяцев с момента создания учетной записи. Далее будет взиматься минимальная плата за используемое для хранения дисковое пространство.'
        ]}
      />
    </Fragment>
  )
}

export default InboxDocumentsPage
