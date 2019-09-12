import React, { Fragment } from 'react'

import { Table, Typography } from 'antd'

import './CompanyUsers.scss'

const { Text } = Typography

const columns = [
  {
    title: 'Имя',
    render: record => <Fragment>
      <Text>{record.user_data.name && `${record.user_data.name} `}</Text>
      <Text>{record.user_data.patronymic && `${record.user_data.patronymic} `}</Text>
      <Text>{record.user_data.lastname && record.user_data.lastname}</Text>
    </Fragment>,
    key: 'name'
  },
  {
    title: 'Моб. телефон',
    render: record => <Text>{record.user_data.phone && record.user_data.phone}</Text>,
    key: 'phone'
  },
  {
    title: 'Адрес электронной почты',
    render: record => <Text>{record.user_data.email && record.user_data.email}</Text>,
    key: 'email'
  },
  {
    title: 'Роль',
    render: record => <Text>{record.role_name && record.role_name}</Text>,
    key: 'role'
  },
  {
    title: 'ЭЦП',
    render: record => <Text>{record.user_data.with_verified_companies ? 'Верифицирован' : 'Не верифицирован'}</Text>
  }
]

const CompanyUsers = props => {

  const { users } = props

  return (
    <Table dataSource={users} columns={columns} rowKey='id' locale={{ emptyText: 'Нет данных' }} />
  )
}

export default CompanyUsers
