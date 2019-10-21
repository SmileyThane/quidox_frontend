import React from 'react'

import {
  Button
} from 'antd'
import {
  CompanyData
} from './styled'

const CompanyCreate = ({ user: { data }, createCompany }) => {

  console.log('User data', data)

  const handleCreateCompany = () => {
    window.sign()
  }

  return (
    <CompanyData>
      <CompanyData.Item>
        <CompanyData.ItemTitle>
          Дата создания
        </CompanyData.ItemTitle>

        <CompanyData.ItemContent>
        </CompanyData.ItemContent>
      </CompanyData.Item>

      <CompanyData.Item>
        <CompanyData.ItemTitle>
          Имя компании
        </CompanyData.ItemTitle>

        <CompanyData.ItemContent>
        </CompanyData.ItemContent>
      </CompanyData.Item>

      <CompanyData.Item>
        <CompanyData.ItemTitle>
          Дата создания
        </CompanyData.ItemTitle>

        <CompanyData.ItemContent>
        </CompanyData.ItemContent>
      </CompanyData.Item>

      <CompanyData.Item>
        <CompanyData.ItemTitle>
          Место нахождения компании
        </CompanyData.ItemTitle>

        <CompanyData.ItemContent>
        </CompanyData.ItemContent>
      </CompanyData.Item>

      <CompanyData.Item>
        <CompanyData.ItemTitle>
          Должность сотрудника
        </CompanyData.ItemTitle>

        <CompanyData.ItemContent>
        </CompanyData.ItemContent>
      </CompanyData.Item>

      <CompanyData.Item>
        <CompanyData.ItemTitle>
          Цифровой ключ
        </CompanyData.ItemTitle>

        <CompanyData.ItemContent>
        </CompanyData.ItemContent>
      </CompanyData.Item>
      <Button type='primary'>Create</Button>
    </CompanyData>
  )
}

export default CompanyCreate
