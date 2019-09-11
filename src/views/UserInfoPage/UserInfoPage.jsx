import React, { Fragment } from 'react'
import MaskedInput from 'antd-mask-input'
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

const { Option } = Select

class UserInfoPage extends React.Component {
  state = {
    userId: null,
    activeCompanyId: null,
    isEditMode: false,
    isModalVisible: false
  }

  openModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible })
  }

  changeMode = () => {
    if (!this.state.isEditMode) {
      this.setState({ isEditMode: true })
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('Пароли не совпадают')
    } else {
      callback()
    }
  }

  changeUserPassword = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll(['old_password', 'password'], (err, values) => {
      if (!err) {
        this.props.updateUser(values)
          .then(data => {
            if (data.success) {
              message.success('Пароль обновлен')
              this.setState({ isModalVisible: !this.state.isModalVisible })
            } else {
              throw new Error(data.error)
            }
          })
          .catch(error => {
            message.error(error.message)
          })
      }
    })
  }

  changeUserInfo = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.updateUser(values)
          .then(data => {
            if (data.success) {
              message.success('Данные обновленные')
              this.setState({ isEditMode: false })
            } else {
              throw new Error(data.error)
            }
          })
          .catch(error => {
            message.error(error.message)
          })
      }
    })

  }

  render () {
    const { getFieldDecorator } = this.props.form
    const {
      isEditMode,
      isModalVisible
    } = this.state

    const {
      user: { isFetching, data }
    } = this.props
    return (
      <Fragment>
        <Form className='content content_user form-user'>
          <Spin spinning={isFetching} style={{ maxWidth: '50rem', margin: '0 auto' }}>
            <Row gutter={30}>
              <Col span={12}>
                <Form.Item label='Адрес электронной почты'>
                  {getFieldDecorator('email', {
                    initialValue: data.email,
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
                  })(<Input disabled />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label='Имя:'>
                  {getFieldDecorator('name', {
                    initialValue: data.name,
                    rules: [
                      {
                        type: 'string',
                        message: 'Не похоже, что это имя!'
                      },
                      {
                        required: true,
                        message: 'Пожалуйста, введите ваше имя!'
                      }
                    ]
                  })(<Input disabled={!isEditMode} />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label='Отчество:'>
                  {getFieldDecorator('patronymic', {
                    initialValue: data.patronymic,
                    rules: [
                      {
                        type: 'string',
                        message: 'Не похоже, что это отчество!'
                      }
                    ]
                  })(<Input disabled={!isEditMode} />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label='Фамилия:'>
                  {getFieldDecorator('lastname', {
                    initialValue: data.lastname,
                    rules: [
                      {
                        type: 'string',
                        message: 'Не похоже, что это фамилия!'
                      },
                      {
                        required: true,
                        message: 'Пожалуйста, введите вашу фамилию!'
                      }
                    ]
                  })(<Input disabled={!isEditMode} />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label='Номер телефона:'>
                  {getFieldDecorator('phone', {
                    initialValue: data.phone,
                    rules: [
                      {
                        type: 'string',
                        message: 'Пожалуйста, введите номер мобильного телефона'
                      },
                      {
                        required: true,
                        message: 'Пожалуйста, введите номер мобильного телефона'
                      }
                    ]
                  })(<MaskedInput disabled={!isEditMode} mask='+111111111111' />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label='Активаная компания:'>
                  {getFieldDecorator('active_company_id', {
                    initialValue: data.active_company_id,
                    rules: [
                      {
                        type: 'number',
                        message: 'Пожалуйста, укажите активную'
                      },
                      {
                        required: true,
                        message: 'Пожалуйста, укажите активную компанию'
                      }
                    ]
                  })(<Select disabled={!isEditMode}>
                    {(data.companies && data.companies.length) &&
                      data.companies.map(i => (
                        <Option key={i.company_id} value={i.company_id}>{i.company_name}</Option>
                      ))
                    }
                  </Select>)}
                </Form.Item>
              </Col>
              {data.position &&
                <Col span={12}>
                  <Form.Item label='Должность:'>
                    {getFieldDecorator('position', {
                      initialValue: data.position
                    })(<Input disabled/>)}
                  </Form.Item>
                </Col>
              }
              {data.role &&
                <Col span={12}>
                  <Form.Item label='Роль:'>
                    {getFieldDecorator('role', {
                      initialValue: data.role
                    })(<Input disabled/>)}
                  </Form.Item>
                </Col>
              }
            </Row>
          </Spin>
        </Form>
        <div>
          <Button style={{ margin: '2rem 2rem 0 0' }} type='primary' onClick={isEditMode ? e => this.changeUserInfo(e) : (() => this.changeMode())}>
            <Icon type='edit' />
            {isEditMode ? 'Сохранить изменения' : 'Изменить данные'}
          </Button>
          <Button type='primary' onClick={() => this.openModal()}>
            <Icon type='edit'/>
            Сменить пароль
          </Button>
        </div>
        {isModalVisible &&
        <Modal
          title='Смена пороля'
          visible
          closable={false}
          footer={null}
          className='reset-password'
        >
          <Form>
            <Form.Item label='Старый пароль' hasFeedback>
              {getFieldDecorator('old_password', {
                rules: [
                  {
                    required: true,
                    message: 'Введите старый пароль'
                  }
                ]
              })(<Input.Password />)}
            </Form.Item>

            <Form.Item label='Новый пароль' hasFeedback>
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

            <Form.Item label='Подтвердите новый пароль' hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'Минимум восемь символов, как минимум одна буква, одна цифра и один специальный символ',
                    pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&.])[A-Za-z\d@$!%*#?&.]{8,}$/
                  },
                  {
                    validator: this.compareToFirstPassword
                  }
                ]
              })(<Input.Password />)}
            </Form.Item>
          </Form>

          <div style={{ marginTop: '2rem' }}>
            <Button type='primary' onClick={this.changeUserPassword}>Сохранить новый пароль</Button>

            <Button type='primary' ghost onClick={this.openModal} style={{ marginLeft: '1rem' }}>Закрыть</Button>
          </div>
        </Modal>
        }
      </Fragment>
    )
  }
}

const WrappedUserForm = Form.create({ name: 'user' })(UserInfoPage)
export default WrappedUserForm
