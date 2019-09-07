import React, { Fragment } from 'react'

import { PageDescription, Table } from '../../components'

const OutDocumentsPage = props => {
  const {
    user: { data },
    documents: { isFetching, outDocuments },
    getOutDocumentsByActiveCompanyId,
    removeDocumentById,
    removeDocumentsByIds
  } = props
  return (
    <Fragment>
      <div className='content'>
        <Table
          rowKey='id'
          tableData={outDocuments}
          loading={isFetching}
          className='document-table'
          removeDocument={removeDocumentById}
          removeDocuments={removeDocumentsByIds}
          getDocumentsWithParams={getOutDocumentsByActiveCompanyId}
          activeCompany={data.active_company_id}
          type='out-unconfirmed'
          columnName='Получатель'
        />
      </div>

      <PageDescription
        isVisible={(outDocuments.data && !outDocuments.data.length)}
        title='В этой папке будут находится все Ваши отправленные сообщения.'
        text={[
          'После того, как Вы создадите и отправите Ваше первое сообщение - оно будет доступно для просмотра в этой директории.',
          'Чтобы создать свое первое сообщение нажмите кнопку: "+ Новое сообщение" в левом верхнем углу.'
        ]}
      />
    </Fragment>
  )
}

export default OutDocumentsPage
