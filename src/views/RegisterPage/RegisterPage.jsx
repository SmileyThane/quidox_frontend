import React, { Fragment, useState } from 'react'

import axios from 'axios'
import { Steps } from 'antd'
import { Button, FormGroup } from '../../components'
import './RegisterPage.scss'

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

const { Step } = Steps

const RegisterPage = () => {
  const defaultFormData = {
    phone: '',
    code: '',
    email: '',
    name: '',
    password: ''
  }

  const [current, setCurrent] = useState(0)
  const [formData, setFormData] = useState({ ...defaultFormData })

  const updateField = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    })
  }

  const nextStep = () => {
    const reqObject = {
      phone: '+' + formData.phone,
      code: formData.code,
      email: formData.email,
      name: formData.name,
      password: formData.password
    }

    switch (current) {
      case 0:
        axios.post('http://192.168.88.125/quidox/public/api/sms/send', reqObject)
          .then((response) => {
            if (response.data.success) {
              setCurrent(current + 1)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
        break
      case 1:
        axios.post('http://192.168.88.125/quidox/public/api/sms/confirm', reqObject)
          .then((response) => {
            console.log(response.data.success)
            if (response.data.success) {
              setCurrent(current + 1)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
        break
      case 2:
        axios.post('http://192.168.88.125/quidox/public/api/register', reqObject)
          .then((response) => {
            console.log(response.data.success)
            if (response.data.success) {
              setCurrent(current + 1)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
        break
      default:
        break
    }
  }

  return (
    <div className='steps'>
      <Steps
        size='small'
        current={current}
      >
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <form className='form'>
        <Fragment>
          {current === 0 &&
          <FormGroup
            kind='input-mask'
            label='Введите номер телефона'
            placeholder='+375(__)___-__-__'
            onChange={e => updateField('phone', e.target.value.replace(/\D+/g, ''))}
          />
          }
          {current === 1 &&
          <FormGroup
            kind='input'
            label='Введите полученный код'
            placeholder='Полученный код'
            onChange={e => updateField('code', e.target.value)}
          />
          }
          {current === 2 &&
          <Fragment>
            <FormGroup
              kind='input'
              label='Введите адресс электронной почты'
              placeholder='Адресс электронной почты'
              onChange={e => updateField('email', e.target.value)}
            />
            <FormGroup
              kind='input'
              label='Введите ваше имя'
              placeholder='Ваше имя'
              onChange={e => updateField('name', e.target.value)}
            />
            <FormGroup
              kind='input'
              label='Введите пароль'
              placeholder='Пароль'
              onChange={e => updateField('password', e.target.value)}
            />
          </Fragment>
          }
        </Fragment>
      </form>
      <div className='steps__action'>
        <Button onClick={() => nextStep()} type='primary'>Продолжить</Button>
      </div>
    </div>
  )
}

export default RegisterPage
