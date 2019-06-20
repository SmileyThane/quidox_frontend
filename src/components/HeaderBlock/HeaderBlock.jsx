import React, { Fragment } from 'react'

import { Layout, Icon, Popconfirm } from 'antd'

import history from '../../history.js'
import { Input } from '../'
import './HeaderBlock.scss'

const { Header } = Layout
const HeaderBlock = props => {
  const {
    user: { data }
  } = props

  const handleLogout = () => {
    window.localStorage.clear()
    history.push('/login')
  }

  return (
    <Header className='header'>
      <div className='container'>
        <div className='header__content'>
          <aside className='header__left'>
            <p className='header__logo'>E D M</p>
          </aside>
          {window.localStorage.getItem('authToken') &&
            <Fragment>
              <Input
                className='header__input'
                placeholder='Введите УНП, название документа или компании'
                onSearch={() => console.log('value')}
                kind='search'
              />
              <div className='user header__user'>
                {data &&
                  <span>{data.email}</span>
                }
                <Popconfirm
                  placement='bottom'
                  title='Вы уверены?'
                  onConfirm={() => handleLogout()}
                  okText='Выйти'
                  cancelText='Закрыть'
                >
                  <Icon
                    className='user__logout-btn'
                    type='logout'
                  />
                </Popconfirm>
              </div>
            </Fragment>
          }
        </div>
      </div>
    </Header>
  )
}

export default HeaderBlock
