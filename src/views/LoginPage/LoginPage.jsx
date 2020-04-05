import React from 'react'
import { Base64 } from 'js-base64'
import generateHash from 'random-hash'
import axios from 'axios'

import history from '../../history.js'
import { Link } from 'react-router-dom'
import { Button, Checkbox, Form, Icon, Input, message, Typography } from 'antd'

import './LoginPage.scss'

const { Text, Title } = Typography

class LoginPage extends React.Component {
  state = {
    email: '',
    password: ''
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
    const { getFieldDecorator } = this.props.form
    const newPageUrl = `${process.env.REACT_APP_SIM_SCEP_URL}?`+
`client_id=${process.env.REACT_APP_SIM_SCEP_CLIENT_ID}&`+
`response_type=code&`+
`state=1df12rt96cv12&`+
`authentication=phone&`+
`scope=sign&`+
`redirect_uri=${process.env.REACT_APP_SIM_SCEP_CALLBACK}`;
    console.log(newPageUrl)
    return (
      <Form onSubmit={this.handleSubmit} className='form form_login' style={{ minHeight: '40rem', maxWidth: '45rem' }}>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Пожалуйста, введите адрес электронной почты!' }]
          })(
            <Input
              prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }}/>}
              placeholder='Адрес электронной почты'
            />
          )}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{
              required: true,
              message: 'Пожалуйста, введите пароль!',
            }]
          })(
            <Input.Password
              prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }}/>}
              type='password'
              placeholder='Введите пароль'
            />
          )}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(<Checkbox>Запомнить меня</Checkbox>)}
          <Link className='login-form-forgot' to={'/password-recovery'}>
            Забыли пароль?
          </Link>
          <Button type='primary' htmlType='submit' className='login-form-button' style={{ marginTop: '.5rem' }}>
            Войти
          </Button>

          <Link className="ant-btn ant-btn-default login-form-button" style={{ marginTop: '.5rem' }} to="/e-sign-login">Войти
            с помощью ЭЦП</Link>
          <Link className="ant-btn ant-btn-default login-form-button" style={{ marginTop: '.5rem' }} target="_blank"
                onClick={(event) => {
                  event.preventDefault()
                  window.open(newPageUrl, '', 'width=800,height=600')
                }}>Войти с помощью simЭЦП</Link>
          <div style={{ marginTop: '1.5rem' }}>
            <Title level={4}>Начните обмен документами сейчас!<br/>Нет аккаунта?</Title>
            <Link to={'/register'}>Зарегистрируйтесь! &nbsp;</Link>
            <Text type='secondary'>
              Вы сможете <strong>бесплатно</strong> обмениваться электронными документами с вашими контрагентами в
              течении <strong style={{ color: 'red' }}>90</strong> дней.
            </Text>
          </div>
        </Form.Item>
      </Form>
    )
  }
}

const WrappedLogin = Form.create({ name: 'normal_login' })(LoginPage)
export default WrappedLogin
