import React, { useState, Fragment } from 'react'

import { Button, Typography } from 'antd'
import { CompanyData } from './styled'
import { decryptionCompanyData } from '../../utils'

const defaultState = {
  companyData: null,
  isCreate: false
}

const { Text } = Typography
const CompanyCreate = ({ user: { data }, createCompany }) => {
  const [state, setState] = useState({ ...defaultState })

  const handleAgreeCheck = () => {
    const companyData = window.sign('123', '123')
    setState({
      ...state,
      companyData: decryptionCompanyData(companyData),
      isCreate: true
    })
  }

  const handleCreateCompany = () => {

  }

  const { companyData, isCreate } = state
  return (
    <Fragment>
      {!isCreate
        ? <Fragment>
          <p>Убедитесь в том, что:</p>
          <ol>
            <li><Text>У Вас установлен комплект абонента ГосСУОК</Text></li>
            <li><Text>Текущий браузер MS Internet Explorer</Text></li>
            <li><Text>Ключ ЭЦП вставлен в компьютер</Text></li>
          </ol>
        </Fragment>
        : <CompanyData>
          <CompanyData.Item>
            <CompanyData.ItemTitle>
            Дата создания
            </CompanyData.ItemTitle>

            <CompanyData.ItemContent>
              {companyData && companyData.date}
            </CompanyData.ItemContent>
          </CompanyData.Item>

          <CompanyData.Item>
            <CompanyData.ItemTitle>
            УНП
            </CompanyData.ItemTitle>

            <CompanyData.ItemContent>
              {companyData && companyData.number}
            </CompanyData.ItemContent>
          </CompanyData.Item>

          <CompanyData.Item>
            <CompanyData.ItemTitle>
            Имя компании
            </CompanyData.ItemTitle>

            <CompanyData.ItemContent>
              {companyData && companyData.name}
            </CompanyData.ItemContent>
          </CompanyData.Item>

          <CompanyData.Item>
            <CompanyData.ItemTitle>
            Место нахождения компании
            </CompanyData.ItemTitle>

            <CompanyData.ItemContent>
              {companyData && companyData.city}
            </CompanyData.ItemContent>
          </CompanyData.Item>

          <CompanyData.Item>
            <CompanyData.ItemTitle>
            Должность сотрудника
            </CompanyData.ItemTitle>

            <CompanyData.ItemContent>
              {companyData && companyData.position}
            </CompanyData.ItemContent>
          </CompanyData.Item>

          <CompanyData.Item>
            <CompanyData.ItemTitle>
            Цифровой ключ
            </CompanyData.ItemTitle>

            <CompanyData.ItemContent>
              {companyData && companyData.key}
            </CompanyData.ItemContent>
          </CompanyData.Item>
        </CompanyData>
      }
      <Button
        type='primary'
        onClick={isCreate ? handleCreateCompany : handleAgreeCheck}>
        {isCreate ? 'Создать компанию' : 'Продолжить'}
      </Button>
      <Button type='primary' ghost>Отмена</Button>
    </Fragment>
  )
}

export default CompanyCreate
