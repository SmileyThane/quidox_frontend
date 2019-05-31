import React from 'react'
import { Table } from 'antd'

const AntdTable = ({ children, ...rest }) => {

  return (
    <Table className='table' {...rest}>{children}</Table>
  )
}

export default AntdTable
