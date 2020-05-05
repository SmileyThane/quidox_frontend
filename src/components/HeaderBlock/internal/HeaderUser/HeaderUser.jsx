import React, { useEffect, useState } from 'react'

import { Dropdown, Typography, message } from 'antd'
import { User } from './styled'
import { getActiveCompany } from '../../../../utils'
import history from '../../../../history'

const { Text } = Typography
const defaultState = {
  activeCompany: null
}
const HeaderUser = ({ user: { data }, userLogout }) => {
  const [state, setState] = useState({ ...defaultState })

  useEffect(() => {
    if (data) {
      setState({
        ...state,
        activeCompany: data.hasOwnProperty('companies') && getActiveCompany(data)
      })
    }
  }, [data])

  const handleLogout = () => {
    const logoutUri = data.co_brand_config.logout_uri
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

  const { activeCompany } = state
  return (
    <User>
      <Dropdown
        trigger={['click']}
        overlay={(
          <User.Dropdown>
            {activeCompany &&
              <User.DropdownItem>
                <User.DropdownTag
                  color='#87d068'
                >
                  { activeCompany.company_number && +activeCompany.company_number === 0
                    ? activeCompany.company_name
                    : (`УНП: ${activeCompany.company_number}`)
                  }
                </User.DropdownTag>
              </User.DropdownItem>
            }

            <User.DropdownItem
              onClick={() => history.push('/user-me')}
            >
              <User.DropdownIcon type='profile' />

              <Text>Профиль</Text>
            </User.DropdownItem>

            <User.DropdownItem
              onClick={handleLogout}
            >
              <User.DropdownIcon type='logout' />

              <Text>Выйти</Text>
            </User.DropdownItem>
          </User.Dropdown>
        )}
      >
        <User.Info>
          <User.InfoAvatar icon='user' />

          <Text>
            { data.email && data.email }
          </Text>

          <User.InfoArrow type='down' />
        </User.Info>
      </Dropdown>
    </User>
  )
}

export default HeaderUser
