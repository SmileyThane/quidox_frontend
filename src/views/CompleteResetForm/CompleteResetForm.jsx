import React, { Fragment } from 'react'
import axios from 'axios'
import { Base64 } from 'js-base64'
import generateHash from 'random-hash'

import history from '../../history'
import { Button, Form, Input, message, Select, Steps, Typography } from 'antd'

import './RegisterPage.scss'

const { Text, Title } = Typography
const { Option } = Select
const { Step } = Steps

const steps = [

]

class CompleteResetForm extends React.Component {
  state = {
    confirmDirty: false,
    isChecked: false,
    autoCompleteResult: [],
    currentStep: 1,
    phone: '',
    password: '',
    code: '',
    seconds: 60
  }

  inputNode = React.createRef()
  inputPhoneNode = React.createRef()

  componentDidMount () {
    if (this.inputNode.current) {
      this.inputNode.current.focus()
    }
    if (this.inputPhoneNode.current) {
      this.inputPhoneNode.current.focus()
    }
  }


  handleCheck = () => {
    this.setState({
      isChecked: !this.state.isChecked
    })
  }

  handleChange = (value, field) => {
    const prefix = this.props.form.getFieldValue('prefix')
    if (field === 'phone') {
      this.setState({
        [field]: '+' + prefix + value.replace(/-/g, '')
      })
    } else {
      this.setState({
        [field]: value
      })
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const registerData = {
          password: this.state.password,
          id: this.props.match.params.id,
          secret_key: process.env.REACT_APP_SECRET_KEY
        }
        const secretData = generateHash({ length: 10 }) + Base64.encode(JSON.stringify(registerData)) + generateHash({ length: 5 })
        axios.post(`${process.env.REACT_APP_BASE_URL}/user/update/phone`, { phone_data: secretData })
          .then(({ data }) => {
            if (data.success) {
              history.push('/login')
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

  handleConfirmBlur = e => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('Пароли не совпадают')
    } else {
      this.state.password = value
      callback()
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  render () {
    const { currentStep, seconds } = this.state
    const { getFieldDecorator } = this.props.form

    return (
      <Fragment>
        <div className='register'>
          <div className='preview-header'>
            <Title level={3}>
              Восстановление пароля в Quidox.by
            </Title>

            <Text>Обмен электронными документами с ЭЦП</Text>
          </div>
          <div className='steps'>
            <Steps
              size='small'
              current={currentStep}
            >
              {steps.map(item => (
                <Step key={item.title} title={item.title}/>
              ))}
            </Steps>

            <Form className='form form-register' onSubmit={this.handleSubmit}>

              {currentStep === 1 &&
              <Form.Item label='Придумайте пароль' hasFeedback>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'Минимум восемь символов, как минимум одна буква и одна цифра',
                      pattern: /^.{8,128}$/
                    },
                    {
                      validator: this.validateToNextPassword
                    }
                  ]
                })(<Input.Password/>)}
              </Form.Item>
              }
              {currentStep === 1 &&
              <Form.Item label='Подтвердите пароль' hasFeedback>
                {getFieldDecorator('confirm', {
                  rules: [
                    {
                      required: true,
                      message: 'Пожалуйста, подтвердите ваш пороль!'
                    },
                    {
                      validator: this.compareToFirstPassword
                    }
                  ]
                })(<Input.Password
                  onBlur={this.handleConfirmBlur}/>)}
              </Form.Item>
              }

              {currentStep === 2 &&
              <Fragment>

              </Fragment>
              }
              <Form.Item>
                <div>
                  <div style={{ marginTop: '2rem' }}>
                    <Button type='primary' htmlType='submit' disabled={currentStep === 0 && !this.state.isChecked}>
                      {currentStep === 2 ? 'Завершить регистрацию' : 'Продолжить'}
                    </Button>
                  </div>
                </div>
              </Form.Item>
            </Form>
          </div>
          <div className='register-footer-help'>
            {currentStep !== 3 &&
            <div>
              <Text type='secondary'>* - обязательное поле</Text>
            </div>
            }
          </div>
        </div>
      </Fragment>
    )
  }
}

const WrappedCompleteRegistrationForm = Form.create({ name: 'register' })(CompleteResetForm)

export default WrappedCompleteRegistrationForm
