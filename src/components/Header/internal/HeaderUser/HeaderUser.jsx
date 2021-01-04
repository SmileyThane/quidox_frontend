import React, { useEffect, useState } from 'react'

import {
  Icon,
  Dropdown,
  Tag,
  message
} from 'antd'

import { getActiveCompany } from '../../../../utils'

import history from '../../../../history'

import { styleguide } from '../../../../constants'

import { User } from './styled'

const { colors } = styleguide

const HeaderUser = ({
  user: {
    data
  },
  userLogout
}) => {
  const [activeCompany, setActiveCompany] = useState(null)

  useEffect(() => {
    if (data) {
      setActiveCompany(data.hasOwnProperty('companies') && getActiveCompany(data))
    }
  }, [data])

  const handleLogout = () => {
    const logoutUri = data.co_brand_config ? data.co_brand_config.logout_uri : false

    userLogout()
      .then(({ data }) => {
        if (data.success) {
          window.localStorage.clear()
          window.sessionStorage.clear()

          if (logoutUri) {
            window.open(`${logoutUri}`, '_self')
          } else {
            history.push('/login')
          }
        } else {
          throw new Error(data.error)
        }
      })
      .catch(error => {
        message.error(error.message)
      })
  }

  return (
    <User>
      <Dropdown
        trigger={['click']}
        overlay={(
          <User.Menu>
            {activeCompany && (
              <User.Menu.Item>
                <Tag color={colors.green}>
                  { activeCompany.company_number && +activeCompany.company_number === 0
                    ? activeCompany.company_name
                    : (`УНП: ${activeCompany.company_number}`)
                  }
                </Tag>
              </User.Menu.Item>
            )}

            <User.Menu.Item>
              <User.Menu.Link onClick={() => history.push('/user-me')}>
                <Icon type='profile' /> Профиль
              </User.Menu.Link>
            </User.Menu.Item>

            <User.Menu.Item>
              <User.Menu.Link onClick={handleLogout}>
                <Icon type='logout' /> Выйти
              </User.Menu.Link>
            </User.Menu.Item>
          </User.Menu>
        )}
      >
        <User.Toggle>
          <User.Toggle.Email>{data.email || ''}</User.Toggle.Email>
          <Icon type='down' />
        </User.Toggle>
      </Dropdown>
    </User>
  )
}

export default HeaderUser
