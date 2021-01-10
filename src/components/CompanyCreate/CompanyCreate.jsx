import React, { useState, Fragment } from 'react'

import { Typography, notification, message, Tabs } from 'antd'
import { Button } from '../'
import { CompanyData } from './styled'
import { decryptionCompanyData, checkBrowser } from '../../utils'
import history from '../../history'
import { api } from '../../services'
import { Base64 } from 'js-base64'
import axios from 'axios'

const defaultState = {
  companyData: null,
  isCreate: false
}

const { TabPane } = Tabs
const { Text } = Typography
const CompanyCreate = ({ createCompany, onCancel, getUser, user, config, redirect = false }) => {
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

  const tziCompanyCreate = (item) => {
    try {
      let sign = {}
      sign.data = 'bmV3IGNvbXBhbnkK'
      sign.isDetached = true
      sign.token_qdx = 'Bearer ' + window.localStorage.getItem('authToken') || 'Bearer ' + window.sessionStorage.getItem('authToken')
      const request = axios.post('http://127.0.0.1:8083/sign', sign)
        .then(({ data }) => {
          if (data.cms) {
            let body = {}
            body.raw_sign = data.cms
            createCompany(body)
              .then(response => {
                if (response.success) {
                  setState({ ...defaultState })
                  message.success('ЭЦП(ТЗИ) подключена успешно')
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
        })
        .catch(function (error) {
          message.error(error.message)
        })

    } catch (error) {
      notification['error']({
        message: error.message
      })
    }
  }

  const handleCreateCompany = () => {
    const body = {
      name: companyData.name,
      company_number: companyData.number,
      description: companyData.city,
      registration_date: companyData.date,
      position: companyData.position,
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
      <TabPane tab='Mobile ID' key='2'>
        <Fragment>
          <Text type='danger'>Внимание!</Text><br />
          <Text>Процессы подключения ЭЦП на sim-картах к учетной записи пользователя, равно как и процесс подписания имеет ряд особенностей. Процедура отличается от таковой для USB-ключей. </Text>
          <br /><br />
          <Text type='danger'>Общая рекомендуемая последовательность:</Text>
          <ol>
            <li>
              <Text> Войдите в сервис по логину (e-mail) и паролю. Убедитесь, что номер телефона в Вашей учетной записи <strong>совпадает</strong> с номером на SIM-карте с ЭЦП.
                Если номер не совпадает, обратитесь в службу поддержки для изменения номера в учетной записи.
              </Text>
            </li>

            <li>
              <Text>Кликните по кнопке <strong>Подключить ЭЦП</strong> - выберите вкладку <strong>Mobile ID</strong> – нажмите <strong>Подключить</strong></Text>
            </li>

            <li>
              <Text> Проверьте, что Вы разрешили открытие выплывающих окон в браузере.
                В появившемся окне укажите в международном формате номер телефона SIM-карты с ЭЦП,
                дождитесь поступления на Ваш телефон запроса на ввод <strong>PIN 1</strong>.
              </Text>
            </li>

            <li>
              <Text>Введите полученный Вами код из 4 цифр (PIN 1).
                Если все выполнено правильно, и аутентификация пройдена успешно,
                то сервис Вас вернет в рабочее пространство Вашей учетной записи.
              </Text>
            </li>

            <li><Text>Кликните <strong>повторно</strong> по по кнопке <strong>Подключить ЭЦП</strong> - выберите вкладку <strong>Mobile ID</strong> – нажмите <strong>Подключить.</strong></Text></li>

            <li>
              <Text>
                Поскольку аутентификация уже пройдена, сервис отобразит окно запроса на выработку ЭЦП – введите PIN 2.
                Если ЭЦП в момент подключения верная, не является отозванной и нет иных препятствий для ее привязки,
                она подключается к Вашей учетной записи.
              </Text>
            </li>

            <li>
              <Text>В дальнейшем Вы можете осуществлять вход в сервис сразу по <strong>Mobile ID</strong>.</Text>
            </li>
          </ol>
          <Button
            type='primary'
            style={{ marginRight: '2rem' }}
            onClick={handleSimVerifyFile}
          >
            Подключить {simButtonName}
          </Button>
          <Button
            type='primary'
            ghost
            onClick={onCancel}
          >Отмена</Button>
        </Fragment>
      </TabPane>
      <TabPane tab='ТЗИ' key='3'>
        <p>Убедитесь в том, что:</p>
        <ol>
          <li><Text>У Вас установлен комплект абонента ГосСУОК</Text></li>
          <li><Text>Текущий браузер MS Internet Explorer</Text></li>
          <li><Text>Ключ ЭЦП вставлен в компьютер</Text></li>
          <li><Text>Выполнена первичная настройка компьютера по </Text><a href="https://quidox.by/settings_download/"> инструкции</a></li>
        </ol>
        <Button
          type='primary'
          style={{ marginRight: '2rem' }}
          onClick={tziCompanyCreate}
        >
          Подключить
        </Button>
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
