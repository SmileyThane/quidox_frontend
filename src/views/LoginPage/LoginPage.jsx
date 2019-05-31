import React, { useState } from 'react'

import axios from 'axios'
import history from '../../history.js'
import { Form, Checkbox } from 'antd'
import { FormGroup, Button } from '../../components'
import './LoginPage.scss'

const loginDefaultData = {
  email: '',
  password: ''
}

const LoginPage = () => {

  const [formData, setFormData] = useState({ ...loginDefaultData })

  const updateField = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    })
  }

  const handleLogin = () => {
    axios.post('http://192.168.88.125/quidox/public/api/login', formData)
      .then((response) => {
        if (response.data.success) {
          window.localStorage.setItem('authToken', response.data.data.token)
          history.push('/')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <Form className='form'>
      <FormGroup
        label='Адрес электронной почты'
        kind='input'
        onChange={e => updateField('email', e.target.value)}
      />
      <FormGroup
        label='Пароль'
        kind='input'
        onChange={e => updateField('password', e.target.value)}
      />
      <div className='form__forgot'>
        <Checkbox>Запомнить меня</Checkbox>
        <a href='#' onClick={e => e.preventDefault()}>Забыли пароль?</a>
      </div>
      <Button style={{ marginBottom: 30 }} onClick={() => handleLogin()} type='primary' block>Войти</Button>
      <a href='#' onClick={e => { e.preventDefault(); history.push('/register') }} style={{ marginTop: 30 }}>Регистрация</a>
    </Form>
  )
}

export default LoginPage
