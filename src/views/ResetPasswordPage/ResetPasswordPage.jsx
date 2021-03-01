import React from 'react'
import axios from 'axios'
import history from '../../history.js'

import {
  Form,
  Input,
  Typography,
  message
} from 'antd'

import { Button } from '../../components'

import { Layout } from './styled'

const { Title } = Typography

class LoginPage extends React.Component {
  state = {
    email: ''
  }

  handleChange = (value, field) => {
    this.setState({
      [field]: value
    })
  }

  sendEmail = e => {
    e.preventDefault()

    const email = this.state.email

    axios.get(`${process.env.REACT_APP_BASE_URL}/password/reset/${email}`)
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
    const {
      form: {
        getFieldDecorator
      }
    } = this.props

    return (
      <Layout>
        <Layout.Inner>
          <Title level={3}>Сброс пароля</Title>

          <Form
            onSubmit={this.sendEmail}
            colon={false}
          >
            <Form.Item
              label='Введите адрес электронной почты'
              required={false}
            >
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
              <Button
                type='primary'
                htmlType='submit'
                block
              >
                Отправить
              </Button>
            </Form.Item>
          </Form>
        </Layout.Inner>
      </Layout>
    )
  }
}
const WrappedLogin = Form.create({ name: 'normal_login' })(LoginPage)
export default WrappedLogin
