import React, { useEffect, useState, Fragment } from 'react'
import { Menu, Icon } from 'antd'

import api from '../../services/api'
import history from '../../history.js'

import { Button } from '../'
import { MenuItem } from './internal'
import './Menu.scss'

const AntMenu = props => {
  const [menuData, setMenuData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.documents.getDocumentsStatuses()
      setMenuData(result.data)
    }
    fetchData()
  }, [])

  const handleTitleClick = menuKey => {
    const { pathname, search, state: prevState } = props.location
    const state = {
      ...prevState,
      menuKey: prevState && prevState.menuKey ? '' : menuKey
    }
    history.push({ pathname, search, state })
  }

  const { SubMenu } = Menu
  const { data } = menuData
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
        openKeys={[props.location.state ? props.location.state.menuKey : '']}
        // selectedKeys={[props.match.url, (props.location.pathname || {}).from]}
        selectedKeys={[`${props.location.state ? props.location.state.id : ''}`]}
      >
        <Menu.ItemGroup title={<span><Icon type="import" />Входящие</span>}>
          <MenuItem
            heading='Входящие'
            url='/documents'
            status={2}
            key='/documents/2'
            icon='import'
            id={'/documents/2'}
          />

          <MenuItem
            heading='УНП@'
            url='/documents'
            key='/documents/11'
            icon='file-protect'
            status={11}
            id={'/documents/11'}
          />
        </Menu.ItemGroup>
        <MenuItem
          heading='Отправленные'
          url='/documents'
          status={3}
          key='/documents/3'
          icon='export'
          id={'/documents/3'}
        />
        <MenuItem
          heading='Черновики'
          url='/documents'
          status={1}
          key='/documents/1'
          icon='file-text'
          id={'/documents/1'}
        />
        <MenuItem
          heading='Архив'
          url='/documents'
          status={4}
          key='/documents/4'
          icon='delete'
          id={'/documents/4'}
        />
        <MenuItem
          heading='Компании'
          url='/companies'
          key='/companies'
          icon='cluster'
          id={'/companies'}
        />
        <SubMenu
          disabled
          key='sub1'
          onTitleClick={({ key: menuKey }) => handleTitleClick(menuKey)}
          title={
            <span>
              <Icon type='funnel-plot' />
              <span>Статусы документов</span>
            </span>
          }
        >
          {data && data.attachment_statuses.map(i => (
            <MenuItem
              key={i.id}
              id={i.id}
              menuKey='sub1'
              isInner
              url='/attachments'
              status={i.id}
              icon='file-text'
              heading={i.name}
              iconColor={i.color}
            />
          ))}
        </SubMenu>
        <SubMenu
          disabled
          key='sub2'
          title={
            <span>
              <Icon type='funnel-plot' />
              <span>Статусы сообщений</span>
            </span>
          }
          onTitleClick={({ key: menuKey }) => handleTitleClick(menuKey)}
        >
          {data && data.document_statuses.map(i => {
            if (![1, 2, 3, 4].includes(i.id)) {
              return (
                <MenuItem
                  key={i.id}
                  id={i.id}
                  menuKey='sub2'
                  isInner
                  url='/documents'
                  status={i.id}
                  icon='file-text'
                  heading={i.name}
                  iconColor={i.color}
                />
              )
            }
          })}
        </SubMenu>
        <MenuItem
          heading='Проверка ЭЦП'
          url='/esc-checking'
          key='/esc-checking'
          icon='file-protect'
          id={'/esc-checking'}
        />
        <MenuItem
          heading='Сторонние источники'
          url='/documents'
          key='/documents/9'
          icon='file-text'
          status={9}
          id={'/documents/9'}

        />
        <MenuItem
            heading='Сообщения реестра'
            url='/documents'
            key='/documents/10'
            icon='file-text'
            status={10}
            id={'/documents/10'}

        />
        <MenuItem
          heading='Работа с реестром документов'
          url='/registry'
          key='/registry'
          icon='code'
          id={'/registry'}

        />
        <MenuItem
          heading='Загруженные реестры'
          url='/registry-stored'
          key='/registry-stored'
          icon='file-select'
          id={'/registry-stored'}

        />

        <MenuItem
          heading='Панель администратора'
          url=''
          key={11}
          icon='setting'
          disabled
        />
        <MenuItem
          heading='Защищенный архив'
          url=''
          key={33}
          icon='file-zip'
          disabled
        />
        <MenuItem
          heading='Интеграция (1С, CRM...)'
          url=''
          key={44}
          icon='code'
          disabled
        />
        <MenuItem
          heading='Папки пользователя'
          url=''
          key={55}
          icon='folder'
          disabled
        />
      </Menu>
    </Fragment>
  )
}

export default AntMenu
