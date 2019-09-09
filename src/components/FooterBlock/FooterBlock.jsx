import React from 'react'
import { Layout } from 'antd'
import './FooterBlock.scss'

const { Footer } = Layout
const hrefLink = '#'
const FooterBlock = ({ ...rest }) => {
  return (
    <Footer className='footer' {...rest}>
      <a className='footer__link' href={hrefLink}>Условия пользования</a>
      <a className='footer__link' href={hrefLink}>Контакты</a>
      <a className='footer__link' href={hrefLink}>О сервисе</a>
    </Footer>
  )
}

export default FooterBlock
