import React, { Fragment, useEffect, useState } from 'react'
import moment from 'moment'
import useForm from 'rc-form-hooks'

import history from '../../history';
import { api } from '../../services'
import { Button } from '../../components'
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
  Input
} from 'antd'

import './CompanyPage.scss'

const defaultCompanyState = {
  selectedCompanyId: null,
  newUserEmail: '',
  yourPosition: '',
  showInput: false,
  showModal: false,
  modalFetching: false,
  newCompanyDate: '', // Дата создания
  newCompanyNumber: null, // УНП компании
  newCompanyName: '', // Полное имя компании
  newCompanyCity: '', // Место регистрации компании
  newCompanyFullName: '', // Полное имя компании?
  newCompanyKey: null // Ключ компании
}

const { Text } = Typography

// eslint-disable-next-line spaced-comment
const isIE = /*@cc_on!@*/false || !!document.documentMode

const CopmanyPage = props => {
  const {
    getCompany,
    createCompany,
    changeActiveCompanyById,
    companies: { isFetching, list },
    user: { data }
  } = props

  const { getFieldDecorator, validateFields } = useForm()

  useEffect(() => {
    getCompany()
  }, [])

  const [companyState, setCompanyState] = useState({ ...defaultCompanyState })

  const onClick = () => {
    window.sign('NewCompany')
    setTimeout(() => {
      const flashData = JSON.parse(decodeURIComponent(document.getElementById('verifiedDataNewCompany').value))
      setCompanyState({
        ...companyState,
        showModal: true,
        newCompanyDate: moment().format('DD/MM/YYYY HH:mm'),
        newCompanyName: flashData.subject['2.5.4.3'] ? flashData.subject['2.5.4.3'] : 'Данные отсутствуют',
        newCompanyKey: (flashData.cert['1.2.112.1.2.1.1.1.1.1'] && flashData.cert['1.2.112.1.2.1.1.1.1.2']) ? flashData.cert['1.2.112.1.2.1.1.1.1.2'] + flashData.cert['1.2.112.1.2.1.1.1.1.1'] : 'Невозможно создать цифровой ключ',
        newCompanyCity: (flashData.subject['2.5.4.7'] || flashData.subject['2.5.4.9']) ? flashData.subject['2.5.4.7'] + ', ' + flashData.subject['2.5.4.9'] : 'Данные отсутствуют',
        newCompanyNumber: flashData.cert['1.2.112.1.2.1.1.1.1.2'] ? +flashData.cert['1.2.112.1.2.1.1.1.1.2'] : 'Данные отсутствуют',
        yourPosition: flashData.cert['1.2.112.1.2.1.1.5.1'] ? flashData.cert['1.2.112.1.2.1.1.5.1'] : 'Данные отсутствуют'
      })
    }, 1000)
  }

  const changeActiveCompany = company => {
    if (company.company_data.id === data.active_company_id) {
      message.error('Компания является активной!')
      return null
    } else {
      changeActiveCompanyById(company.company_data.id)
        .then(() => {
          message.success('Активная компания изменена успешно!')
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
        api.company.attachUnregisteredUserToCompany({ email: companyState.newUserEmail })
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

  const handleCreateCompany = () => {
    const newCompanyData = {
      name: companyState.newCompanyName,
      company_number: companyState.newCompanyNumber,
      description: companyState.newCompanyCity,
      registration_date: companyState.newCompanyDate,
      your_position: companyState.yourPosition,
      key: companyState.newCompanyKey
    }
    createCompany(newCompanyData)
      .then(response => {
        if (response.success) {
          setCompanyState({ ...defaultCompanyState })
          message.success('Компания создана успешно!!')
        } else {
          throw new Error(response.error)
        }
      })
      .catch(error => {
        message.error(error.message)
        setCompanyState({ ...defaultCompanyState })
      })
  }

  const columns = [{
    title: 'Имя',
    dataIndex: 'company_data.name'
  },
  {
    title: 'УНП',
    dataIndex: 'company_data.company_number'
  },
  {
    title: 'Данные компании',
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
          onRow={record => {
            return {
              onClick: () => history.push(`/companies/${+record.company_number}`)
            }
          }}
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
                <Button style={{ marginLeft: '1rem' }} ghost type='primary' onClick={() => setCompanyState({ ...companyState, newUserEmail: '', showInput: false })}>Отмена</Button>
              </Form>
            </Col>
          </Row>
        </div>
      }
      {isIE
        ? <Button type='primary' onClick={onClick}>Создать компанию</Button>
        : <Text type='secondary'>Создание компании возможно только в браузере Internet Explorer</Text>
      }
      <Button type='primary' style={{ marginLeft: '1rem' }} onClick={() => setCompanyState({ ...companyState, showInput: true })}>
        <Icon type='usergroup-add' />
        Добавить пользователя в компанию
      </Button>
      <input type='hidden' id='dataNewCompany' value={window.btoa(data.email)} />
      <input type='hidden' id='companyData' />
      <div id='attrCertSelectContainer' style={{ display: 'none' }}>
        <span id='certExtAbsent' />
        <select style={{ visibility: 'hidden' }} id='attrCertSelect' />
      </div>
      <input type='hidden' id='attrValue' size='80' disabled='disabled' />
      <Modal
        visible={companyState.showModal}
        width={600}
        title='Данные цифрового накопителя'
        closable={false}
        footer={null}
        onCancel={() => setCompanyState({ ...companyState, showModal: !companyState.showModal })}
      >
        <div className='document document_modal'>
          <Spin spinning={companyState.modalFetching}>
            <div className='info'>
              <div className='info__item'>
                <div className='info__title'>Дата создания</div>
                <div className='info__content'>{companyState.newCompanyDate}</div>
              </div>
              {companyState.newCompanyNumber &&
                <div className='info__item'>
                  <div className='info__title'>УНП</div>
                  <div className='info__content'>{companyState.newCompanyNumber}</div>
                </div>
              }
              {companyState.newCompanyName &&
                <div className='info__item'>
                  <div className='info__title'>Имя компании</div>
                  <div className='info__content'>{companyState.newCompanyName}</div>
                </div>
              }
              {companyState.newCompanyCity &&
                <div className='info__item'>
                  <div className='info__title'>Место нахождения компании</div>
                  <div className='info__content'>{companyState.newCompanyCity}</div>
                </div>
              }
              {companyState.yourPosition &&
                <div className='info__item'>
                  <div className='info__title'>Должность сотруднка</div>
                  <div className='info__content'>{companyState.yourPosition}</div>
                </div>
              }
              {companyState.newCompanyKey &&
                <div className='info__item'>
                  <div className='info__title'>Цифровой ключ</div>
                  <div className='info__content'>{companyState.newCompanyKey}</div>
                </div>
              }
            </div>
            <Button style={{ margin: '20px 0 0 20px' }} onClick={handleCreateCompany} type='primary'>Создать</Button>
          </Spin>
        </div>

      </Modal>
    </Fragment>
  )
}

export default CopmanyPage
