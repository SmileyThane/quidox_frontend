import React, { useEffect, useState, Fragment } from 'react'
import { Menu, Icon } from 'antd'

import api  from '../../services/api'
import history from '../../history.js'

import { Button } from '../'
import { MenuItem } from './internal'
import './Menu.scss'

const AntMenu = props => {
  const [menuData, setMenuData] = useState({})

  useEffect( () => {
    const fetchData = async () => {
      const result = await api.documents.getDocumentsStatuses()
      setMenuData(result.data);
    }
    fetchData()
  }, []);

  const { SubMenu } = Menu
  const { data } = menuData

  console.log(data)
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
        // selectedKeys={[props.match.path, (props.location.state || {}).from]}
      >
        <MenuItem
          heading='Полученные'
          url='/documents/2'
          key='/documents/2'
          icon='export'
        />
        <MenuItem
          heading='Отправленные'
          url='/documents/3'
          key='/documents/3'
          icon='import'
        />
        <MenuItem
          heading='Черновики'
          url='/documents/1'
          key='/documents/1'
          icon='file-text'
        />
        <MenuItem
          heading='Архив'
          url='/documents/4'
          key='/documents/4'
          icon='delete'
        />
        <MenuItem
          heading='Компании'
          url='/companies'
          key='/companies'
          icon='cluster'
        />
        <SubMenu
          key='sub1'
          disabled
          title={
            <span>
              <Icon type='funnel-plot' />
              <span>Статусы сообщений</span>
            </span>
          }
        >
          {data &&  data.attachment_statuses.map(i => (
            <MenuItem
              key={`attachemnt/${i.id}`}
              url={`/attachments/${i.id}`}
              icon='file-text'
              heading={i.name}
              iconColor='#52c41a'
            />
          ))}
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
          {data &&  data.document_statuses.map(i => (
            <MenuItem
              key={i.id}
              url={`/documents/${i.id}`}
              icon='file-text'
              heading={i.name}
              iconColor='#52c41a'
            />
          ))}
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
