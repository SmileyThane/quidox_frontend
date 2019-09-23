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
  Typography,
  Checkbox
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
  }
]

class CompleteRegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    isChecked: false,
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
        }
        switch (this.state.currentStep) {
          case 0:
            axios.post('https://api.quidox.by/api/sms/send', registerData)
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
        <Option value='37525'>+375(25)</Option>
        <Option value='37533'>+375(33)</Option>
        <Option value='37544'>+375(44)</Option>
      </Select>
    )
    console.log(this.state.phone)
    return (
      <Fragment>
        <div className='register'>
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
                <Checkbox style={{ marginBottom: '1rem' }} onClick={this.handleCheck}>Я ознакомился и принимаю условия Публичного договора и Политику конфиденцальности.</Checkbox>
                <div style={{ marginBottom: '1rem' }}>
                  <Text>
                    Для начала регистрации и обеспечения безопасной двухфакторной аутентификации, пожалуйста введите номер
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
              {currentStep === 2 &&
              <Fragment>
                <p>Подтвердите регистрацию, пройдя по ссылке в сообщении, которое вы получите на указанный вами адрес электронной почты</p>
              </Fragment>
              }
              <Form.Item>
                <div>
                  <div>
                    { currentStep === 1 &&
                    <Fragment>
                      <Text type='secondary'>Мы отправили вам код подтверждения на указанный вами номер.<br />
                        Пожалуйста, проверьте и введите в поле.<br />
                        Нажмите "Продолжить".
                      </Text><br /><br />
                      <Text type='secondary'>Не получили код?<br />
                        {seconds > 0
                          ? <Fragment>Выслать повторно через... {seconds}</Fragment>
                          : <Button type='link' onClick={() => this.getSmsCode()}>Выслать повторно!</Button>
                        }
                      </Text>
                    </Fragment>
                    }
                  </div>
                  {currentStep === 0 &&
                    <Fragment>
                      <Text type='secondary'>Благодаря сервису QuiDox.by<br />
                        Вы сможете с легкостью обмениваться электронными документами с ЭЦП с Вашими контрагентами.
                      </Text>
                      <br />
                      <Text type='secondary'>Доставка происходит мгновенно.</Text>
                      <br />
                      <Text type='secondary'>Бесплатно первые 90 дней!</Text>
                    </Fragment>
                    }
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