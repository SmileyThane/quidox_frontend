import React, { useState, useEffect, Fragment, useRef } from 'react'
import useForm from 'rc-form-hooks'

import { api } from '../../services'
import { Select, Spin, message, Row, Col, Icon, Form, Input } from 'antd'
import { Button } from '../../components'
import './UserInfoPage.scss'

const defaultUserState = {
  userId: null,
  activeCompanyId: null,
  name: '',
  email: '',
  phone: '',
  newUserEmail: '',
  showInput: false,
  isEditMode: false
}

const UserInfoPage = props => {
  const {
    user: {
      isFetching,
      data: {
        companies = []
      },
      data
    },
    updateUser
  } = props

  const [userState, setUserState] = useState({ ...defaultUserState })

  const { getFieldDecorator, validateFields } = useForm()

  useEffect(() => {
    if (data) {
      setUserState({
        ...userState,
        name: data.name,
        email: data.email,
        phone: data.phone,
        active_company_id: data.active_company_id
      })
    }
  }, [data])

  const Option = Select.Option

  const updateField = (field, value) => {
    setUserState({
      ...userState,
      [field]: value
    })
  }

  const handleButtonClick = () => {
    if (userState.isEditMode) {
      setUserState({
        ...userState,
        isEditMode: !userState.isEditMode
      })
      updateUser(userState)
        .then(({ data }) => {
          if (data.success) {
            message.success('Данные успешно обновлены')
          } else {
            throw new Error(data.error)
          }
        })
        .catch(error => {
          message.error(error.message)
        })
    } else {
      setUserState({
        ...userState,
        isEditMode: !userState.isEditMode
      })
    }
  }

  const sendInvite = e => {
    e.preventDefault()
    validateFields()
      .then(() => {
        api.company.attachUnregisteredUserToCompany({ email: userState.newUserEmail })
          .then(({ data }) => {
            if (data.success) {
              message.success('Приглашение отправлено')
              setUserState({ ...defaultUserState })
            } else {
              throw new Error(data.error)
            }
          })
          .catch(error => {
            message.error(error.message)
          })
      })
  }

  return (
    <Fragment>
      <div className='content content_user'>
        <Spin spinning={isFetching} style={{ maxWidth: '50rem', margin: '0 auto' }}>
          <Row gutter={30}>
            <Col span={12}>
              <p className='user-info-name'>Имя:</p>
              <Input kind='text' onChange={e => updateField('name', e.target.value)} value={userState.name} disabled={!userState.isEditMode} />
            </Col>
            <Col span={12}>
              <p className='user-info-name'>Адрес электронной почты:</p>
              <Input kind='text' onChange={e => updateField('email', e.target.value)} value={userState.email} disabled={!userState.isEditMode} />
            </Col>
            <Col span={12}>
              <p className='user-info-name'>Номер телефона: </p>
              <Input kind='text' onChange={e => updateField('phone', e.target.value)} value={userState.phone} disabled={!userState.isEditMode} />
            </Col>
            <Col span={12}>
              <p className='user-info-name'>Активная компания:</p>
              <Select
                style={{ width: '100%' }}
                value={!isNaN(userState.active_company_id) ? userState.active_company_id : ''}
                disabled={!userState.isEditMode}
                onChange={v => {
                  setUserState({ ...userState, active_company_id: v })
                }}
              >
                {companies && companies.map(i => <Option key={i.company_id} value={i.company_id}>{i.company_name}</Option>)}
              </Select>
            </Col>
            {userState.showInput &&
            <Col span={12}>
              <Form onSubmit={sendInvite} style={{ marginTop: '3rem' }}>
                <Form.Item style={{ marginBottom: 0 }}>
                  {getFieldDecorator('email', {
                    rules: [
                      {
                        type: 'email',
                        message: 'Не правильный адрес электронной почты!'
                      },
                      {
                        required: true,
                        message: 'Введите адрес электроной почты'
                      }
                    ]
                  })(
                    <Input
                      prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder='Электронный адрес пользователя'
                      onChange={e => updateField('newUserEmail', e.target.value)}
                    />
                  )}
                </Form.Item>
                <Button type='primary' style={{ marginTop: '1rem' }} htmlType='submit'>
                  <Icon type='plus' />
              Отправить приглашение
                </Button>
                <Button style={{ marginLeft: '1rem' }} ghost type='primary' onClick={() => setUserState({ ...userState, showInput: false })}>Отмена</Button>
              </Form>
            </Col>
            }
          </Row>
        </Spin>
      </div>
      <div>
        <Button style={{ marginTop: '2rem' }} type='primary' onClick={() => handleButtonClick()}>
          <Icon type='edit' />
          {userState.isEditMode ? 'Сохранить изменения' : 'Изменить данные'}
        </Button>
        <Button type='primary' style={{ marginLeft: '1rem' }} onClick={() => setUserState({ ...userState, showInput: true })}>
          <Icon type='usergroup-add' />
          Добавить пользователя в компанию
        </Button>
      </div>
    </Fragment>
  )
}

export default UserInfoPage
