import React from 'react'
// import axios from 'axios'
// import MaskedInput from 'antd-mask-input'

import { api } from '../../services'

import {
  Row,
  Col,
  Form,
  Input,
  message,
  Select,
  Spin,
  Tabs,
  List,
  Avatar
} from 'antd'

import {
  LayoutScroll,
  FooterFixed,
  Button
} from '../../components'

import {
  ModalShare,
  ModalGetShared,
  ModalPasswordEdit
} from './components'

import {
  Layout,
  Profile
} from './styled'

const { Option } = Select

const { TabPane } = Tabs

class UserInfoPage extends React.Component {
  state = {
    userId: null,
    activeCompanyId: null,
    isEditMode: false,
    isModalPasswordVisible: false,
    isModalGetSharedVisible: false,
    isModalShareVisible: false,
    phone: '',
    modalType: '',
    isCode: false,
    sharedUsers: [],
    activeTabKey: '1'
  }

  inputPhoneNode = React.createRef()

  componentDidMount () {
    if (this.inputPhoneNode.current) {
      this.inputPhoneNode.current.focus()
    }
  }

  componentWillMount () {
    this.getSharedUsers()
  }

  getSharedUsers = () => {
    api.user.getSharedUsers()
      .then(({ data }) => {
        if (data.success) {
          this.setState({
            sharedUsers: data.data
          })
        } else {
          throw new Error(data.error)
        }
      })
      .catch(error => {
        message.error(error.message)
      })
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

  changeMode = () => {
    this.setState({ isEditMode: true })
  }

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props

    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }

    callback()
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props

