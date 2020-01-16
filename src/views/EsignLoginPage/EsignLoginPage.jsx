import React, { Fragment, useEffect, useState } from 'react'
import { Base64 } from 'js-base64'
import generateHash from 'random-hash'
import axios from 'axios'
import { CompanyCreate } from '../../components'
import history from '../../history.js'
import {
  Form,
  Button,
  message,
  Typography, notification
} from 'antd'

import './EsignLoginPage.scss'
import { decryptionCompanyData } from '../../utils'

const { Text, Title } = Typography

useEffect(() => {
    setTimeout(() => {
      try {
        window.pluginLoaded()
      } catch (error) {
      }
    }, 1000)
})


class EsignLoginPage extends React.Component {

  handleSubmit = e => {
    e.preventDefault()
    const companyData = window.sign('123', '123')
    console.log(companyData)
    //window.location.reload()
  };

  render () {
    return (
      <Form onSubmit={this.handleSubmit} className='form form_login' style={{ minHeight: '40rem', maxWidth: '45rem' }}>
          <div style={{ marginTop: '1.5rem' }}>
            <Title level={4}>Войдите с помощью ЭЦП!</Title>
            <Text type='secondary'>
              Вы сможете <strong>бесплатно</strong> обмениваться электронными документами с вашими контрагентами в течении <strong style={{ color: 'red' }}>90</strong> дней.
            </Text>
          </div>
        <Button type='primary' htmlType='submit' className='login-form-button' style={{ marginTop: '.5rem' }}>
          Перейти
        </Button>
      </Form>
    )
  }
}

const WrappedLogin = Form.create({ name: 'normal_login' })(EsignLoginPage)
export default WrappedLogin
