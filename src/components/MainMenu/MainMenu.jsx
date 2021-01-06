import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

import { Menu, Icon } from 'antd'

import { Button } from '../'

import api from '../../services/api'
import history from '../../history.js'

import * as images from './images'

import { MainMenu } from './styled'

export default withRouter(({ location }) => {
  const [menuParams, setMenuParams] = useState(null)
  const [subMenuKeys, setSubMenuKeys] = useState([])

  const mainMenuList = [
    {
      name: 'Входящие — Почта',
      url: '/documents?status=2',
      icon: images.IconMail
    },
    {
      name: 'Входящие — УНП',
      url: '/documents?status=11',
      icon: images.IconVerify
    },
    {
      name: 'Отправленные',
      url: '/documents?status=3',
      icon: images.IconSend
    },
    {
      name: 'Черновики',
      url: '/documents?status=1',
      icon: images.IconDocument
    },
    {
      name: 'Архив',
      url: '/documents?status=4',
      icon: images.IconArchive
    },
    {
      name: 'Работа с реестром',
      icon: images.IconCode,
      subMenu: [
        {
          name: 'Создать по реестру',
          url: '/registry'
        },
        {
          name: 'Сообщения по реестру',
          url: '/documents?status=10'
        },
        {
          name: 'Загруженные реестры',
          url: '/registry-stored'
        }
      ]
    },
    {
      name: 'Статусы документов',
      icon: images.IconStatus,
      subMenu: menuParams ? menuParams.attachment_statuses.map(item => ({
        ...item,
        url: `/documents?status=${item.id}`
      })) : []
    },
    {
      name: 'Компании',
      url: '/companies',
      icon: images.IconCompanies
    },
    {
      name: 'Сторонние источники',
      url: '/documents?status=9',
      icon: images.IconDocument
    },
    {
      name: 'Проверка ЭЦП',
      url: '/esc-checking',
      icon: images.IconVerify
    }
  ]

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.documents.getDocumentsStatuses()

      setMenuParams(result.data.data)
    }

    fetchData()
  }, [])

  return (
    <MainMenu>
      <MainMenu.CreateMessage>
        <Button
          type='primary'
          onClick={() => history.push('/new-document')}
          block
        >
          <Icon component={images.IconNewMessage} /> Новое сообщение
        </Button>
      </MainMenu.CreateMessage>

      <MainMenu.Inner>
        <Menu
          mode='inline'
          openKeys={subMenuKeys}
          selectedKeys={[`${location.pathname ? `${location.pathname}${location.search}` : ''}`]}
          onOpenChange={keys => setSubMenuKeys(keys)}
        >
          {mainMenuList.map((link, i) => {
            return link.subMenu ? (
              <Menu.SubMenu
                key={i}
                title={
                  <MainMenu.SubTitle>
                    <Icon component={link.icon} /> {link.name}
                  </MainMenu.SubTitle>
                }
              >
                {link.subMenu.map(subLink => (
                  <Menu.Item key={subLink.url}>
                    <Link to={subLink.url}>{subLink.name}</Link>
                  </Menu.Item>))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item
                key={link.url}
                onClick={() => setSubMenuKeys([])}
              >
                <Link to={link.url}>
                  <Icon component={link.icon} /> {link.name}
                </Link>
              </Menu.Item>
            )
          })}
        </Menu>
      </MainMenu.Inner>
    </MainMenu>
  )
})
