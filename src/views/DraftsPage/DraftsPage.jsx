import React, { useEffect } from 'react'

import { Table } from 'antd'

const DraftsPage = props => {
  const {
    user: { data },
    drafts: { list, isFetching },
    getDraftsByActiveCompany
  } = props

  useEffect(() => {
    if (data) {
      getDraftsByActiveCompany(data.active_company_id)
    }
  }, [data])

  const columns = [{
    title: 'Название сообщения',
    dataIndex: 'name'
  },
  {
    title: 'Текст сообщения',
    dataIndex: 'description'
  },
  {
    title: 'Дата создания',
    dataIndex: 'created_at'
  }]

  return (
    <div className='content'>
      <Table
        rowKey='id'
        columns={columns}
        dataSource={list && list}
        loading={isFetching}
      />
    </div>
  )
}

export default DraftsPage
