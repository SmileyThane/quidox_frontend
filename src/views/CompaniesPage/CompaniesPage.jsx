import React, { Fragment, useEffect, useState } from 'react'
import useForm from 'rc-form-hooks'
import { Link } from 'react-router-dom'

import {
  getCompanyData
} from '../../utils'
import { api } from '../../services'
import { CompanyCreate } from '../../components'
import {
  Table,
  Tag,
  Popconfirm,
  Form,
  message,
  Modal,
  Typography,
  Spin,
  Icon,
  Row,
  Col,
  Input,
  Button
} from 'antd'

import history from '../../history'
import './CompaniesPage.scss'

const defaultCompanyState = {
  newUserEmail: '',
  yourPosition: '',
  showInput: false,
  showModal: false,
  modalFetching: false,
  newCompany: {}
}

const { Text } = Typography

// eslint-disable-next-line spaced-comment
const isIE = /*@cc_on!@*/false || !!document.documentMode

const CompaniesPage = props => {
  const {
    getCompanies,
    changeActiveCompanyById,
    companies: { isFetching, list },
    user: { data }
  } = props

  const { getFieldDecorator, validateFields } = useForm()

  const [companyState, setCompanyState] = useState({ ...defaultCompanyState })

  useEffect(() => {
    getCompanies()
  }, [])

  const onClick = () => {
    setCompanyState({
      ...companyState,
      showModal: true,
      newCompany: getCompanyData()
    })
  }

  const changeActiveCompany = company => {
    if (company.company_data.id === data.active_company_id) {
      message.error('Компания является активной!')
      return null
    } else {
      changeActiveCompanyById(company.company_data.id)
        .then(() => {
          message.success('Активная компания изменена успешно!')

          const inputVerifiedDataArray = Array.from(document.getElementsByClassName('verifiedData'))
          console.log('verified input', inputVerifiedDataArray)
          inputVerifiedDataArray.forEach(i => {
            i.parentNode.removeChild(i)
          })
          setTimeout(() => {
            try {
              window.pluginLoaded()
            } catch (error) {
              console.log(error)
            }
          }, 1000)
        })
        .catch(error => {
          message.error(error.message)
        })
    }
  }

  const updateField = (field, value) => {
    setCompanyState({
      ...companyState,
      [field]: value
    })
  }

  const sendInvite = e => {
    e.preventDefault()
    validateFields()
      .then(() => {
        api.companies.attachUnregisteredUserToCompany({ email: companyState.newUserEmail })
          .then(({ data }) => {
            if (data.success) {
              message.success('Приглашение отправлено')
              setCompanyState({ ...defaultCompanyState })
            } else {
              throw new Error(data.error)
            }
          })
          .catch(error => {
            message.error(error.message)
          })
      })
  }

  const columns = [
    {
      title: 'Наименование',
      key: 'name',
      render: record => <Link to={{ pathname: `/companies/${+record.company_id}`, state: { from: history.location.pathname } }}>{record.company_data.name}</Link>
    },
    {
      title: 'УНП',
      key: 'number',
      dataIndex: 'company_data.company_number'
    },
    {
      title: 'Данные компании',
      key: 'description',
      dataIndex: 'company_data.description'
    },
    {
      title: 'Статус',
      render: record => (
        <Fragment>
          {data.active_company_id &&
          <Popconfirm
            placement='bottomLeft'
            title='Сделать компанию активной?'
            onConfirm={() => changeActiveCompany(record)}
            okText='Сделать активной'
            cancelText='Закрыть'
          >
            <Tag style={{ cursor: 'pointer' }} color={(record.company_data.id === data.active_company_id) ? '#87d068' : '#FF7D1D'}>
              {(record.company_data.id === data.active_company_id) ? 'Активная' : 'Не активная'}
            </Tag>
          </Popconfirm>
          }
        </Fragment>
      )
    }]

  console.log(companyState)
  return (
    <Fragment>
      <div className='content content_small-margin'>
        <Table
          pagination
          rowKey='id'
          columns={columns}
          dataSource={list}
          loading={isFetching}
          locale={{ emptyText: 'Нет созданных компаний' }}
        />
      </div>

      {companyState.showInput &&
        <div className='invite-block'>
          <Row>
            <Col span={12}>
              <Form onSubmit={sendInvite} style={{ marginTop: '3rem' }}>
                <Form.Item style={{ marginBottom: 0 }} label='Добавление нового пользователя в текущую компанию'>
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
                      type='email'
                    />
                  )}
                </Form.Item>

                <Button type='primary' style={{ marginTop: '1rem' }} htmlType='submit'>
                  <Icon type='plus' />
                  Отправить приглашение
                </Button>

                <Button
                  type='primary'
                  ghost
                  style={{ marginLeft: '1rem' }}
                  onClick={() => setCompanyState({ ...companyState, newUserEmail: '', showInput: false })}
                >
                  Отмена
                </Button>
              </Form>
            </Col>
          </Row>
        </div>
      }

      <Button
        type='primary'
        disabled={!isIE}
        onClick={onClick}
      >
        Создать компанию
      </Button>

      <Button
        type='primary'
        style={{ marginLeft: '1rem' }}
        onClick={() => setCompanyState({ ...companyState, showInput: true })}
      >
        <Icon type='usergroup-add' />
        Добавить пользователя в компанию
      </Button>

      <div style={{ marginTop: '1rem' }}>
        {!isIE &&
        <Text type='secondary'>Создание компании возможно только в браузере Internet Explorer</Text>
        }
      </div>

      <CompanyCreate />

      <Modal
        title='Данные цифрового накопителя'
        visible={companyState.showModal}
        width={600}
        closable={false}
        footer={null}
        onCancel={() => setCompanyState({ ...companyState, showModal: !companyState.showModal })}
      >
        {/*<div className='document document_modal'>*/}
        {/*  <Spin spinning={companyState.modalFetching}>*/}
        {/*    <div className='info'>*/}
        {/*      <div className='info__item'>*/}
        {/*        <div className='info__title'>Дата создания</div>*/}
        {/*        <div className='info__content'>{companyState.newCompanyDate}</div>*/}
        {/*      </div>*/}

        {/*      {companyState.newCompanyNumber &&*/}
        {/*        <div className='info__item'>*/}
        {/*          <div className='info__title'>УНП</div>*/}
        {/*          <div className='info__content'>{companyState.newCompanyNumber}</div>*/}
        {/*        </div>*/}
        {/*      }*/}

        {/*      {companyState.newCompanyName &&*/}
        {/*        <div className='info__item'>*/}
        {/*          <div className='info__title'>Имя компании</div>*/}
        {/*          <div className='info__content'>{companyState.newCompanyName}</div>*/}
        {/*        </div>*/}
        {/*      }*/}

        {/*      {companyState.newCompanyCity &&*/}
        {/*        <div className='info__item'>*/}
        {/*          <div className='info__title'>Место нахождения компании</div>*/}
        {/*          <div className='info__content'>{companyState.newCompanyCity}</div>*/}
        {/*        </div>*/}
        {/*      }*/}

        {/*      {companyState.yourPosition &&*/}
        {/*        <div className='info__item'>*/}
        {/*          <div className='info__title'>Должность сотруднка</div>*/}
        {/*          <div className='info__content'>{companyState.yourPosition}</div>*/}
        {/*        </div>*/}
        {/*      }*/}

        {/*      {companyState.newCompanyKey &&*/}
        {/*        <div className='info__item'>*/}
        {/*          <div className='info__title'>Цифровой ключ</div>*/}
        {/*          <div className='info__content'>{companyState.newCompanyKey}</div>*/}
        {/*        </div>*/}
        {/*      }*/}
        {/*    </div>*/}

        {/*    <Button style={{ margin: '20px 0 0 20px' }} onClick={handleCreateCompany} type='primary'>Создать</Button>*/}
        {/*  </Spin>*/}
        {/*</div>*/}

      </Modal>
    </Fragment>
  )
}

export default CompaniesPage
