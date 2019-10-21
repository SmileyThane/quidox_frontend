import React, { useState, Fragment } from 'react'

import {
  Button
} from 'antd'
import {
  AvestErrorHandling
} from '../'
import {
  CompanyData
} from './styled'
import { decryptionCompanyData } from '../../utils'

const defaultState = {
  companyData: null,
  isCreate: false
}
const CompanyCreate = ({ user: { data }, createCompany }) => {
  const [state, setState] = useState({ ...defaultState })

  const handleCreateCompany = () => {
    const companyData = window.sign('123', '123')

    setState({
      ...state,
      companyData: decryptionCompanyData(companyData)
    })
    
  }

  const { companyData, isCreate } = state
  return (
    <Fragment>
      {!isCreate
        ? <p>Проверьте ключ</p>
        :     <CompanyData>
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
        <Button type='primary' onClick={handleCreateCompany}>Create</Button>
      </CompanyData>
      }
    </Fragment>
  )
}

export default CompanyCreate
