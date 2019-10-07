import React from 'react'
import { Layout } from 'antd'
import './FooterBlock.scss'

const { Footer } = Layout
const publicContract = 'https://quidox.by/agreement/'
const contacts = 'https://quidox.by/agreement/#callback'
const about = 'https://quidox.by/about/'
const FooterBlock = ({ ...rest }) => {
  return (
    <Footer className='footer' {...rest}>
      <a className='footer__link' target='_blanck' href={publicContract}>Публичный договор</a>
      <a className='footer__link' target='_blanck' href={contacts}>Контакты</a>
      <a className='footer__link' target='_blanck' href={about}>О сервисе</a>
    </Footer>
  )
}

export default FooterBlock
