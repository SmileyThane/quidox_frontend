import React from 'react'

import {
  Table,
  Typography,
  Tag
} from 'antd'

import { styleguide } from '../../../../constants'

const { colors } = styleguide

const { Text } = Typography

export default ({ users }) => {
  const columns = [
    {
      title: 'Имя',
      key: 'name',
      render: record => (
        <>
          <Text>{record.user_data.name && `${record.user_data.name} `}</Text>
          <Text>{record.user_data.patronymic && `${record.user_data.patronymic} `}</Text>
          <Text>{record.user_data.lastname && record.user_data.lastname}</Text>
        </>
      )
    },
    {
      title: 'Телефон',
      key: 'phone',
      render: record => <Text>{record.user_data.phone || ''}</Text>
    },
    {
      title: 'Электронная почта',
      key: 'email',
      render: record => <Text>{record.user_data.email || ''}</Text>
    },
    {
      title: 'Роль',
      key: 'role',
      render: record => <Text>{record.role_name || ''}</Text>
    },
    {
      title: 'ЭЦП',
      render: record => (
        <Tag color={record.is_verified ? colors.green : colors.red}>
          {record.is_verified ? 'Верифицирован' : 'Не верифицирован'}
        </Tag>
      )
    }
  ]

  return (
    <Table
      className='ui-table-list'
      rowKey='id'
      dataSource={users}
      columns={columns}
      locale={{ emptyText: 'Нет данных' }}
    />
  )
}
