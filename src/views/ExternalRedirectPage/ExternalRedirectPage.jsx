import React, { Fragment, useEffect } from 'react'
import { notification, Typography } from 'antd'

import { Button } from '../../components'
import { api } from '../../services'
import history from '../../history'
// import axios from 'axios'

const { Text } = Typography

const ExternalRedirectPage = props => {

  useEffect(() => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let token = params.get('token');
    console.log(token)
    window.localStorage.setItem('authToken', token)
  }, [])

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
          id={'eSignLogin'}
          type='primary'
          style={{ margin: '30px', fontSize: '1.8rem' }}
          onClick={(event) => {
            event.preventDefault()
            window.open('/', '')
          }}
        >
          Продолжить
        </Button>

      </Text>
    </Fragment>
  )
}
export default ExternalRedirectPage
