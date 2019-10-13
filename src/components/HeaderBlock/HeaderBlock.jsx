import React, { Fragment } from 'react'

import {
  Layout,
  Icon,
  Skeleton,
  Tag,
  Dropdown,
  message,
  Tooltip,
  Avatar
} from 'antd'

import history from '../../history.js'
import { logo } from '../../resources/img'
import './HeaderBlock.scss'

const { Header } = Layout

const HeaderBlock = props => {
  const {
    user: { isFetching, data },
    userLogout
  } = props

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
  )
}

export default HeaderBlock
