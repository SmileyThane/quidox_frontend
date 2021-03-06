import React from 'react'
import { Base64 } from 'js-base64'
import generateHash from 'random-hash'
import axios from 'axios'

import history from '../../history.js'
import { Link } from 'react-router-dom'
import { Button, RouterLink } from '../../components'
import { Form, Icon, Input, message, Typography, Spin } from 'antd'

import './LoginPage.scss'


const { Text, Title } = Typography

class LoginPage extends React.Component {
  state = {
    email: '',
    password: '',
    fetching: false
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.secret_key = process.env.REACT_APP_SECRET_KEY
        values.auth_data = generateHash({ length: 10 }) + Base64.encode(JSON.stringify(values)) + generateHash({ length: 5 })
        delete values.email
        delete values.password
        delete values.secret_key
        axios.post(`${process.env.REACT_APP_BASE_URL}/login`, values)
          .then(({ data }) => {
            if (data.success) {
              window.localStorage.setItem('authToken', data.data.token)
              window.carrotquest.auth(data.data.id, data.data.cc_token)
              history.push('/')
            } else {
              throw new Error(data.error)
            }
          })
          .catch(error => {
            message.error(error.message)
          })
      }
    })
  }

  render () {
    const { config: { data } } = this.props
    const { getFieldDecorator } = this.props.form

    const clientId = data.co_brand_config ? data.co_brand_config.client_id : process.env.REACT_APP_SIM_SCEP_CLIENT_ID
    const callback = data.co_brand_config ? data.co_brand_config.callback : process.env.REACT_APP_SIM_SCEP_CALLBACK

    const simButtonName = data.co_brand_config ? data.co_brand_config.co_brand_name : 'Mobile'

    const newPageUrl = `${process.env.REACT_APP_SIM_SCEP_URL}?`+
      `client_id=${clientId}&`+
      `response_type=code&`+
      `state=${Base64.encode(JSON.stringify({'co_brand_name': data.co_brand_config ? 'mts' : 'quidox', 'user_id': 0}))}&`+
      `authentication=phone&`+
      `scope=sign&`+
      `redirect_uri=${callback}`;

    if (this.state.fetching) {
      return <Spin />
    }

    return (
      <Form onSubmit={this.handleSubmit} className='form form_login' style={{ minHeight: '40rem', maxWidth: '45rem' }}>
        <label>E-mail:</label>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Пожалуйста, введите адрес электронной почты!' }]
          })(
            <Input name={'email'}
              prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }}/>}
              placeholder='Введите адрес электронной почты'
            />
          )}
        </Form.Item>
        <label>Пароль:</label>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{
              required: true,
              message: 'Пожалуйста, введите пароль!',
            }]
          })(
            <Input.Password
              name={'password'}
              prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }}/>}
              type='password'
              placeholder='Введите пароль'
            />
          )}
        </Form.Item>

        <Form.Item>
          <RouterLink className='login-form-forgot' to={'/password-recovery'}>
            Забыли пароль?
          </RouterLink>
          <Button type='primary' name={'loginButton'} htmlType='submit' className='login-form-button' style={{ marginTop: '.5rem' }}>
            Войти
          </Button>

          <Link className="ant-btn ant-btn-default login-form-button" style={{ marginTop: '.5rem' }} to="/e-sign-login">
            Войти с помощью ЭЦП
          </Link>
          <Link className="ant-btn ant-btn-default login-form-button" style={{ marginTop: '.5rem' }} to="/tzi-sign-login">
            Войти с помощью ЭЦП(ТЗИ)
          </Link>
          <Link className="ant-btn ant-btn-default login-form-button" style={{ marginTop: '.5rem' }}
            onClick={(event) => {
              event.preventDefault()
              window.open(newPageUrl, '_self')
            }}>
            Войти с помощью {simButtonName} ID
          </Link>
          <div style={{ marginTop: '1.5rem' }}>
            <Title level={4}>Начните обмен документами сейчас!<br/>Нет аккаунта?</Title>
            <RouterLink to={'/register'}>Зарегистрируйтесь! &nbsp;</RouterLink>
          </div>
        </Form.Item>
      </Form>
    )
  }
}

const WrappedLogin = Form.create({ name: 'normal_login' })(LoginPage)
export default WrappedLogin
