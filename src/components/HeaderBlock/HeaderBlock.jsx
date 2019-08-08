import React, { Fragment } from 'react'

import { Layout, Icon, Popconfirm, Skeleton, Tag, Typography } from 'antd'

import history from '../../history.js'
import { logo } from './img'
import './HeaderBlock.scss'

const { Header } = Layout
const { Text } = Typography

const HeaderBlock = props => {
  const {
    user: { isFetching, data }
  } = props

  const handleLogout = () => {
    window.localStorage.clear()
    history.push('/login')
  }
  console.log(data)
  return (
    <Header className='header'>
      <div className='header__content'>
        <aside className='header__left'>
          <img className='header__logo' src={logo} alt='Quidox Logo' />
        </aside>
        {window.localStorage.getItem('authToken') &&
          <Fragment>
            <Skeleton loading={isFetching} active paragraph={false}>
              <div className='header__setting'>
                <Text>
                  Активная компания:
                  {(data && data.companies) && data.companies.map(i => {
                    if (i.company_id === data.active_company_id) {
                      return <Tag color='#87d068' style={{ marginLeft: '.5rem' }}>{i.company_name}</Tag>
                    } else {
                      return null
                    }
                  })}
                </Text>
              </div>
              <div className='user header__user'>
                {data &&
                <span onClick={() => history.push('/user-me')}>{data.email}</span>
                }
                <Popconfirm
                  placement='bottom'
                  title='Вы уверены?'
                  onConfirm={() => handleLogout()}
                  okText='Выйти'
                  cancelText='Отмена'
                >
                  <Icon
                    className='user__logout-btn'
                    type='logout'
                  />
                </Popconfirm>
              </div>
            </Skeleton>
          </Fragment>
        }
      </div>
    </Header>
  )
}

export default HeaderBlock
