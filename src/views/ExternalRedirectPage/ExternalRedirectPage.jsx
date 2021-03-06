import React, { Fragment, useEffect } from 'react'
import { Typography } from 'antd'

import { Button } from '../../components'
const { Text } = Typography

const ExternalRedirectPage = props => {

  useEffect(() => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let token = params.get('token');
    window.localStorage.setItem('authToken', token)
    window.close()
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
            window.close()
          }}
        >
          Продолжить
        </Button>

      </Text>
    </Fragment>
  )
}
export default ExternalRedirectPage
