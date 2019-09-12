import React from 'react'

import axios from 'axios'
import history from '../../history.js'
import { Form, Input, Button, message } from 'antd'

import './ResetPasswordPage.scss'

class LoginPage extends React.Component {
  state = {
    email: '',
  }

  handleChange = (value, field) => {
      this.setState({
        [field]: value
      })
  }

  sendEmail = e => {
    e.preventDefault()
    const email = this.state.email
    axios.get(`https://api.quidox.by/api/password/reset/${email}`)
      .then(({ data }) => {
        if (data.success) {
          message.success('Заявка на восстановление пароля успешно отправлена!')
          setTimeout(() => {
            history.push('/login')
          }, 1000)
        } else {
          throw new Error(data.error)
        }
      })
      .catch(error => {
        message.error(error.message)
      })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    console.log(this.state.email)
    return (
      <Form onSubmit={this.sendEmail} className='form form-reset-password' style={{ maxHeight: '20rem', maxWidth: '45rem' }}>
        <Form.Item label='Введите адрес электронной почты'>
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'Не правильный адрес электронной почты!'
              },
              {
                required: true,
                message: 'Пожалуйста, введите адрес электронной почты!'
              }
            ]
          })(
            <Input
              placeholder='Адрес электронной почты'
              onChange={e => {
                this.handleChange(e.target.value, 'email')
              }}
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' className='login-form-button' style={{ marginTop: '.5rem' }}>
            Отправить
          </Button>
        </Form.Item>
      </Form>
    )
  }
}
const WrappedLogin = Form.create({ name: 'normal_login' })(LoginPage)
export default WrappedLogin
