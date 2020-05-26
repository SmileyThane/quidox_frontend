import React, { useState, Fragment } from 'react'

import { Typography, notification, message, Tabs } from 'antd'
import { Button } from '../'
import { CompanyData } from './styled'
import { decryptionCompanyData, checkBrowser } from '../../utils'
import history from '../../history'
import { api } from '../../services'
import { Base64 } from 'js-base64'

const defaultState = {
  companyData: null,
  isCreate: false
}

const { TabPane } = Tabs
const { Text } = Typography
const CompanyCreate = ({ createCompany, onCancel, getUser, user, redirect = false }) => {
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

  const newPageUrl = `${process.env.REACT_APP_SIM_SCEP_URL}?`+
    `client_id=${process.env.REACT_APP_SIM_SCEP_CLIENT_ID}&`+
    `response_type=code&`+
    `state=${Base64.encode(JSON.stringify({'co_brand_name': 'mts', 'user_id': user.data.id}))}&`+
    `authentication=phone&`+
    `scope=sign&`+
    `redirect_uri=${process.env.REACT_APP_SIM_SCEP_CALLBACK}`;

  const handleSimVerifyFile = () => {
    try {
      api.documents.attachmentSimSign('new_company')
        .then(({ data }) => {
          if (data.success) {
            window.open(data.data, '')
          } else {
            throw new Error(data.error)
          }
        })
        .catch(error => {
          message.error(error.message)
          window.open(newPageUrl, '', 'width=800,height=600')
        })
    } catch (error) {
      notification['error']({
        message: error.message
      })
      window.open(newPageUrl, '', 'width=800,height=600')
    }
  }

  const { companyData, isCreate } = state
  return (
    <Tabs defaultActiveKey='1'>
      <TabPane tab='ЭЦП' key='1'>
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
          style={{ marginRight: '2rem' }}
          onClick={isCreate ? handleCreateCompany : handleAgreeCheck}>
          {isCreate ? 'Подключить ЭЦП' : 'Продолжить'}
        </Button>
        <Button
          type='primary'
          ghost
          onClick={onCancel}
        >Отмена</Button>
      </TabPane>
      <TabPane tab='MTC ID' key='2'>
        <Fragment>
          <p>Убедитесь в том, что:</p>
          <ol>
            <li><Text>У Вас есть сим карта с привязаной к ней ЭЦП</Text></li>
          </ol>
          <Button
            type='primary'
            style={{ marginRight: '2rem' }}
            onClick={handleSimVerifyFile}
          >
            Подключить MTC ID
          </Button>
          <Button
            type='primary'
            ghost
            onClick={onCancel}
          >Отмена</Button>
        </Fragment>
      </TabPane>
      <TabPane disabled tab='ТЗИ' key='3'>
        ТЗИ
        <Button
          type='primary'
          ghost
          onClick={onCancel}
        >Отмена</Button>
      </TabPane>
    </Tabs>
  )
}

export default CompanyCreate
