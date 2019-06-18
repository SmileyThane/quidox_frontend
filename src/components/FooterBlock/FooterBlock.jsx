import React from 'react'
import { Layout } from 'antd'
import './FooterBlock.scss'

const { Footer } = Layout
const hrefLink = '#'
const FooterBlock = () => {
  return (
    <Footer className='footer'>
      <div className='container'>
        <a className='footer__link' href={hrefLink}>Условия пользования</a>
        <a className='footer__link' href={hrefLink}>Контакты</a>
        <a className='footer__link' href={hrefLink}>О сервисе</a>
      </div>
    </Footer>
  )
}

export default FooterBlock
