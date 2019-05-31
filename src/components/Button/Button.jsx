import React from 'react'

import { Button } from 'antd'
import './Button.scss'
const AntdButton = ({ children, ...rest }) => {

  return (
    <Button {...rest}>{children}</Button>
  )
}

export default AntdButton
