import React from 'react'
import ThemeRouterLink from './styled'

export default function ({ config: { data }, children, ...rest }) {

  const coBrand = data.co_brand_config && data.co_brand_config
  return (
    <ThemeRouterLink brand={coBrand} {...rest}>{children}</ThemeRouterLink>
  )
}
