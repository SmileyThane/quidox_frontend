import React, { useState, useEffect, Fragment } from 'react'
import useForm from 'rc-form-hooks'

import {
  Select,
  Spin,
  message,
  Row,
  Col,
  Icon,
  Input,
  Button,
  Modal,
  Form
} from 'antd'
import './UserInfoPage.scss'

const defaultUserState = {
  userId: null,
  activeCompanyId: null,
  name: '',
  lastname: '',
  patronymic: '',
  email: '',
  phone: '',
  position: '',
  newUserEmail: '',
  showInput: false,
  isEditMode: false,
  password: '',
  isVisible: false
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
        lastname: data.lastname,
        patronymic: data.patronymic,
        position: data.position,
        role: data.role,
        email: data.email,
        phone: data.phone,
        password: data.password,
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

   const compareToFirstPassword = (rule, value, callback) => {
     const { form } = this.props;
     if (value && value !== form.getFieldValue('password')) {
       callback('Two passwords that you enter is inconsistent!');
     } else {
       callback();
     }
   }


    const changePassword = e => {
      e.preventDefault()
      props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }

  const handleButtonClick = () => {
    if (userState.isEditMode) {
      setUserState({
        ...userState,
        isEditMode: !userState.isEditMode
      })
      updateUser(userState)
        .then(data => {
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

  console.log(userState)
  return (
    <Fragment>
      <div className='content content_user'>
        <Spin spinning={isFetching} style={{ maxWidth: '50rem', margin: '0 auto' }}>
          <Row gutter={30}>
            <Col span={12}>
              <p className='user-info-name'>Адрес электронной почты:</p>
              <Input kind='text' onChange={e => updateField('email', e.target.value)} value={userState.email} disabled={!userState.isEditMode} />
            </Col>
            <Col span={12}>
              <p className='user-info-name'>Имя:</p>
              <Input kind='text' onChange={e => updateField('name', e.target.value)} value={userState.name} disabled={!userState.isEditMode} />
            </Col>
            <Col span={12}>
              <p className='user-info-name'>Отчество:</p>
              <Input kind='text' onChange={e => updateField('patronymic', e.target.value)} value={userState.patronymic} disabled={!userState.isEditMode} />
            </Col>
            <Col span={12}>
              <p className='user-info-name'>Фамилия:</p>
              <Input kind='text' onChange={e => updateField('lastname', e.target.value)} value={userState.lastname} disabled={!userState.isEditMode} />
            </Col>
            <Col span={12}>
              <p className='user-info-name'>Номер телефона: </p>
              <Input kind='text' onChange={e => updateField('phone', e.target.value)} value={userState.phone} disabled={!userState.isEditMode} />
            </Col>
            <Col span={12}>
              <p className='user-info-name'>Должность:</p>
              <Input kind='text' onChange={e => updateField('position', e.target.value)} value={userState.position} disabled={!userState.isEditMode} />
            </Col>
            <Col span={12}>
              <p className='user-info-name'>Роль:</p>
              <Input kind='text' value={userState.role} disabled />
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
          </Row>
        </Spin>
      </div>
      <div>
        <Button style={{ margin: '2rem 2rem 0 0' }} type='primary' onClick={() => handleButtonClick()}>
          <Icon type='edit' />
          {userState.isEditMode ? 'Сохранить изменения' : 'Изменить данные'}
        </Button>
        <Button type='primary' onClick={() => setUserState({ ...userState, isVisible: true })}>
          <Icon type='edit' />
          Сменить пароль
        </Button>
      </div>
      {userState.isVisible &&
      <Modal title='Смена пороля' visible>
        <Form>
          <Form.Item label='Введите старый пароль'>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Пожалуйста, введите пароль!' }]
            })(
              <Input.Password
                prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                type='password'
              />
            )}
          </Form.Item>

          <Form.Item label='Введите новый пароль'>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Пожалуйста, введите пароль!' }]
            })(
              <Input.Password
                prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                type='password'
              />
            )}
          </Form.Item>

          <Form.Item label='Повторите новый пароль'>
            {getFieldDecorator('confirm', {
              rules: [
                { required: true, message: 'Пожалуйста, повторите новый пароль!' },
                {
                  validator: compareToFirstPassword
                }
                ]
            })(
              <Input.Password
                prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                type='password'
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
      }
    </Fragment>
  )
}

export default UserInfoPage
