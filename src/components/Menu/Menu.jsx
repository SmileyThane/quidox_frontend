import React, { Fragment } from 'react'

import { Menu, Icon } from 'antd'

import history from '../../history.js'

import { Button } from '../'
import { MenuItem } from './internal'
import './Menu.scss'

const AntMenu = props => {
  const { SubMenu } = Menu
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
        Новое сообщение
      </Button>
      <Menu
        mode='inline'
        selectedKeys={[props.match.path, (props.location.state || {}).from]}
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
          heading='Внутренние'
          url='/'
          key='/'
          icon='import'
          disabled
        />
        <MenuItem
          heading='Черновики'
          url='/drafts-documents'
          key='/drafts-documents'
          icon='file-text'
        />
        <MenuItem
          heading='Компании'
          url='/companies'
          key='/companies'
          icon='desktop'
        />
        <SubMenu
          key='sub1'
          title={
            <span>
              <Icon type='mail' />
              <span>Navigation One</span>
            </span>
          }
        >
          <MenuItem icon='file-text' key='5' url='/out-documents' heading='Option 1' />
          <MenuItem icon='file-text' key='6' url='/' heading='Option 2' />
          <MenuItem icon='file-text' key='7' url='/' heading='Option 3' />
          <MenuItem icon='file-text' key='8' url='/' heading='Option 4' />
        </SubMenu>
        <SubMenu
          key='sub2'
          title={
            <span>
              <Icon type='mail' />
              <span>Navigation Two</span>
            </span>
          }
        >
          <MenuItem icon='file-text' key='5' url='/out-documents' heading='Option 1' />
          <MenuItem icon='file-text' key='6' url='/' heading='Option 2' />
          <MenuItem icon='file-text' key='7' url='/' heading='Option 3' />
          <MenuItem icon='file-text' key='8' url='/' heading='Option 4' />
        </SubMenu>
        <MenuItem
          heading='Сторонние источники'
          url='/externals'
          key='/externals'
          icon='file-text'
          disabled
        />
        <MenuItem
          heading='Панель администратора'
          url=''
          key={1}
          icon='setting'
          disabled
        />
        <MenuItem
          heading='Архив'
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
