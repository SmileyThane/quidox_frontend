import React, { useState } from 'react'
import axios from 'axios'
import { Base64 } from 'js-base64'

import history from '../../history'
// import { api } from '../../services'

import {
  Typography,
  Tabs,
  Steps,
  Alert,
  notification,
  message
} from 'antd'

import { Button } from '../'

import { decryptionCompanyData } from '../../utils'

import { Layout } from './styled'

const defaultState = {
  companyData: null,
  isCreate: false
}

const { TabPane } = Tabs

const { Paragraph } = Typography

export default ({
  createCompany,
  onCancel,
  getUser,
  user,
  config,
  redirect = false
}) => {
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
    const { companyData } = state

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

  const clientId = config.data.co_brand_config ? config.data.co_brand_config.client_id : process.env.REACT_APP_SIM_SCEP_CLIENT_ID
  const callback = config.data.co_brand_config ? config.data.co_brand_config.callback : process.env.REACT_APP_SIM_SCEP_CALLBACK
  const simButtonName = config.data.co_brand_config ? config.data.co_brand_config.co_brand_name + " ID" : 'Mobile  ID'

  const newPageUrl = `${process.env.REACT_APP_SIM_SCEP_URL}?`+
    `client_id=${clientId}&`+
    `response_type=code&`+
    `state=${Base64.encode(JSON.stringify({'co_brand_name': config.data.co_brand_config ? 'mts' : 'quidox', 'user_id': user.data.id}))}&`+
    `authentication=phone&`+
    `scope=sign&`+
    `redirect_uri=${callback}`;

  const handleSimVerifyFile = () => {
    try {
      axios.get(`${process.env.REACT_APP_MTS_URL}/attachment/sim-sign/create/new_company`, {
        headers: {
          'Authorization': 'Bearer ' + window.localStorage.getItem('authToken') || 'Bearer ' + window.sessionStorage.getItem('authToken'),
        }
      })
      // api.documents.attachmentSimSign('')
        .then(({ data }) => {
          if (data.success) {
            window.open(data.data, '_self')
          } else {
            throw new Error(data.error)
          }
        })
        .catch(error => {
          message.error(error.message)
          window.open(newPageUrl, '_self')
        })
    } catch (error) {
      notification['error']({
        message: error.message
      })
      window.open(newPageUrl, '_self')
    }
  }

  return (
    <Layout>
      <Tabs defaultActiveKey='1'>
        <TabPane
          tab='ЭЦП'
          key='1'
        >
          {!state.isCreate ? (
            <Layout.Instruction>
              <Paragraph>Убедитесь в том, что:</Paragraph>

              <Steps
                direction='vertical'
                size='small'
              >
                <Steps.Step status='wait' description='У Вас установлен комплект абонента ГосСУОК' />
                <Steps.Step description='Текущий браузер MS Internet Explorer' />
                <Steps.Step description='Ключ ЭЦП вставлен в компьютер' />
                <Steps.Step description={<>Выполнена первичная настройка компьютера по <a href="https://quidox.by/settings_download/"> инструкции</a></>} />
              </Steps>
            </Layout.Instruction>
          ) : (
            <Layout.List>
              <Layout.Item>
                <Layout.Item.Title>Дата создания:</Layout.Item.Title>
                <Layout.Item.Value>{state.companyData && state.companyData.date}</Layout.Item.Value>
              </Layout.Item>

              <Layout.Item>
                <Layout.Item.Title>УНП:</Layout.Item.Title>
                <Layout.Item.Value>{state.companyData && state.companyData.number}</Layout.Item.Value>
              </Layout.Item>

              <Layout.Item>
                <Layout.Item.Title>Имя компании:</Layout.Item.Title>
                <Layout.Item.Value>{state.companyData && state.companyData.name}</Layout.Item.Value>
              </Layout.Item>

              <Layout.Item>
                <Layout.Item.Title>Место нахождения компании:</Layout.Item.Title>
                <Layout.Item.Value>{state.companyData && state.companyData.city}</Layout.Item.Value>
              </Layout.Item>

              <Layout.Item>
                <Layout.Item.Title>Должность сотрудника:</Layout.Item.Title>
                <Layout.Item.Value>{state.companyData && state.companyData.position}</Layout.Item.Value>
              </Layout.Item>

              <Layout.Item>
                <Layout.Item.Title>Цифровой ключ:</Layout.Item.Title>
                <Layout.Item.Value>{state.companyData && state.companyData.key}</Layout.Item.Value>
              </Layout.Item>
            </Layout.List>
          )}

          <Layout.Actions>
            <Button
              type='primary'
              onClick={onCancel}
              ghost
            >
              Отмена
            </Button>

            <Button
              type='primary'
              onClick={state.isCreate ? handleCreateCompany : handleAgreeCheck}
            >
              {state.isCreate ? 'Подключить ЭЦП' : 'Продолжить'}
            </Button>
          </Layout.Actions>
        </TabPane>

        <TabPane
          tab='Mobile ID'
          key='2'
        >
          <Layout.Mobile>
            <Alert
              message='Внимание!'
              description='Процессы подключения ЭЦП на sim-картах к учетной записи пользователя, равно как и процесс подписания имеет ряд особенностей. Процедура отличается от таковой для USB-ключей.'
              type='info'
              showIcon
            />

            <Paragraph type='danger'>Общая рекомендуемая последовательность:</Paragraph>

            <Steps
              direction='vertical'
              size='small'
            >
              <Steps.Step status='wait' description={<>Войдите в сервис по логину (e-mail) и паролю. Убедитесь, что номер телефона в Вашей учетной записи <strong>совпадает</strong> с номером на SIM-карте с ЭЦП. Если номер не совпадает, обратитесь в службу поддержки для изменения номера в учетной записи.</>} />
              <Steps.Step description={<>Кликните по кнопке <strong>Подключить ЭЦП</strong> - выберите вкладку <strong>Mobile ID</strong> – нажмите <strong>Подключить</strong>.</>} />
              <Steps.Step description={<>Проверьте, что Вы разрешили открытие выплывающих окон в браузере. В появившемся окне укажите в международном формате номер телефона SIM-карты с ЭЦП, дождитесь поступления на Ваш телефон запроса на ввод <strong>PIN 1</strong>.</>} />
              <Steps.Step description='Введите полученный Вами код из 4 цифр (PIN 1). Если все выполнено правильно, и аутентификация пройдена успешно, то сервис Вас вернет в рабочее пространство Вашей учетной записи.' />
              <Steps.Step description={<>Кликните <strong>повторно</strong> по по кнопке <strong>Подключить ЭЦП</strong> - выберите вкладку <strong>Mobile ID</strong> – нажмите <strong>Подключить</strong>.</>} />
              <Steps.Step description='Поскольку аутентификация уже пройдена, сервис отобразит окно запроса на выработку ЭЦП – введите PIN 2. Если ЭЦП в момент подключения верная, не является отозванной и нет иных препятствий для ее привязки, она подключается к Вашей учетной записи.' />
              <Steps.Step description={<>В дальнейшем Вы можете осуществлять вход в сервис сразу по <strong>Mobile ID</strong>.</>} />
            </Steps>

            <Layout.Actions>
              <Button
                type='primary'
                onClick={onCancel}
                ghost
              >
                Отмена
              </Button>

              <Button
                type='primary'
                onClick={handleSimVerifyFile}
              >
                Подключить {simButtonName}
              </Button>
            </Layout.Actions>
          </Layout.Mobile>
        </TabPane>

        <TabPane
          tab='ТЗИ'
          key='3'
          disabled
        />
      </Tabs>
    </Layout>
  )
}
