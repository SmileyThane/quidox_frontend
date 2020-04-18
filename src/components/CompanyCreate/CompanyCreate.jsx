import React, { useState, Fragment } from 'react'

import { Button, Typography, notification, message } from 'antd'
import { CompanyData } from './styled'
import { decryptionCompanyData, checkBrowser } from '../../utils'
import history from '../../history'

const defaultState = {
  companyData: null,
  isCreate: false
}

const { Text } = Typography
const CompanyCreate = ({ createCompany, onCancel, getUser, redirect = false }) => {
  const [state, setState] = useState({ ...defaultState })

  const handleAgreeCheck = () => {
    try {
      window.pluginLoaded()
      setTimeout(() => {
        const companyData = window.signProcess('123', '123')
        setState({
          ...state,
          companyData: decryptionCompanyData(companyData),
          isCreate: true
        })
        // window.pluginClosed()
      }, 3000)

    } catch (e) {
      notification['error']({
        message: 'Ключ ЭЦП не найден',
        description: 'Проверьте наличие ключа ЭЦП в USB'
      })
    }
  }

  const handleCreateCompany = () => {
    const body = {
      name: companyData.name,
      company_number: companyData.number,
      description: companyData.city,
      registration_date: companyData.date,
      your_position: companyData.position,
      key: companyData.key
    }

    createCompany(body)
      .then(response => {
        if (response.success) {
          setState({ ...defaultState })
          message.success('ЭЦП подключена успешно')
          getUser()
          onCancel()
          if (redirect) {
            history.push('/companies')
          }
        } else {
          throw new Error(response.error)
        }
      })
      .catch(error => {
        message.error(error.message)
      })
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
            <li><Text>Выполнена первичная настройка компьютера по </Text><a href="https://quidox.by/settings_download/"> инструкции</a></li>
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
        // disabled={!checkBrowser('ie')}
        style={{ marginRight: '2rem' }}
        onClick={isCreate ? handleCreateCompany : handleAgreeCheck}>
        {isCreate ? 'Подключить ЭЦП' : 'Продолжить'}
      </Button>
      <Button
        type='primary'
        ghost
        onClick={onCancel}
      >Отмена</Button>
    </Fragment>
  )
}

export default CompanyCreate
