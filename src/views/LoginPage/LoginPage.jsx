import React from 'react'

import { Link } from 'react-router-dom'
import generateHash from 'random-hash'
import axios from 'axios'
import history from '../../history.js'
import { Form, Icon, Input, Button, Checkbox, message, Typography } from 'antd'
import './LoginPage.scss'
import { Hash } from 'crypto';

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
        values.secret_key = "vBQ1ubVpR9X56EvVOWmDrgrN6NdvZkaObaa7IeIc";
        values.auth_data = generateHash({ length: 10 }) + btoa( JSON.stringify(values)) + generateHash({ length: 5 });
        delete values.email;
        delete values.password;
        delete values.secret_key;
        // console.log('Received values of form: ', Math.random().toString(20).substring(5, 15))
        axios.post('https://api.quidox.by/api/login', values)
          .then(({ data }) => {
            if (data.success) {
              window.localStorage.setItem('authToken', data.data.token)
              history.push('/')
            } else {
              throw new Error(data.error)
            }
          })
          .catch((error) => {
            console.log(error)
            message.error('Пользователь не авторизован или не существует!')
          })
      }
    })
  };

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className='form' style={{ maxHeight: '40rem', maxWidth: '45rem' }}>
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
          <Button type='primary' htmlType='submit' className='login-form-button' style={{ marginTop: '.5rem' }}>
            Войти
          </Button>
          <div style={{ marginTop: '1.5rem' }}>
            <Title level={4}>Начните обмент документами сейчас!<br />Нет аккаунта?</Title>
            <Link to={'/register'}>Зарегистрируйтесь! &nbsp;</Link>
            <Text type='secondary'>
              Вы сможете <strong>бесплатно</strong> обмениваться электронными документами с вашими контрагентами в течении <strong style={{ color: 'red' }}>90</strong> дней.
            </Text>
          </div>
        </Form.Item>
      </Form>
    )
  }
}
const WrappedLogin = Form.create({ name: 'normal_login' })(LoginPage)
export default WrappedLogin
