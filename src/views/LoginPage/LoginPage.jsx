import React from 'react'

import { Link } from 'react-router-dom'
import axios from 'axios'
import history from '../../history.js'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd'
import './LoginPage.scss'

class LoginPage extends React.Component {
  state = {
    email: '',
    password: ''
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        axios.post('https://api.quidox.by/api/login', values)
          .then((response) => {
            if (response.data.success) {
              window.localStorage.setItem('authToken', response.data.data.token)
              history.push('/')
            }
          })
          .catch((error) => {
            console.log(error)
            message.error(error.message)
          })
      }
    })
  };

  render () {
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
          <Button type='primary' htmlType='submit' className='login-form-button'>
            Войти
          </Button>
          или <Link to={'/register'}>зарегистрируйтесь сейчас!</Link>
        </Form.Item>
      </Form>
    )
  }
}
const WrappedLogin = Form.create({ name: 'normal_login' })(LoginPage)
export default WrappedLogin
