import React from 'react'

import ThemeButton from './styled'
import './Button.scss'

export default function ({ user: { data }, children, ...rest }) {
  const coBrand = data.co_brand_config && data.co_brand_config
  console.log(coBrand)
  return (
    <ThemeButton brand={coBrand} {...rest}>{children}</ThemeButton>
  )
}
