import React, { Fragment } from 'react'
import axios from 'axios'
import MaskedInput from 'antd-mask-input'

import history from '../../history'
import {
  Steps,
  Form,
  Input,
  Select,
  Button,
  message,
  Typography
} from 'antd'

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
  },
  {
    title: 'Шаг 3',
    content: 'First-content'
  }
]

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    currentStep: 0,
    phone: '',
    code: '',
    seconds: 60
  };

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

   componentDidUpdate() {
     this.inputPhoneNode.current.focus()
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
          email: values.email ? values.email : '',
          password: values.password ? values.password : '',
          name: values.name ? values.name : ''
        }
        switch (this.state.currentStep) {
          case 0:
            axios.post('https://api.quidox.by/api/sms/send', registerData)
              .then(({ data }) => {
                if (data.success) {
                  message.success('Номер телефона успешно отправлен!')
                  setTimeout(() => {
                    this.setState({ currentStep: this.state.currentStep + 1 })
                    this.getOneMinuteTimer()
                    this.inputNode.current.focus()
                  }, 350)
                }
              })
              .catch(function (error) {
                message.error(error.message)
              })
            break
          case 1:
            axios.post('https://api.quidox.by/api/sms/confirm', registerData)
              .then(({ data }) => {
                if (data.success) {
                  message.success('СМС код введен правильно!')
                  setTimeout(() => {
                    this.setState({ currentStep: this.state.currentStep + 1 })
                    this.inputNode.current.focus()
                  }, 350)
                } else {
                  throw new Error(data.error)
                }
              })
              .catch(error => {
                message.error(error.message)
              })
            break
          case 2:
            axios.post('https://api.quidox.by/api/register', registerData)
              .then(({ data }) => {
                if (data.success) {
                  message.success('Данные отпрвлены успещно')
                  setTimeout(() => {
                    this.setState({ currentStep: this.state.currentStep + 1 })
                  }, 350)
                }
              })
              .catch(function (error) {
                message.error(error.message)
              })
            break
          case 3:
            history.push('/login')
            break
          default: // Do nothing
        }
      }
    })
  };

  getSmsCode = () => {
    this.setState({
      seconds: 60
    })
    this.getOneMinuteTimer()
    const phone = {
      phone: this.state.phone
    }
    axios.post('https://api.quidox.by/api/sms/send', phone)
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

  handleConfirmBlur = e => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('Пароли не совпадают')
    } else {
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
  render () {
    const { currentStep, seconds } = this.state
    const { getFieldDecorator } = this.props.form

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '37529'
    })(
      <Select style={{ width: 100 }}>
        <Option value='37529'>+375(29)</Option>
        <Option value='37533'>+375(33)</Option>
        <Option value='37544'>+375(44)</Option>
      </Select>
    )
    console.log(this.state.phone)
    return (
      <Fragment>
        <div className='register-left'>
          <div className='preview-header'>
            <Title level={3}>
              Регистрация в Quidox.by
            </Title>
            <Text>Обмен электронными документами с ЭЦП</Text>
          </div>
          <div className='steps'>
            <Steps
              size='small'
              current={currentStep}
            >
              {steps.map(item => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
            <Form className='form form-register' onSubmit={this.handleSubmit}>
              {currentStep === 0 &&
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
              {currentStep === 2 &&
              <Fragment>
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
                  })(<Input ref={this.inputNode} />)}
                </Form.Item>
                <Form.Item label='Ваше имя'>
                  {getFieldDecorator('name', {
                    rules: [
                      {
                        type: 'string',
                        message: 'Не правильное имя'
                      },
                      {
                        required: true,
                        message: 'Пожалуйста, введите ваше имя!'
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
                <Form.Item label='Придумайте пароль' hasFeedback>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: 'Минимум восемь символов, как минимум одна буква, одна цифра и один специальный символ',
                        pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&.])[A-Za-z\d@$!%*#?&.]{8,}$/
                      },
                      {
                        validator: this.validateToNextPassword
                      }
                    ]
                  })(<Input.Password />)}
                </Form.Item>
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
                  })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                </Form.Item>
              </Fragment>
              }
              {currentStep === 3 &&
              <Fragment>
                <p>Подтвердите регистрацию, пройдя по ссылке в сообщении, которое вы получите на указанный вами адрес электронной почты</p>
              </Fragment>
              }
              <Form.Item>
                <div className='steps-form-actions'>
                  <div>
                    { currentStep === 1 &&
                    <Fragment>
                      <Text type='secondary'>Не получили код?<br />
                        {seconds > 0
                          ? <Fragment>Выслать повторно через... {seconds}</Fragment>
                          : <a onClick={() => this.getSmsCode()}>Выслать повторно!</a>
                        }
                      </Text>
                    </Fragment>
                    }
                  </div>
                  <Button type='primary' htmlType='submit'>
                    {currentStep === 3 ? 'Завершить регистрацию' : 'Продолжить'}
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
          <div className='register-footer-help'>
            <div>
              <Text type='secondary'>* - обязательное поле</Text>
            </div>
          </div>
        </div>
        <div className='register-right'>
          {currentStep !== 2 &&
            <div>
              {currentStep === 0 &&
              <Fragment>
                <Text type='secondary'>Благодаря сервису QuiDox.by<br />
                  Вы сможете с легкостью обмениваться электронными документами с ЭЦП с Вашими контрагентами.
                </Text>
                <br /><br />
                <Text type='secondary'>Доставка происходит мгновенно.</Text>
                <br /><br />
                <Text type='secondary'>Бесплатно первые 180 дней!</Text>
              </Fragment>
              }
              {currentStep === 1 &&
              <Text type='secondary'>Мы отправили вам код подтверждения на указанный вами номер.<br />
                Пожалуйста, проверьте и введите в поле.<br />
                Нажмите "Продолжить".
              </Text>
              }
            </div>
          }
        </div>
      </Fragment>
    )
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm)

export default WrappedRegistrationForm
