import React, { useState } from 'react'

import axios from 'axios'
import history from '../../history.js'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import './LoginPage.scss'

const defaultLoginData = {
  email: '',
  password: ''
}

class LoginPage extends React.Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = (value, field) => {
    console.log('dfgdfg: ', value, field)
    this.setState({
      [field]: value
    })
  }

  handleSubmit = e => {
    const loginData = {
      email: this.state.email,
      password: this.state.password
    }
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        axios.post('http://192.168.88.125/quidox/public/api/login', values)
          .then((response) => {
            if (response.data.success) {
              window.localStorage.setItem('authToken', response.data.data.token)
              history.push('/')
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }
    })
  };

  render () {
    const { email, password } = this.state
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className='form'>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Пожалуйста, введите адрес электронной почты!' }]
          })(
            <Input
              prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='Адрес электронной почты'
              onChange={e => this.handleChange(e.target.value, 'email')}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Пожалуйста, введите пароль!' }]
          })(
            <Input.Password
              prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
              type='password'
              placeholder='Введите пароль'
              // password
              onChange={e => this.handleChange(e.target.value, 'password')}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(<Checkbox>Запомнить меня</Checkbox>)}
          <a className='login-form-forgot' href=''>
            Забыли пароль?
          </a>
          <Button type='primary' htmlType='submit' className='login-form-button'>
            Войти
          </Button>
          или <a href='#' onClick={e => { e.preventDefault(); history.push('/register') }}>зарегестрируйтесь сейчас!</a>
        </Form.Item>
      </Form>
    )
  }
}
const WrappedLogin = Form.create({ name: 'normal_login' })(LoginPage)
export default WrappedLogin
