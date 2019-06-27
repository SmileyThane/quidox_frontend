import React, { Fragment, useEffect, useState } from 'react'

import { Table, Tag } from 'antd'
import './CompanyPage.scss'

const defaultCompanyState = {
  activeCompanyId: null
}

const CopmanyPage = props => {
  const {
    getCompany,
    companies: { isFetching, list },
    user: { data }
  } = props

  useEffect(() => {
    getCompany()
    if (data) {
      setCompanyState({
        activeCompanyId: +data.active_company_id
      })
    }
  }, [data])

  const [companyState, setCompanyState] = useState({ ...defaultCompanyState })

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

  const columns = [{
    title: 'Имя',
    dataIndex: 'name'
  },
  {
    title: 'УНП',
    dataIndex: 'company_number'
  },
  {
    title: 'Данные компании',
    dataIndex: 'description'
  },
  {
    title: 'Статус',
    render: record => (
      <Fragment>
        {companyState.activeCompanyId &&
        <Tag color={(record.id === companyState.activeCompanyId) ? '#87d068' : '#FF7D1D'}>
          {(record.id === companyState.activeCompanyId) ? 'Активная' : 'Не активная'}
        </Tag>
        }
      </Fragment>
    )
  }]
  console.log(list)
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
