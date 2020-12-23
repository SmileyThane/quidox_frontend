import React, { Fragment } from 'react'
import { message, notification, Typography } from 'antd'

import { Button } from '../../components'
import axios from 'axios'
import { Base64 } from 'js-base64'
import { api } from '../../services'
import history from '../../history'
// import axios from 'axios'

const { Text } = Typography

const TZIsignLoginPage = ({ config: { data } }) => {

  const isConfig = data.co_brand_config

  const signLogin = (item) => {
    try {
      let sign = {}
      sign.data = 'bmV3IGNvbXBhbnkK'
      sign.isDetached = true
      sign.token_qdx = window.localStorage.getItem('authToken') || 'Bearer ' + window.sessionStorage.getItem('authToken')
      const request = axios.post('http://127.0.0.1:8083/sign', sign)
        .then(({ data }) => {
          if (data.cms) {
            let signObj = {}
            signObj.raw_sign = data.cms
            api.user.loginByEsign(signObj)
              .then(({ data }) => {
                if (data.success) {
                  notification['success']({
                    message: 'Вы успешно вошли!'
                  })
                  window.sessionStorage.setItem('authToken', data.data.token)
                  history.push({ pathname: '/' })
                } else {
                  notification['error']({
                    message: 'Ошибка входа!'
                  })
                }
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
  return (
    <Fragment>
      <Text style={{ padding: '30px', maxWidth: '60%', textAlign: 'center', color: '#000', fontSize: '1.5rem' }}
            level={2}>
        Продолжая процедуру входа Вы подтверждаете
        факт ознакомления <br/>
        и принятия условий {isConfig
        ? <a href={data.co_brand_config.terms_link}>Правил использования.</a>
        : <>
          <a href='https://quidox.by/agreement/'>Публичного договора,</a>
          <br/>
          согласие с <a href='https://quidox.by/agreement/'>Политикой конфиденциальности</a><br/>
        </>}
        <Button
          id={'eSignLogin'}
          type='primary'
          block
          style={{ margin: '30px', fontSize: '1.8rem', maxWidth: 200 }}
          onClick={signLogin}
        >
          Продолжить
        </Button>

      </Text>
    </Fragment>
  )
}
export default TZIsignLoginPage
