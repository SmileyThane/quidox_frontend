import React, { Fragment } from 'react'

import { Menu, Icon, Badge } from 'antd'

import history from '../../history.js'

import { Button } from '../'
import { MenuItem } from './internal'
import './Menu.scss'

const countMessages = 1

const AntMenu = props => {
  return (
    <Fragment>
      <Button
        type='primary'
        size='large'
        icon='plus'
        block
        onClick={() => history.push('/new-document')}
        style={{ maxWidth: '26rem', marginLeft: '1.5rem', padding: '1rem 1.5rem', height: 'auto' }}
      >
        Новый документ
      </Button>
      <Menu
        mode='inline'
        defaultSelectedKeys={props.location.pathname === 'new-document' ? [''] : [props.location.pathname]}
        defaultOpenKeys={['sub1']}
      >
        <Menu.ItemGroup
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
        </Menu.ItemGroup>
        <MenuItem
          heading='Отправленные'
          url='/sent-messages'
          key='/sent-messages'
          icon='file-done'
        />
        <MenuItem
          heading=' Черновики'
          url='/drafts'
          key='/drafts'
          icon='file-text'
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
