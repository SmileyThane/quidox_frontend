import React, { useState, useEffect } from 'react'

import { Select, Spin } from 'antd'
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
    user: {
      isFetching,
      data: {
        companies = []
      },
      data
    }
  } = props

  const [userState, setUserState] = useState({ ...defaultUserState })

  useEffect(() => {
    if (data.active_company_id) {
      setUserState({
        ...userState,
        activeCompanyId: +data.active_company_id
      })
    }
  }, [data.active_company_id])

  const Option = Select.Option

  const handleButtonClick = () => {
    if (userState.isEditMode) {
      setUserState({
        ...userState,
        isEditMode: !userState.isEditMode
      })
    } else {
      setUserState({
        ...userState,
        isEditMode: !userState.isEditMode
      })
    }
  }

  return (
    <div className='content'>
      <Spin spinning={isFetching}>
        <div className='user-info'>
          <div className='user-info-group'>
            <p className='user-info-name'>Имя:</p>
            <Input kind='text' value={data.name} disabled={!userState.isEditMode} />
          </div>
          <div className='user-info-group'>
            <p className='user-info-name'>Адрес электронной почты:</p>
            <Input kind='text' value={data.email} disabled={!userState.isEditMode} />
          </div>
          <div className='user-info-group'>
            <p className='user-info-name'>Номер телефона: </p>
            <Input kind='text' value={data.phone} disabled={!userState.isEditMode} />
          </div>
          <div className='user-info-group user-info-group_full-width'>
            <p className='user-info-name'>Активная компания</p>
            <Select
              style={{ width: '100%' }}
              value={userState.activeCompanyId}
              disabled={!userState.isEditMode}
              onChange={v => setUserState({ ...userState, activeCompanyId: v })}
            >
              {companies.map(i => <Option key={i.id} value={i.id}>{i.company_name}({i.role_name})</Option>)}
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
