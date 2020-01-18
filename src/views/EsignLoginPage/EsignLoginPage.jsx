import React, { Fragment } from 'react'
import { notification, Typography } from 'antd'

import { Button } from '../../components'
import { api } from '../../services'
import history from '../../history'
// import axios from 'axios'

const { Text } = Typography

const isIE = /*@cc_on!@*/false || !!document.documentMode

const EsignLoginPage = props => {

  if (isIE) {
    setTimeout(() => {
      try {
        window.pluginLoaded()
      } catch (error) {
      }
    }, 1000)
  }

  const signLogin = () => {
    try {
      const sertificationObject = window.sign('111', '111')
      console.log(sertificationObject.verifiedData)
      api.user.loginByEsign(sertificationObject.verifiedData)
        .then(({ data }) => {
          if (data.success) {
            notification['success']({
              message: 'Вы успешно вошли!'
            })
            window.localStorage.setItem('authToken', data.data.token)
            history.push({ pathname: '/documents', search: '?status=2' })
          } else {
            notification['error']({
              message: 'Ошибка входа!'
            })
          }
        })
    } catch (error) {
      notification['error']({
        message: error.message
      })
    }
  }
  return (
    <Fragment>
      <Text>
      </Text>
      <Text style={{ padding: '30px', maxWidth: '60%', textAlign: 'center', color: '#000', fontSize: '1.5rem' }}
            level={2}>
        Продолжая процедуру входа Вы подтверждаете
        факт ознакомления <br/>
        и принятия условий <a href='https://quidox.by/agreement/'>Публичного договора</a>,<br/>
        согласие с <a href='https://quidox.by/agreement/'>Политикой конфиденциальности</a><br/>
        <Button
          type='primary'
          style={{ margin: '30px', fontSize: '1.8rem' }}

          onClick={signLogin}
        >
          Продолжить
        </Button>

      </Text>
    </Fragment>
  )
}
export default EsignLoginPage
