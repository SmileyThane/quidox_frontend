import React, { Fragment } from 'react'
import axios from 'axios'
import MaskedInput from 'antd-mask-input'
import { Base64 } from 'js-base64'
import generateHash from 'random-hash'

import history from '../../history'
import { Checkbox, Form, Input, message, Select, Steps, Typography } from 'antd'
import { Button } from '../../components'

import './RegisterPage.scss'

const { Text, Title } = Typography
const { Option } = Select
const { Step } = Steps

const steps = [
  {
    title: 'Шаг 1',
    content: 'First-content'
  },
  {
    title: 'Шаг 2',
    content: 'First-content'
  }
]

class CompleteRegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    isChecked: false,
    autoCompleteResult: [],
    currentStep: 0,
    phone: '',
    password:'',
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

  componentDidUpdate () {
    if (this.state.currentStep !== 2) {
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
          phone: this.state.phone,
          code: this.state.code,
          password: this.state.password,
          id: this.props.match.params.id,
          secret_key: process.env.REACT_APP_SECRET_KEY
        }
        switch (this.state.currentStep) {
          case 0:
            axios.post(`${process.env.REACT_APP_BASE_URL}/sms/send`, registerData)
              .then(({ data }) => {
                if (data.success) {
                  message.success('На указанный Вами номер отправлено SMS с кодом. Введите его в окно ниже для ' +
                    'продолжения процесса регистрации')
                  setTimeout(() => {
                    this.setState({ currentStep: this.state.currentStep + 1 })
                    this.getOneMinuteTimer()
                    this.inputNode.current.focus()
                  }, 350)
                } else {
                  throw new Error(data.error)
                }
              })
              .catch(function (error) {
                message.error(error.message)
              })
            break
          case 1:
            axios.post(`${process.env.REACT_APP_BASE_URL}/sms/confirm`, registerData)
              .then(({ data }) => {
                if (data.success) {
                  message.success('СМС код введен правильно!')
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
                } else {
                  throw new Error(data.error)
                }
              })
              .catch(error => {
                message.error(error.message)
              })
            break
          default: // Do nothing
        }
      }
    })
  }

  getSmsCode = () => {
    this.setState({
      seconds: 60
    })
    this.getOneMinuteTimer()
    const phone = {
      phone: this.state.phone
    }
    axios.post(`${process.env.REACT_APP_BASE_URL}/sms/send`, phone)
      .then(({ data }) => {
        if (data.success) {
          message.success('Номер телефона успешно отправлен')
        } else {
          throw new Error(data.error)
        }
      })
      .catch(error => {
        message.error(error.message)
      })
  }

  getOneMinuteTimer = () => {
    const timeInterval = setInterval(() => {
      if (this.state.seconds > 0) {
        this.setState(prevState => {
          return { seconds: prevState.seconds - 1 }
        })
      } else {
        clearInterval(timeInterval)
        return null
      }
    }, 1000)
  }

  handleConfirmBlur = e => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('Пароли не совпадают')
    } else {
      this.state.password = value
      callback()
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  };

  render () {
    const { currentStep, seconds } = this.state
    const { config: { data } } = this.props
    const { getFieldDecorator } = this.props.form

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '37529'
    })(
      <Select style={{ width: 100 }}>
        <Option value='37529'>+375(29)</Option>
        <Option value='37525'>+375(25)</Option>
        <Option value='37533'>+375(33)</Option>
        <Option value='37544'>+375(44)</Option>
      </Select>
    )

    return (
      <Fragment>
        <div className='register'>
          <div className='preview-header'>
            <Title level={3}>
              Регистрация
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
              {currentStep === 0 &&
              <Fragment>
                <Form.Item
                  validateStatus={this.state.validateStatus}
                  label='Введите номер мобильного телефона'
                >
                  {getFieldDecorator('phone', {
                    rules: [{ required: true, message: 'Пожалуйста, введите номер мобильного телефона' }]
                  })(<MaskedInput
                    mask='111-11-11'
                    placeholder='XXX-XX-XX'
                    ref={this.inputPhoneNode}
                    onChange={e => {
                      this.handleChange(e.target.value, 'phone')
                    }}
                    addonBefore={prefixSelector}
                    style={{ width: '100%' }}
                  />)}
                </Form.Item>
                <Checkbox style={{ marginBottom: '1rem' }} onClick={this.handleCheck}>Я ознакомился и принимаю условия &nbsp;
                  {data.co_brand_config
                    ? <a href={data.co_brand_config.terms_link}>Правил использования</a>
                    : <span><a href='https://quidox.by/agreement/'>Публичного договора, <a href='https://quidox.by/agreement/'>Политикой конфиденциальности</a></a></span>
                  }.
                </Checkbox>
                <div style={{ marginBottom: '1rem' }}>
                  <Text>
                    Для начала регистрации и обеспечения безопасной двухфакторной аутентификации, пожалуйста введите
                    номер
                    Вашего мобильного телефона
                  </Text>
                </div>
              </Fragment>
              }

              {currentStep === 1 &&
              <Form.Item label='Введите полученный код'>
                {getFieldDecorator('code', {
                  rules: [
                    {
                      type: 'string',
                      message: 'Код введен не правильно!'
                    },
                    {
                      required: true,
                      message: 'Пожалуйста, введите полученный код!'
                    }
                  ]
                })(<Input
                  onChange={e => this.handleChange(e.target.value, 'code')}
                  ref={this.inputNode}
                  placeholder='Код из СМС'
                />)}
              </Form.Item>

              }
              {currentStep === 1 &&
              <Form.Item label='Придумайте пароль' hasFeedback>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'Минимум восемь символов.',
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
                <p>Подтвердите регистрацию, пройдя по ссылке в сообщении, которое вы получите на указанный вами адрес
                  электронной почты</p>
              </Fragment>
              }

              <Form.Item>
                <div>
                  <div>
                    {currentStep === 1 &&
                    <Fragment>
                      <Text type='secondary'>Мы отправили вам код подтверждения на указанный вами номер.<br/>
                        Пожалуйста, проверьте и введите в поле.<br/>
                        Нажмите "Продолжить".
                      </Text><br/> <br/>
                      <Text type='secondary'>Не получили код?<br/>
                        {seconds > 0
                          ? <Fragment>Выслать повторно через... {seconds}</Fragment>
                          : <Button type='link' onClick={() => this.getSmsCode()}>Выслать повторно!</Button>
                        }
                      </Text>
                    </Fragment>
                    }

                  </div>
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

const WrappedCompleteRegistrationForm = Form.create({ name: 'register' })(CompleteRegistrationForm)

export default WrappedCompleteRegistrationForm
