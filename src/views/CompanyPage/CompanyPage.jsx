import React, { useEffect } from 'react'

import { Table, Tag } from 'antd'
import './CompanyPage.scss'
const CopmanyPage = props => {
  const {
    getCompany,
    companies: { isFetching, list },
    user: { data }
  } = props

  const getCompanyArray = () => {
    const companyArray = []
    if (list.data) {
      list.data.forEach(element => {
        companyArray.push(element.company_data)
      })
    }
    return companyArray
  }

  const companyArray = getCompanyArray()

  console.log(companyArray)
  useEffect(() => {
    getCompany()
  }, [getCompany, data])

  const columns = [{
    title: 'Имя',
    dataIndex: 'name'
  },
  {
    title: 'УНП',
    dataIndex: 'company_number'
  },
  {
    title: 'Статус',
    render: record => (
      <Tag color={(data.active_company_id && record.id === data.active_company_id) ? '#87d068' : '#FF7D1D'}>Status</Tag>
    )
  }]
  console.log(data.active_company_id)
  return (
    <div className='content'>
      <Table
        pagination={false}
        rowKey='id'
        columns={columns}
        dataSource={companyArray}
        loading={isFetching}
      />
    </div>
  )
}

export default CopmanyPage
