import React from 'react'

import { LayoutScroll } from './styled'

export default ({
  withFooter,
  children
}) => (
  <LayoutScroll withFooter={withFooter}>
    {children}
  </LayoutScroll>
)
