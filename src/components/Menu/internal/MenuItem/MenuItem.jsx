import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Icon } from 'antd'

import ThemeMenuItem from './styled'

export default function ({ user: { data }, url, id, icon, isInner = false, menuKey = '', iconColor = '', messages, heading, status, ...rest }) {
  const to = {
    pathname: url,
    state: { id, isInner, menuKey }
  }

  if (status) {
    to.search = `?status=${status}`
  }
  const coBrand = data.co_brand_config && data.co_brand_config
  return (
    <ThemeMenuItem brand={coBrand} {...rest}>
      <NavLink to={to}>
        <Icon type={icon} theme={iconColor !== '' && 'twoTone'} twoToneColor={`${iconColor}`} />
        {heading}
      </NavLink>
    </ThemeMenuItem>
  )
}

