import React, { Fragment } from 'react'

import './Input.scss'
import { Input } from 'antd'

const Search = Input.Search
const TextArea = Input.TextArea
const AntdInput = ({ kind, ...rest }, ref) => {

  return (
    <Fragment>
      {kind === 'search' && <Search {...rest} /> }
      {kind === 'text' && <Input {...rest} /> }
      {kind === 'textarea' && <TextArea autosize={{ minRows: 1, maxRows: 6 }} {...rest} /> }
    </Fragment>
  )
}

export default React.forwardRef(AntdInput)
