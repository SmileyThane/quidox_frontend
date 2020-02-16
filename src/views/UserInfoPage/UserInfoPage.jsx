import React, { Fragment } from 'react'
import axios from 'axios'
import MaskedInput from 'antd-mask-input'
import { Button, Col, Form, Icon, Input, message, Modal, Row, Select, Spin, Tabs } from 'antd'
import './UserInfoPage.scss'

const { Option } = Select

const { TabPane } = Tabs

class UserInfoPage extends React.Component {
  state = {
    userId: null,
    activeCompanyId: null,
    isEditMode: false,
    isModalVisible: false,
    phone: '',
    modalType: '',
    isCode: false
  }

  inputPhoneNode = React.createRef()

  componentDidMount () {
    if (this.inputPhoneNode.current) {
      this.inputPhoneNode.current.focus()
    }
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

  openModal = type => {
    this.setState({ isModalVisible: !this.state.isModalVisible })
    this.setState({ isCode: false })
    this.setState({ modalType: type })
  }

  changeMode = () => {
    this.setState({ isEditMode: true })
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

  changeUserPhone = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll(['phone', 'code'], (err, values) => {
      const phoneData = {
        phone: this.state.phone,
        code: values.code,
      }
      if (this.state.isCode) {
        axios.post(`${process.env.REACT_APP_BASE_URL}/sms/confirm`, phoneData)
          .then(({ data }) => {
            if (data.success) {
              this.props.updateUser(phoneData)
                .then(data => {
                  if (data.success) {
                    message.success('Номер успешно сохранен')
                    this.setState({ isModalVisible: false })
                  } else {
                    throw new Error(data.error)
                  }
                })
                .catch(error => {
                  message.error(error.message)
                })
            } else {
              throw new Error(data.error)
            }
          })
          .catch(error => {
            message.error(error.message)
          })
      } else {
        axios.post(`${process.env.REACT_APP_BASE_URL}/sms/send`, phoneData)
          .then(({ data }) => {
            if (data.success) {
              message.success('На указанный Вами номер отправлено SMS с кодом')
              this.setState({ isCode: true })
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

  shareUser = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll(['email'], (err, values) => {
      if (!err) {
        this.props.shareUser(values)
          .then(data => {
            if (data.success) {
              message.success('Пользователь расшарен. передайте ему пароль: ' + data.data.verification_code)
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

  getSharedUser = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll(['value'], (err, values) => {
      if (!err) {
        this.props.getSharedUser(values)
          .then(data => {
            if (data.success) {
              window.localStorage.setItem('authToken', data.data.token)
              message.success('Пользователь переключен')
              this.setState({ isModalVisible: !this.state.isModalVisible })
              window.location.reload();
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

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '37529'
    })(
      <Select disabled={this.state.isCode} style={{ width: 100 }}>
        <Option value='37529'>+375(29)</Option>
        <Option value='37525'>+375(25)</Option>
        <Option value='37533'>+375(33)</Option>
        <Option value='37544'>+375(44)</Option>
      </Select>
    )

    const {
      user: { isFetching, data }
    } = this.props

    const ActiveCompany = data.hasOwnProperty('companies') && data.companies.find(i => i.company_id === data.active_company_id)

    return (
      <Fragment>
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={
              <span>
          <Icon type="user" />
          Данные пользователя
        </span>
            }
            key="1"
          >
            <div className='tab-content'>
              <Form className='content content_user form-user'>
                <Spin spinning={isFetching} style={{ maxWidth: '50rem', margin: '0 auto' }}>
                  <Row gutter={30}>
                    <Col span={24}>
                      <Form.Item style={{ width: '50%' }} label='Адрес электронной почты'>
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
                        })(<Input disabled/>)}
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item style={{ width: '50%' }} label='Мобильный телефон:'>
                        {getFieldDecorator('phone', {
                          initialValue: data.phone,
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
                        })(<Input disabled/>)}
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item style={{ width: '50%' }} label='Имя:'>
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
                        })(<Input disabled={!isEditMode}/>)}
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item style={{ width: '50%' }} label='Отчество:'>
                        {getFieldDecorator('patronymic', {
                          initialValue: data.patronymic,
                          rules: [
                            {
                              type: 'string',
                              message: 'Не похоже, что это отчество!'
                            }
                          ]
                        })(<Input disabled={!isEditMode}/>)}
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item style={{ width: '50%' }} label='Фамилия:'>
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
                        })(<Input disabled={!isEditMode}/>)}
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item style={{ width: '50%' }} label='Активаная компания:'>
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

                    <Col span={24}>
                      <Form.Item style={{ width: '50%' }} label='Должность:'>
                        {getFieldDecorator('position', {
                          initialValue: ActiveCompany.position ? ActiveCompany.position : 'Отсутствует'
                        })(<Input disabled/>)}
                      </Form.Item>
                    </Col>


                    {/*<Col span={24}>*/}
                    {/*  <Form.Item style={{ width: '50%' }} label='Роль:'>*/}
                    {/*    {getFieldDecorator('role_name', {*/}
                    {/*      initialValue: ActiveCompany.role_name ? ActiveCompany.role_name : 'Отсутствует'*/}
                    {/*    })(<Input disabled/>)}*/}
                    {/*  </Form.Item>*/}
                    {/*</Col>*/}
                  </Row>
                </Spin>
              </Form>

              <div>
                <Button style={{ margin: '2rem 2rem 0 0' }} type='primary'
                        onClick={isEditMode ? e => this.changeUserInfo(e) : (() => this.changeMode())}>
                  <Icon type='edit'/>
                  {isEditMode ? 'Сохранить изменения' : 'Изменить данные'}
                </Button>

                <Button type='primary' onClick={() => this.openModal('password')}>
                  <Icon type='edit'/>
                  Сменить пароль
                </Button>

                <Button type='primary' style={{ marginLeft: '2rem' }} onClick={() => this.openModal('phone')}>
                  <Icon type='edit'/>
                  Сменить номер телефона
                </Button>
              </div>
            </div>
          </TabPane>
          <TabPane
            tab={
              <span>
          <Icon type="team" />
          Расшаренные пользователи
        </span>
            }
            key="2"
          >
            <div className='tab-content'>
              <div>
                <Button type='primary' style={{ marginLeft: '2rem' }} onClick={() => this.openModal('share')}>
                  <Icon type='cloud'/>
                  Расшарить пользователя
                </Button>
                <Button type='primary' style={{ marginLeft: '2rem' }} onClick={() => this.openModal('getShared')}>
                  <Icon type='cloud-download'/>
                  Перейти к активному расшареному пользователю
                </Button>
              </div>
            </div>
          </TabPane>
        </Tabs>
        {isModalVisible &&
        <Modal
          title={`
                  ${this.state.modalType === 'password' ? 'Изменить пароль' : ''}
                  ${this.state.modalType === 'phone' ? 'Изменить номер телефона' : ''}
                  ${this.state.modalType === 'share' ? 'Расшарить пользователя' : ''}
                  ${this.state.modalType === 'getShared' ? 'Перейти к активному расшареному пользователю' : ''}
           `}
          visible
          closable={false}
          footer={null}
          className='reset-password'
        >
          <Form>
            {this.state.modalType === 'password'
              ? <Fragment>
                <Form.Item label='Старый пароль' hasFeedback>
                  {getFieldDecorator('old_password', {
                    rules: [
                      {
                        required: true,
                        message: 'Введите старый пароль'
                      }
                    ]
                  })(<Input.Password/>)}
                </Form.Item>

                <Form.Item label='Новый пароль' hasFeedback>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: 'Минимум восемь символов, как минимум одна буква и одна цифра',
                        pattern: /^.{8,128}$/
                      },
                      {
                        validator: this.validateToNextPassword
                      }
                    ]
                  })(<Input.Password/>)}
                </Form.Item>

                <Form.Item label='Подтвердите новый пароль' hasFeedback>
                  {getFieldDecorator('confirm', {
                    rules: [
                      {
                        required: true,
                        message: 'Минимум восемь символов, как минимум одна буква и одна цифра',
                        pattern: /^.{8,128}$/
                      },
                      {
                        validator: this.compareToFirstPassword
                      }
                    ]
                  })(<Input.Password/>)}
                </Form.Item>
              </Fragment>
              : <Fragment>
              </Fragment>
            }
            {this.state.modalType === 'phone'
              ? <Fragment>
                <Form.Item
                  validateStatus={this.state.validateStatus}
                  label='Введите номер мобильного телефона'
                >
                  {getFieldDecorator('phone', {
                    rules: [{ required: true, message: 'Пожалуйста, введите номер мобильного телефона' }]
                  })(<MaskedInput
                    mask='111-11-11'
                    placeholder='XXX-XX-XX'
                    disabled={this.state.isCode}
                    ref={this.inputPhoneNode}
                    onChange={e => {
                      this.handleChange(e.target.value, 'phone')
                    }}
                    addonBefore={prefixSelector}
                    style={{ width: '100%' }}
                  />)}
                </Form.Item>
                {this.state.isCode &&
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
              </Fragment>
              : <Fragment>
              </Fragment>
            }
            {this.state.modalType === 'share'
              ? <Fragment>
                <Form.Item
                  validateStatus={this.state.validateStatus}
                  label='Введите E-mail'
                >
                  {getFieldDecorator('email', {
                    rules: [{ required: true, message: 'Пожалуйста, введите E-mail' }]
                  })(<Input
                    placeholder='email'
                    style={{ width: '100%' }}
                  />)}
                </Form.Item>
              </Fragment>
              : <Fragment>
              </Fragment>
            }
            {this.state.modalType === 'getShared'
              ? <Fragment>
                <Form.Item
                  validateStatus={this.state.validateStatus}
                  label='Введите код'
                >
                  {getFieldDecorator('value', {
                    rules: [{ required: true, message: 'Пожалуйста, введите секретный код' }]
                  })(<Input
                    placeholder='Код'
                    style={{ width: '100%' }}
                  />)}
                </Form.Item>
              </Fragment>
              : <Fragment>
              </Fragment>
            }

          </Form>

          <div style={{ marginTop: '2rem' }}>
            {this.state.modalType === 'password'
              ? <Button type='primary' onClick={this.changeUserPassword}>Сохранить новый пароль</Button>
              : null
            }
            {this.state.modalType === 'phone'
              ? <Button type='primary' onClick={this.changeUserPhone}>
                {this.state.isCode
                  ? 'Отправить код'
                  : 'Изменить номер телефона'
                }
              </Button>
              : null
            }
            {this.state.modalType === 'share'
              ? <Button type='primary' onClick={this.shareUser}>Подтвердить шаринг</Button>
              : null
            }
            {this.state.modalType === 'getShared'
              ? <Button type='primary' onClick={this.getSharedUser}>Подтвердить переход</Button>
              : null
            }
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
