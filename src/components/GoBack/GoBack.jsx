import React from 'react'

import history from '../../history'
import GoBack from './styled'
export default function ({ config: { data }, children, ...rest }) {
  const coBrand = data.co_brand_config && data.co_brand_config
  return (
    <GoBack brand={coBrand} onClick={() => history.goBack()} {...rest}>
      {children}
    </GoBack>
  )
}