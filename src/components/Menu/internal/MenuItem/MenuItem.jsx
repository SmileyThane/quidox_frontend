import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Icon } from 'antd'

const MenuItem = ({ id, url, icon, messages, heading, ...rest }) => {

  return (
    <Menu.Item id={id} {...rest}>
      <NavLink to={url}>
        <Icon type={icon} />
        {heading}
      </NavLink>
    </Menu.Item>
  )
}

export default MenuItem
