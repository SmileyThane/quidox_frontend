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
        selectedKeys={[props.match.path, (props.location.state || {}).from]}
        defaultOpenKeys={['sub1']}
      >
        <MenuItem
          heading='Входящие'
          url='/inbox-documents'
          key='/inbox-documents'
          icon='export'
        />
        <MenuItem
          heading='Отправленные'
          url='/out-documents'
          key='/out-documents'
          icon='import'
        />
        <MenuItem
          heading='Черновики'
          url='/drafts-documents'
          key='/drafts-documents'
          icon='file-text'
        />
        <MenuItem
          heading='Сторонние источники'
          url='/externals'
          key='/externals'
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
          key={1}
          icon='setting'
          disabled
        />
        <MenuItem
          heading='Корзина'
          url=''
          key={2}
          icon='delete'
          disabled
        />
        <MenuItem
          heading='Защищенный архив'
          url=''
          key={3}
          icon='file-zip'
          disabled
        />
        <MenuItem
          heading='Интеграция (1С, CRM...)'
          url=''
          key={4}
          icon='code'
          disabled
        />
        <MenuItem
          heading='Папки пользователя'
          url=''
          key={5}
          icon='folder'
          disabled
        />
      </Menu>
    </Fragment>
  )
}

export default AntMenu
