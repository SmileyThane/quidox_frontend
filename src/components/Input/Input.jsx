import React, { Fragment } from 'react'

import './Input.scss'
import { Input } from 'antd'

const Search = Input.Search
const AntdInput = ({ kind, ...rest }) => {

  return (
    <Fragment>
      {kind === 'search' && <Search {...rest} /> }
    </Fragment>
  )
}

export default AntdInput
