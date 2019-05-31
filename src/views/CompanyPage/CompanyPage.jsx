import React, { useEffect } from 'react'

import { Table } from '../../components'
import './CompanyPage.scss'
const CopmanyPage = props => {

  const { getCompany, companies: { isFetching, list } } = props

  console.log(list.data)

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

  useEffect(() => {
    getCompany()
  }, [])

  const columns = [{
    title: 'Имя',
    dataIndex: 'name'
  },
  {
    title: 'Описание',
    dataIndex: 'description'
  },
  {
    title: 'УНП',
    dataIndex: 'company_number'
  }]

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
