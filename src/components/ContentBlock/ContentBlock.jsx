import React from 'react'
import classNames from 'classnames'
import { Layout } from 'antd'
import './ContentBlock.scss'

const { Content } = Layout

const ContentBlock = ({ logWrapp, children }) => {
  const mainLayoutClassName = classNames(
    'main-content',
    {
      'main-content__public': logWrapp
    }
  )

  return (
    <Content className={mainLayoutClassName}>{children}</Content>
  )
}

export default ContentBlock
