import React, { Fragment } from 'react'

import { Menu, Icon, Badge } from 'antd'

import history from '../../history.js'

import { Button } from '../'
import { MenuItem } from './internal'
import './Menu.scss'

const countMessages = 0

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
                : <Icon type='export' />
              }
              <span>Входящие</span>
            </span>
          }
        >
          <MenuItem
            heading='Подписанные'
            url='/inbox-confirmed-documents'
            key='/inbox-confirmed-documents'
            icon='file-protect'
          />
          <MenuItem
            heading='Не подписанные'
            url='/inbox-unconfirmed-documents'
            key='/inbox-unconfirmed-documents'
            icon='exception'
          />
        </Menu.ItemGroup>
        <Menu.ItemGroup
          title={
            <span>
              <Icon type='import' />
              Отправленные
            </span>
          }
        >
          <MenuItem
            heading='Подписанные'
            url='/out-confirmed-documents'
            key='/out-confirmed-documents'
            icon='file-protect'
          />
          <MenuItem
            heading='Не подписанные'
            url='/out-unconfirmed-documents'
            key='/out-unconfirmed-documents'
            icon='exception'
          />
        </Menu.ItemGroup>
        <MenuItem
          heading=' Черновики'
          url='/drafts'
          key='/drafts'
          icon='file-text'
        />
        <MenuItem
          heading='Компании'
          url='/companies'
          key='/companies'
          icon='desktop'
        />
        <MenuItem
          heading='Панель администратора'
          url=''
          key=''
          icon='setting'
        />
      </Menu>
    </Fragment>
  )
}

export default AntMenu
