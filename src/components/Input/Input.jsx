import React, { forwardRef } from 'react'

import { Input } from 'antd'

const {
  Search,
  TextArea
} = Input

export default forwardRef(({ kind, ...rest }) => (
  <>
    {kind === 'search' && <Search {...rest} /> }
    {kind === 'text' && <Input {...rest} /> }
    {kind === 'textarea' && <TextArea autosize={{ minRows: 1, maxRows: 6 }} {...rest} /> }
  </>
))
