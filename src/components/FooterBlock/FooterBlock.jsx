import React from 'react'
import { Layout } from 'antd'
import './FooterBlock.scss'

const { Footer } = Layout
const FooterBlock = () => {
  return (
    <Footer className='footer'>
      <a className='footer__link' href='#'>Условия пользования</a>
      <a className='footer__link' href='#'>Контакты</a>
      <a className='footer__link' href='#'>О сервисе</a>
    </Footer>
  )
}

export default FooterBlock
