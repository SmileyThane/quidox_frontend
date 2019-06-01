
import React, { Fragment } from 'react'
import axios from 'axios'
import history from '../../history'
import {
  Steps,
  Form,
  Input,
  Select,
  Button
} from 'antd'

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
    code: ''
  };

  handleChange = (value, field) => {
    const prefix = this.props.form.getFieldValue('prefix')
    console.log(prefix)
    if (field === 'phone') {
      this.setState({
        [field]: '+' + prefix + value
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
        console.log(values)
        switch (this.state.currentStep) {
          case 0:
            axios.post('http://178.172.173.203/api/sms/send', registerData)
              .then((response) => {
                if (response.data.success) {
                  this.setState({ currentStep: this.state.currentStep + 1 })
                }
              })
              .catch(function (error) {
                console.log(error)
              })
            break
          case 1:
            axios.post('http://178.172.173.203/api/sms/confirm', registerData)
              .then((response) => {
                if (response.data.success) {
                  this.setState({ currentStep: this.state.currentStep + 1 })
                }
              })
              .catch(function (error) {
                console.log(error)
              })
            break
          case 2:
            axios.post('http://178.172.173.203/api/register', registerData)
              .then((response) => {
                if (response.data.success) {
                  history.push('/login')
                }
              })
              .catch(function (error) {
                console.log(error)
              })
            break
        }
      }
    })
  };

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

  render () {
    const { currentStep } = this.state
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

    return (
      <div className='steps'>
        <Steps
          size='small'
          current={currentStep}
        >
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <Form className='form' onSubmit={this.handleSubmit}>
          {currentStep === 0 &&
            <Form.Item label='Введите номер телефона'>
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: 'Пожалуйста, введите номер телефона' }]
              })(<Input onChange={e => this.handleChange(e.target.value, 'phone')} addonBefore={prefixSelector} style={{ width: '100%' }} />)}
            </Form.Item>
          }
          {currentStep === 1 &&
            <Form.Item label='Введите полученный код'>
              {getFieldDecorator('code', {
                rules: [
                  {
                    type: 'string',
                    message: 'The input is not valid E-mail!'
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!'
                  }
                ]
              })(<Input onChange={e => this.handleChange(e.target.value, 'code')} />)}
            </Form.Item>
          }
          {currentStep === 2 &&
            <Fragment>
              <Form.Item label='Введите адрес электронной почты'>
                {getFieldDecorator('email', {
                  rules: [
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!'
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!'
                    }
                  ]
                })(<Input />)}
              </Form.Item>
              <Form.Item label='Введите ваше имя'>
                {getFieldDecorator('name', {
                  rules: [
                    {
                      type: 'string',
                      message: 'The input is not valid E-mail!'
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!'
                    }
                  ]
                })(<Input />)}
              </Form.Item>
              <Form.Item label='Password' hasFeedback>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your password!'
                    },
                    {
                      validator: this.validateToNextPassword
                    }
                  ]
                })(<Input.Password />)}
              </Form.Item>
              <Form.Item label='Confirm Password' hasFeedback>
                {getFieldDecorator('confirm', {
                  rules: [
                    {
                      required: true,
                      message: 'Please confirm your password!'
                    },
                    {
                      validator: this.compareToFirstPassword
                    }
                  ]
                })(<Input.Password onBlur={this.handleConfirmBlur} />)}
              </Form.Item>
            </Fragment>
          }
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              {currentStep === 3 ? 'Регистрация' : 'Продолжить'}
            </Button>

          </Form.Item>
        </Form>
      </div>
    )
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm)

export default WrappedRegistrationForm
