import React from 'react'
import { Layout } from 'antd'

import { Menu } from '../'

const { Sider } = Layout

const SiderBlock = ({ children }) => {
  return (
    <Sider
      className='sidebar'
      style={{
        backgroundColor: '#fff',
        paddingTop: '2rem',
        borderRight: '1px solid #E0E0E0',
        boxShadow: '0 8px 18px 0 rgba(0,0,0,0.2)'
      }}
      width={300}
    >
      <Menu />
    </Sider>
  )
}

export default SiderBlock
