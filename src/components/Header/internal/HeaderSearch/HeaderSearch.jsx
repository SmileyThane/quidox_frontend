import React from 'react'

import { Icon } from 'antd'

import { Search } from './styled'

export default () => {
  return (
    <Search>
      <Search.Icon type='search' />

      <Search.Input placeholder='Введите тему или отправителя' />

      <Search.Config>
        <Icon type='setting' />
      </Search.Config>
    </Search>
  )
}
