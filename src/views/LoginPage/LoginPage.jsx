import React from 'react'
import { Link } from 'react-router-dom'
import { Base64 } from 'js-base64'
import generateHash from 'random-hash'
import axios from 'axios'

import history from '../../history.js'

import {
  Form,
  Input,
  Typography,
  Spin,
  message
} from 'antd'

import { Button } from '../../components'

import { Layout } from './styled'

const {
  Title,
  Paragraph
} = Typography

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

    const newPageUrl = `${process.env.REACT_APP_SIM_SCEP_URL}?` +
      `client_id=${clientId}&` +
      `response_type=code&` +
      `state=${Base64.encode(JSON.stringify({ 'co_brand_name': data.co_brand_config ? 'mts' : 'quidox', 'user_id': 0 }))}&` +
      `authentication=phone&` +
      `scope=sign&` +
      `redirect_uri=${callback}`

    if (this.state.fetching) {
      return <Spin />
    }

    return (
      <Layout>
        <Layout.Inner>
          <Title level={3}>Вход</Title>

          <Form
            colon={false}
            onSubmit={this.handleSubmit}
          >
            <Form.Item
              label='Электронная почта'
              required={false}
            >
              {getFieldDecorator('email', {
                rules: [{
                  required: true,
                  message: 'Пожалуйста, введите адрес электронной почты!'
                }]
              })(
                <Input
                  name='email'
                  placeholder='Введите адрес электронной почты'
                />
              )}
            </Form.Item>

            <Form.Item
              label='Пароль'
              required={false}
            >
              {getFieldDecorator('password', {
                rules: [{
                  required: true,
                  message: 'Пожалуйста, введите пароль!'
                }]
              })(
                <Input.Password
                  name='password'
                  type='password'
                  placeholder='Введите пароль'
                />
              )}
            </Form.Item>

            <Form.Item>
              <Link className='login-form-forgot' to={'/password-recovery'}>
                Забыли пароль?
              </Link>

              <Layout.Actions>
                <Button
                  type='primary'
                  htmlType='submit'
                  block
                >
                  Войти
                </Button>

                <Link to='/e-sign-login'>
                  <Button
                    type='primary'
                    ghost
                    block
                  >
                    Войти с помощью ЭЦП
                  </Button>
                </Link>

                <Button
                  type='primary'
                  onClick={() => window.open(newPageUrl, '_self')}
                  ghost
                  block
                >
                  Войти с помощью {simButtonName} ID
                </Button>

                <Layout.Actions.Register>
                  <Paragraph type='secondary'>Начните обмен документами сейчас!<br />Нет аккаунта?</Paragraph>

                  <Link to='/register'>
                    <Button
                      type='primary'
                      block
                    >
                      Зарегистрируйтесь
                    </Button>
                  </Link>
                </Layout.Actions.Register>
              </Layout.Actions>
            </Form.Item>
          </Form>
        </Layout.Inner>
      </Layout>
    )
  }
}

const WrappedLogin = Form.create({ name: 'normal_login' })(LoginPage)
export default WrappedLogin
