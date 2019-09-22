import React, { Fragment } from 'react'

import {
  Layout,
  Icon,
  Skeleton,
  Tag,
  Typography,
  Button,
  Dropdown,
  message
} from 'antd'

import history from '../../history.js'
import { logo } from '../../resources/img'
import './HeaderBlock.scss'

const { Header } = Layout
const { Text } = Typography

const HeaderBlock = props => {
  const {
    user: { isFetching, data },
    userLogout
  } = props

  const handleLogout = () => {
    userLogout()
      .then(({ data }) => {
        console.log(data)
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
                <div className='header__setting'>
                  <Button type='primary' ghost>Верификация ЭЦП</Button>

                  <div className='header-setting-item'>
                    <Text>Тариф: </Text>
                    <Tag color='blue' style={{ marginLeft: '1rem' }}>Старт</Tag>
                  </div>

                  <div className='header-setting-item'>
                    <Text>Доступно действий: </Text>
                    <Tag color='blue' style={{ marginLeft: '1rem' }}>500</Tag>
                  </div>

                  <div className='header-setting-item'>
                    <Text>Баланс (BYN): </Text>
                    <Tag color='blue' style={{ marginLeft: '1rem' }}>120.00</Tag>
                    <Button type='link'>Пополнить</Button>
                  </div>
                  <div className='header-setting-item'>
                    {(data && data.companies) && data.companies.map(i => {
                      if (i.company_id === data.active_company_id) {
                        return (
                          <Tag
                            key={i.company_id}
                            color='#87d068'
                            style={{ width: '100%', maxWidth: '15rem', textOverflow: 'ellipsis', overflow: 'hidden' }}
                          >
                            {i.company_name}
                          </Tag>
                        )
                      } else {
                        return null
                      }
                    })}
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
                                return <Tag key={i.company_id} color='#87d068' style={{ width: '100%' }}>{+i.company_number === 0 ? i.company_name : (`УНП: ${i.company_number}`)}</Tag>
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
                    <div>{data.email && data.email}</div>
                  </Dropdown>
                </div>
              </div>
            </Skeleton>
          </Fragment>
        }
      </div>
    </Header>
  )
}

export default HeaderBlock
