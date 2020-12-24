import React from 'react'

import { Icon } from 'antd'

import history from '../../history'

import { Button } from './styled'

export default ({ ...rest }) => {
  return (
    <Button
      onClick={() => history.goBack()}
      {...rest}
    >
      <Icon type='left' />
    </Button>
  )
}
