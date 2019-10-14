import React, { Fragment, useState } from 'react'

import {
  Layout,
  Icon,
  Skeleton,
  Tag,
  Dropdown,
  message,
  Tooltip,
  Avatar,
  Button,
  Modal,
} from 'antd'

import history from '../../history.js'
import { logo } from '../../resources/img'
import './HeaderBlock.scss'
import moment from 'moment'

const defaultState = {
  isModalVisible: false,
  companyContent: false,
  newCompanyDate: '', // Дата создания
  newCompanyNumber: null, // УНП компании
  newCompanyName: '', // Полное имя компании
  newCompanyCity: '', // Место регистрации компании
  newCompanyFullName: '', // Полное имя компании?
  newCompanyKey: null // Ключ компании
}

const { Header } = Layout

const HeaderBlock = props => {
  const {
    user: { isFetching, data },
    userLogout,
    createCompany,
    getUser
  } = props

  const [state, setState] = useState({ ...defaultState })

  const handleOpenModal = () => {
    setState({
      ...state,
      isModalVisible: true
    })
  }

  const handleCloseModal = () => {
    setState({
      ...defaultState
    })
  }

  const handleGetCompanyData = () => {
    window.sign('NewCompany')
    setTimeout(() => {
      const flashData = JSON.parse(decodeURIComponent(document.getElementById('verifiedDataNewCompany').value))
      setState({
        ...state,
        companyContent: true,
        newCompanyDate: moment().format('DD/MM/YYYY HH:mm'),
        newCompanyName: flashData.subject['2.5.4.3'] ? flashData.subject['2.5.4.3'] : 'Данные отсутствуют',
        newCompanyKey: flashData.cert['2.5.29.14'] ? flashData.cert['2.5.29.14'] : 'Невозможно создать цифровой ключ',
        newCompanyCity: (flashData.subject['2.5.4.7'] || flashData.subject['2.5.4.9']) ? flashData.subject['2.5.4.7'] + ', ' + flashData.subject['2.5.4.9'] : 'Данные отсутствуют',
        newCompanyNumber: flashData.cert['1.2.112.1.2.1.1.1.1.2'] ? +flashData.cert['1.2.112.1.2.1.1.1.1.2'] : 'Данные отсутствуют',
        yourPosition: flashData.cert['1.2.112.1.2.1.1.5.1'] ? flashData.cert['1.2.112.1.2.1.1.5.1'] : 'Данные отсутствуют'
      })
    }, 1000)
  }

  const handleCreateCompany = () => {
    const newCompanyData = {
      name: state.newCompanyName,
      company_number: state.newCompanyNumber,
      description: state.newCompanyCity,
      registration_date: state.newCompanyDate,
      your_position: state.yourPosition,
      key: state.newCompanyKey
    }
    createCompany(newCompanyData)
      .then(response => {
        if (response.success) {
          setState({ ...defaultState })
          message.success('Компания создана успешно!!')
          history.push('/companies')
          getUser()
        } else {
          throw new Error(response.error)
        }
      })
      .catch(error => {
        message.error(error.message)
        setState({ ...defaultState })
      })
  }

  const handleLogout = () => {
    userLogout()
      .then(({ data }) => {
        if (data.success) {
          window.localStorage.clear()
          history.push('/login')
        } else {
          throw new Error(data.error)
        }
      })
      .catch(error => {
        message.error(error.message)
      })
  }

  const activeCompany = data.hasOwnProperty('companies') && data.companies.find(i => i.company_id === data.active_company_id)

  return (
    <Fragment>
      <Header className='header'>
        <div className='header__content'>
          <aside className='header__left'>
            <img className='header__logo' src={logo} alt='Quidox Logo' style={{ maxHeight: '5rem' }} />
          </aside>
          {window.localStorage.getItem('authToken') &&
          <Fragment>
            <Skeleton loading={isFetching} active paragraph={false}>
              <div className='header-data'>
                <div className='header-data--item'>
                  Тариф:
                  <span className='tag-span'>
                    {activeCompany && activeCompany.tarification.tarification_data.name}
                  </span>
                </div>

                <div className='header-data--item'>
                  Доступно действий:
                  <span className='tag-span'>
                    {activeCompany && activeCompany.tarification.max_actions}
                  </span>
                </div>

                <div className='header-data--item'>
                  Баланс (BYN):
                  <span className='tag-span'>
                    {activeCompany && activeCompany.company_data.balance}
                  </span>
                </div>
                <div className='header-data--item'>
                  {activeCompany &&
                  <Tooltip arrowPointAtCenter title={activeCompany.company_data.name}>
                    <Tag
                      color='#87d068'
                      style={{ width: '100%', maxWidth: '15rem', textOverflow: 'ellipsis', overflow: 'hidden' }}
                    >
                      {+activeCompany.company_data.company_number === 0
                        ? activeCompany.company_data.name
                        : activeCompany.company_data.company_number
                      }
                    </Tag>
                  </Tooltip>
                  }
                </div>
              </div>

              <Button type='primary' ghost onClick={handleOpenModal}>Подключить ЭЦП</Button>

              <div className='user header__user'>
                <Dropdown
                  overlay={
                    (
                      <ul className='user__dropdown'>
                        <li className='user__dropdown__item' style={{ textAlign: 'center' }}>
                          {(data && data.companies) && data.companies.map(i => {
                            if (i.company_id === data.active_company_id) {
                              return <Tag key={i.company_id} color='#87d068' style={{ width: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}>{+i.company_number === 0 ? i.company_name : (`УНП: ${i.company_number}`)}</Tag>
                            } else {
                              return null
                            }
                          })}
                        </li>
                        <li className='user__dropdown__item' onClick={() => history.push('/user-me')}>
                          <Icon type='profile' style={{ marginRight: 10 }} />
                          <span>Профиль</span>
                        </li>
                        <li className='user__dropdown__item' onClick={() => handleLogout()}>
                          <Icon type='logout' style={{ marginRight: 10 }} />
                          <span>Выйти</span>
                        </li>
                      </ul>
                    )
                  }
                  trigger={['click']}
                >
                  <a className='ant-dropdown-link user-link'>
                    <Avatar className='user-avatar' icon='user' />
                    <span className='user-email'>{data.email && data.email}</span>
                    <Icon type='down' style={{ marginLeft: '.5rem' }} />
                  </a>
                </Dropdown>
              </div>
            </Skeleton>
          </Fragment>
          }
        </div>
      </Header>
      {state.isModalVisible &&
      <Modal
        visible
        closable={false}
        title={state.companyContent ? 'Данные цифрового накопителя' : 'Мы готовы подключить ЭЦП к Вашей учетной записи!'}
        footer={[
          <Button
            type='primary'
            onClick={
              !state.companyContent
                ? handleGetCompanyData
                : handleCreateCompany
            }
          >
            Создать
          </Button>,
          <Button
            type='primary'
            onClick={handleCloseModal}
            ghost
          >
            Отмена
          </Button>

        ]}
      >
        {!state.companyContent &&
          <Fragment>
            <p>Убедитесь в том, что:</p>
            <ol>
              <li>У Вас установлен комплект абонента ГосСУОК</li>
              <li>Текущий браузер MS Internet Explorer</li>
              <li>Ключ ЭЦП вставлен в компьютер</li>
            </ol>
          </Fragment>
        }
        {state.companyContent &&
        <Fragment>
          <div className='document document_modal'>
            <div>
              <div className='info'>
                <div className='info__item'>
                  <div className='info__title'>Дата создания</div>
                  <div className='info__content'>{state.newCompanyDate}</div>
                </div>

                {state.newCompanyNumber &&
                <div className='info__item'>
                  <div className='info__title'>УНП</div>
                  <div className='info__content'>{state.newCompanyNumber}</div>
                </div>
                }

                {state.newCompanyName &&
                <div className='info__item'>
                  <div className='info__title'>Имя компании</div>
                  <div className='info__content'>{state.newCompanyName}</div>
                </div>
                }

                {state.newCompanyCity &&
                <div className='info__item'>
                  <div className='info__title'>Место нахождения компании</div>
                  <div className='info__content'>{state.newCompanyCity}</div>
                </div>
                }

                {state.yourPosition &&
                <div className='info__item'>
                  <div className='info__title'>Должность сотруднка</div>
                  <div className='info__content'>{state.yourPosition}</div>
                </div>
                }

                {state.newCompanyKey &&
                <div className='info__item'>
                  <div className='info__title'>Цифровой ключ</div>
                  <div className='info__content'>{state.newCompanyKey}</div>
                </div>
                }
              </div>
            </div>
          </div>
        </Fragment>
        }
      </Modal>
      }
      <input type='hidden' id='dataNewCompany' value={window.btoa(data.email)} />

      <input type='hidden' id='companyData' />

      <div id='attrCertSelectContainer' style={{ display: 'none' }}>
        <span id='certExtAbsent' />

        <select style={{ visibility: 'hidden' }} id='attrCertSelect' />
      </div>

      <input type='hidden' id='attrValue' size='80' disabled='disabled' />
    </Fragment>
  )
}

export default HeaderBlock
