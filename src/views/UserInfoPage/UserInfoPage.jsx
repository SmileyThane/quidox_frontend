import React, { useState, useEffect, Fragment } from 'react'

import { api } from '../../services'
import { Select, Spin, message, Row, Col, Icon } from 'antd'
import { Input, Button } from '../../components'
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
        .then(() => {
          message.success('Данные успешно обновлены')
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

  const sendInvite = () => {
    api.company.attachUnregisteredUserToCompany({ email: userState.newUserEmail })
      .then(({ data }) => {
        if (data.success) {
          message.success('Приглашение отправлено')
          userState({ ...defaultUserState })
        } else {
          throw new Error(data.error)
        }
      })
      .catch(error => {
        message.error(error.message)
      })
  }
  console.log(userState.newUserEmail)
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
                <p className='user-info-name'>Электронный адрес пользователя: </p>
                <Input kind='text' onChange={e => updateField('newUserEmail', e.target.value)} />
                <Button type='primary' style={{ marginTop: '1rem' }} onClick={() => sendInvite()}>
                  <Icon type='plus' />
                  Отправить приглашение
                </Button>
                <Button style={{ marginLeft: '1rem' }} ghost type='primary' onClick={() => setUserState({ ...userState, showInput: false })}>Отмена</Button>
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
