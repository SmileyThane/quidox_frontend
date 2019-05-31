import React from 'react'
import { Layout } from 'antd'
import classNames from 'classnames'
import './LayoutBlock.scss'

const LayoutBlock = ({ content, top, children }) => {

  const mainLayoutClassName = classNames(
    'wrapp',
    {
      'wrapp--login': top
    },
    {
      'wrapp--contet': content
    }
  )

  return (
    <Layout className={mainLayoutClassName}>{children}</Layout>
  )
}

export default LayoutBlock
