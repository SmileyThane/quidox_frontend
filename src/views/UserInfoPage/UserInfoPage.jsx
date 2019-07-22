import React, { useState, useEffect } from 'react'

import { Select, Spin, message } from 'antd'
import { Input, Button } from '../../components'
import './UserInfoPage.scss'

const defaultUserState = {
  userId: null,
  activeCompanyId: null,
  name: '',
  email: '',
  phone: '',
  isEditMode: false
}

const UserInfoPage = props => {
  const {
    companies: { list },
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
  console.log(data)
  return (
    <div className='content'>
      <Spin spinning={isFetching}>
        <div className='user-info'>
          <div className='user-info-group'>
            <p className='user-info-name'>Имя:</p>
            <Input kind='text' onChange={e => updateField('name', e.target.value)} value={userState.name} disabled={!userState.isEditMode} />
          </div>
          <div className='user-info-group'>
            <p className='user-info-name'>Адрес электронной почты:</p>
            <Input kind='text' onChange={e => updateField('email', e.target.value)} value={userState.email} disabled={!userState.isEditMode} />
          </div>
          <div className='user-info-group'>
            <p className='user-info-name'>Номер телефона: </p>
            <Input kind='text' onChange={e => updateField('phone', e.target.value)} value={userState.phone} disabled={!userState.isEditMode} />
          </div>
          <div className='user-info-group user-info-group_full-width'>
            <p className='user-info-name'>Активная компания:</p>
            <Select
              style={{ width: '100%' }}
              value={!isNaN(userState.active_company_id) ? userState.active_company_id : ''}
              disabled={!userState.isEditMode}
              onChange={v => {
                console.log(v)
                setUserState({ ...userState, active_company_id: v })
              }}
            >
              {companies && companies.map(i => <Option key={i.company_id} value={i.company_id}>{i.company_name}</Option>)}
            </Select>
          </div>
          <div className='user-info-group user-info-group_full-width'>
            <Button type='primary' onClick={() => handleButtonClick()}>{userState.isEditMode ? 'Сохранить изменения' : 'Изменить данные'}</Button>
          </div>
        </div>
      </Spin>
    </div>
  )
}

export default UserInfoPage
