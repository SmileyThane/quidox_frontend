import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Icon } from 'antd'

const MenuItem = ({ url, id, icon, isInner = false, menuKey = '', iconColor = '', messages, heading, status, ...rest }) => {
  const to = {
    pathname: url,
    state: { id, isInner, menuKey }
  }

  if (status) {
    to.search = `?status=${status}`
  }

  return (
    <Menu.Item {...rest}>
      <NavLink to={to}>
        <Icon type={icon} theme={iconColor !== '' && 'twoTone'} twoToneColor={`${iconColor}`} />
        {heading}
      </NavLink>
    </Menu.Item>
  )
}

export default MenuItem
