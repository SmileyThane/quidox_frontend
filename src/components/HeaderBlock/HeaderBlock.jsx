import React, { useState, useEffect, useRef, Fragment } from 'react'

import { Layout, Icon, Skeleton, Tag, Typography, Button } from 'antd'

import history from '../../history.js'
import { logo } from './img'
import './HeaderBlock.scss'

const { Header } = Layout
const { Text } = Typography

const HeaderBlock = props => {
  const {
    user: { isFetching, data }
  } = props

  const [isVisible, setVisible] = useState(false)

  const nodeRef = useRef(null)

  useEffect(() => {
    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [])

  const handleClick = (event) => {
    if (nodeRef.current.contains(event.target)) {
      return
    }
    setVisible(false)
  }

  const handleLogout = () => {
    window.localStorage.clear()
    history.push('/login')
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
                    <Text>Баланс (BY): </Text>
                    <Tag color='#108ee9' style={{ marginLeft: '1rem' }}>0.00</Tag>
                  </div>

                  <div className='header-setting-item'>
                    <Text>Доступно действий: </Text>
                    <Tag color='#108ee9' style={{ marginLeft: '1rem' }}>0</Tag>
                  </div>

                  <div className='header-setting-item'>
                    <Text>Тариф: </Text>
                    <Tag color='#108ee9' style={{ marginLeft: '1rem' }}>0</Tag>
                  </div>
                </div>
                <div className='user header__user' ref={nodeRef}>
                  <span onClick={() => setVisible(true)}>{data.email}</span>
                  {isVisible &&
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
                  }
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

// {data &&
// }
//
// <Popconfirm
//   placement='bottomLeft'
//   title='Вы уверены?'
//   onConfirm={() => handleLogout()}
//   okText='Выйти'
//   cancelText='Отмена'
// >
//   <Icon
//     className='user__logout-btn'
//     type='logout'
//   />
// </Popconfirm>
