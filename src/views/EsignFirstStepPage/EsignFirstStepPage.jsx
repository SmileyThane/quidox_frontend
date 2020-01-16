import React, { Fragment } from 'react'
import { Typography } from 'antd'

import { Link } from 'react-router-dom'

const { Text } = Typography

const EsignFirstStepPage = props => {
  return (
    <Fragment>
      <Text>
      </Text>
      <Text style={{
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000',
        fontSize: '4rem'
      }} level={1}>
        Быстрый доступ к сервису по ЭЦП <br/>
        <Link to={'/e-sign-login'} style={{ color: 'white', margin:'20px' }} class={'ant-btn ant-btn-primary login-form-button'}>
          Войти
        </Link>
      </Text>

    </Fragment>
  )
}
export default EsignFirstStepPage
