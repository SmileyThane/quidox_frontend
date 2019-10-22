import React, { Fragment, useEffect, useState } from 'react'
import useForm from 'rc-form-hooks'
import { Link } from 'react-router-dom'
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
  const isIE = /*@cc_on!@*/!!document.documentMode

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
      // newCompany: getCompanyData()
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
        onClick={onClick}
      >
        Подключить ЭЦП
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
      <Modal
        title='Подключение ЭЦП'
        visible={companyState.showModal}
        width={600}
        closable={false}
        footer={null}
      >
        <CompanyCreate onCancel={() => setCompanyState({ ...companyState, showModal: !companyState.showModal })} />
      </Modal>
    </Fragment>
  )
}

export default CompaniesPage
