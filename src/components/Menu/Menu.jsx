import React, { Fragment } from 'react'

import { Menu, Icon, Badge } from 'antd'

import history from '../../history.js'

import { Button } from '../'
import { MenuItem } from './internal'
import './Menu.scss'

const countMessages = 1
const { SubMenu } = Menu

const AntMenu = props => {
  return (
    <Fragment>
      <Button
        type='primary'
        size='large'
        icon='plus'
        block
        onClick={() => history.push('/new-document')}
      >
        Новый документ
      </Button>
      <Menu
        mode='inline'
        defaultSelectedKeys={[props.location.pathname] || '/'}
        defaultOpenKeys={['sub1']}
      >
        <SubMenu
          key='sub1'
          title={
            <span>
              {countMessages && countMessages > 0
                ? <Badge className='badge' count={countMessages} />
                : <Icon type='inbox' />
              }
              <span>Входящие</span>
            </span>
          }
        >
          <MenuItem
            heading='Подписанные'
            url='/confirm-messages'
            key='/confirm-messages'
            icon='file-protect'
          />
          <MenuItem
            heading='Не подписанные'
            url='/unconfirmed-messages'
            key='/unconfirmed-messages'
            icon='exception'
          />
        </SubMenu>
        <MenuItem
          heading='Отправленные'
          url='/sent-messages'
          key='/sent-messages'
          icon='file-done'
        />
        <MenuItem
          heading='Компании'
          url='/company'
          key='/company'
          icon='desktop'
        />
      </Menu>
    </Fragment>
  )
}

export default AntMenu
