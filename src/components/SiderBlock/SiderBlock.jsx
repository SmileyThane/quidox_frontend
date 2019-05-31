import React from 'react'
import { Layout } from 'antd'

import { Menu } from '../'

const { Sider } = Layout

const SiderBlock = ({ children }) => {
  return (
    <Sider
      className='sidebar'
      style={{
        width: 175,
        marginRight: 30
      }}
    >
      <Menu />
    </Sider>
  )
}

export default SiderBlock
