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
          url='/inner-documents'
          key='/inner-documents'
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
          icon='cluster'
        />
        <SubMenu
          key='sub1'
          title={
            <span>
              <Icon type='funnel-plot' />
              <span>Статусы сообщений</span>
            </span>
          }
        >
          <Menu.Item key='5' url='/out-documents'>
            <Icon type='file-text' theme='twoTone' twoToneColor='#52c41a' />
            Доставлено, завершено
          </Menu.Item>
          <Menu.Item key='6' url='/'>
            <Icon type='file-text' theme='twoTone' twoToneColor='#1890ff' />
            Доставлено, в работе
          </Menu.Item>
          <Menu.Item key='7' url='/'>
            <Icon type='file-text' theme='twoTone' twoToneColor='#fa8c16' />
            Требует реакции
          </Menu.Item>
          <Menu.Item key='8' url='/'>
            <Icon type='file-text' theme='twoTone' twoToneColor='#f5222d' />
            Отклонено
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key='sub2'
          title={
            <span>
              <Icon type='funnel-plot' />
              <span>Статусы документов</span>
            </span>
          }
        >
          <Menu.Item key='6' url='/'>
            <Icon type='file-text' theme='twoTone' twoToneColor='#52c41a' />
            Завершено
          </Menu.Item>
          <Menu.Item key='5' url='/out-documents'>
            <Icon type='file-text' theme='twoTone' twoToneColor='#1890ff' />
            Требуется подпись
          </Menu.Item>
          <Menu.Item key='7' url='/'>
            <Icon type='file-text' theme='twoTone' twoToneColor='#f5222d' />
            Отклонен
          </Menu.Item>
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
