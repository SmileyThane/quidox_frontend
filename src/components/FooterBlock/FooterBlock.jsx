import React from 'react'
import { Layout } from 'antd'
import './FooterBlock.scss'

const { Footer } = Layout
const FooterBlock = ({ children }) => {
  return (
    <Footer className='footer'>{children}</Footer>
  )
}

export default FooterBlock