    if (value && value !== form.getFieldValue('password')) {
      callback('Пароли не совпадают')
    } else {
      callback()
    }
  }

  // changeUserPhone = e => {
  //   e.preventDefault()

  //   this.props.form.validateFieldsAndScroll(['phone', 'code'], (err, values) => {
  //     const phoneData = {
  //       phone: this.state.phone,
  //       code: values.code,
  //     }
  //     if (this.state.isCode) {
  //       axios.post(`${process.env.REACT_APP_BASE_URL}/sms/confirm`, phoneData)
  //         .then(({ data }) => {
  //           if (data.success) {
  //             this.props.updateUser(phoneData)
  //               .then(data => {
  //                 if (data.success) {
  //                   message.success('Номер успешно сохранен')
  //                   this.setState({ isModalVisible: false })
  //                 } else {
  //                   throw new Error(data.error)
  //                 }
  //               })
  //               .catch(error => {
  //                 message.error(error.message)
  //               })
  //           } else {
  //             throw new Error(data.error)
  //           }
  //         })
  //         .catch(error => {
  //           message.error(error.message)
  //         })
  //     } else {
  //       axios.post(`${process.env.REACT_APP_BASE_URL}/sms/send`, phoneData)
  //         .then(({ data }) => {
  //           if (data.success) {
  //             message.success('На указанный Вами номер отправлено SMS с кодом')
  //             this.setState({ isCode: true })
  //           } else {
  //             throw new Error(data.error)
  //           }
  //         })
  //         .catch(error => {
  //           message.error(error.message)
  //         })
  //     }
  //   })
  // }

  changeUserPassword = e => {
    e.preventDefault()

    this.props.form.validateFieldsAndScroll([/*'old_password',*/ 'password'], (err, values) => {
      if (!err) {
        this.props.updateUser(values)
          .then(data => {
            if (data.success) {
              message.success('Пароль обновлен')

              this.setState({
                isModalPasswordVisible: !this.state.isModalPasswordVisible
              })
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
              message.success('Доступ предоставлен. Передайте доверенному лицу пароль: ' + data.data.verification_code)

              this.setState({
                isModalShareVisible: !this.state.isModalShareVisible
              })
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

              this.setState({
                isModalGetSharedVisible: !this.state.isModalGetSharedVisible
              })

              window.location.reload()
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

  handleModalVisible = type => {
    this.setState({
      isCode: false,
      [type]: !this.state[type]
    })
  }

  handleChangeTab = key => {
    console.log(key)
    this.setState({
      activeTabKey: key
    })
  }

  render () {
    const {
      form: {
        getFieldDecorator
      }
    } = this.props

    const {
      activeTabKey,
      isEditMode,
      isModalPasswordVisible,
      isModalGetSharedVisible,
      isModalShareVisible,
      validateStatus
    } = this.state

    // const prefixSelector = getFieldDecorator('prefix', {
    //   initialValue: '37529'
    // })(
    //   <Select disabled={this.state.isCode} style={{ width: 100 }}>
    //     <Option value='37529'>+375(29)</Option>
    //     <Option value='37525'>+375(25)</Option>
    //     <Option value='37533'>+375(33)</Option>
    //     <Option value='37544'>+375(44)</Option>
    //   </Select>
    // )

    const {
      user: { isFetching, data }
    } = this.props

    const ActiveCompany = data.hasOwnProperty('companies') && data.companies.find(i => i.company_id === data.active_company_id)

    return (
      <LayoutScroll withFooter>
        <Layout>
          <Layout.Inner>
            <ModalPasswordEdit
              visible={isModalPasswordVisible}
              onSubmit={this.changeUserPassword}
              onCancel={() => this.handleModalVisible('isModalPasswordVisible')}
              getFieldDecorator={getFieldDecorator}
              validateTo={this.validateToNextPassword}
              compareTo={this.compareToFirstPassword}
            />

            <ModalGetShared
              visible={isModalGetSharedVisible}
              onSubmit={this.getSharedUser}
              onCancel={() => this.handleModalVisible('isModalGetSharedVisible')}
              getFieldDecorator={getFieldDecorator}
              validateStatus={validateStatus}
            />

            <ModalShare
              visible={isModalShareVisible}
              onSubmit={this.shareUser}
              onCancel={() => this.handleModalVisible('isModalShareVisible')}
              getFieldDecorator={getFieldDecorator}
              validateStatus={validateStatus}
            />

            {data.id && (
              <Profile>
                <Avatar
                  size={110}
                  icon='user'
                />

                <Profile.Inner>
                  <Profile.Email>{data.email}</Profile.Email>
                  <Profile.Code>УНП: {data.active_company_object ? data.active_company_object.company_number : ''}</Profile.Code>
                </Profile.Inner>
              </Profile>
            )}

            <Tabs
              defaultActiveKey={activeTabKey}
              onChange={this.handleChangeTab}
            >
              <TabPane
                tab='Личная информация'
                key='1'
              >
                <Form colon={false}>
                  <Spin spinning={isFetching}>
                    <Row gutter={[12, 16]}>
                      <Col span={12}>
                        <Form.Item
                          label='Адрес электронной почты'
                          required={false}
                        >
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
                          })(
                            <Input placeholder='Введите электронной почту' disabled />
                          )}
                        </Form.Item>

                        <Form.Item
                          label='Мобильный телефон'
                          required={false}
                        >
                          {getFieldDecorator('phone', {
                            initialValue: data.phone,
                            rules: [
                              {
                                required: true,
                                message: 'Пожалуйста, введите номер телефона!'
                              }
                            ]
                          })(
                            <Input placeholder='Введите номер телефона' disabled />
                          )}
                        </Form.Item>

                        <Form.Item
                          label='Имя'
                          required={false}
                        >
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
                          })(
                            <Input placeholder='Введите имя' disabled={!isEditMode} />
                          )}
                        </Form.Item>

                        <Form.Item
                          label='Отчество'
                          required={false}
                        >
                          {getFieldDecorator('patronymic', {
                            initialValue: data.patronymic,
                            rules: [
                              {
                                type: 'string',
                                message: 'Не похоже, что это отчество!'
                              }
                            ]
                          })(
                            <Input placeholder='Введите отчество' disabled={!isEditMode} />
                          )}
                        </Form.Item>

                        <Form.Item
                          label='Фамилия'
                          required={false}
                        >
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
                          })(
                            <Input placeholder='Введите фамилию' disabled={!isEditMode} />
                          )}
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Form.Item
                          label='Активная компания'
                          required={false}
                        >
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

                        <Form.Item
                          label='Должность'
                          required={false}
                        >
                          {getFieldDecorator('position', {
                            initialValue: ActiveCompany.position
                              ? ActiveCompany.position
                              : 'Отсутствует'
                          })(
                            <Input placeholder='Введите должность' disabled />
                          )}
                        </Form.Item>
                      </Col>
                    </Row>
                  </Spin>
                </Form>
              </TabPane>

              <TabPane
                tab='Доверительный доступ'
                key='2'
              >
                <List
                  className='content content_user'
                  dataSource={this.state.sharedUsers}
                  rowKey='id'
                  locale={{ emptyText: 'Нет расшаренных пользователей' }}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        title={<h4>{item.shared.company_name}</h4>}
                        description={item.shared.user_email}
                      />
                    </List.Item>
                  )}
                />
              </TabPane>
            </Tabs>
          </Layout.Inner>

          <FooterFixed>
            {activeTabKey === '1' && (
              <>
                <Button
                  type='primary'
                  icon='lock'
                  onClick={() => this.handleModalVisible('isModalPasswordVisible')}
                  ghost
                >
                  Сменить пароль
                </Button>

                {isEditMode ? (
                  <Button
                    type='primary'
                    onClick={e => this.changeUserInfo(e)}
                    icon='edit'
                  >
                    Сохранить изменения
                  </Button>
                ) : (
                  <Button
                    type='primary'
                    onClick={this.changeMode()}
                    icon='edit'
                  >
                    Редактировать данные
                  </Button>
                )}
              </>
            )}

            {activeTabKey === '2' && (
              <>
                <Button
                  type='primary'
                  onClick={() => this.handleModalVisible('isModalGetSharedVisible')}
                  icon='user'
                  ghost
                >
                  Учетная запись доверителя
                </Button>

                <Button
                  type='primary'
                  onClick={() => this.handleModalVisible('isModalShareVisible')}
                  icon='share-alt'
                >
                  Предоставить доступ
                </Button>
              </>
            )}
          </FooterFixed>
        </Layout>
      </LayoutScroll>
    )
  }
}

const WrappedUserForm = Form.create({ name: 'user' })(UserInfoPage)
export default WrappedUserForm
