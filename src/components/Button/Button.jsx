import React from 'react'

import { Button } from 'antd'

export default ({ children, ...rest }) => (
  <Button {...rest}>
    {children}
  </Button>
)
