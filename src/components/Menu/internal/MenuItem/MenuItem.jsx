import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Icon } from 'antd'

const MenuItem = ({ url, icon, iconColor = '', messages, heading, ...rest }) => {

  return (
    <Menu.Item {...rest}>
      <NavLink to={url}>
        <Icon type={icon} theme={iconColor !== '' && 'twoTone'} />
        {heading}
      </NavLink>
    </Menu.Item>
  )
}

export default MenuItem
