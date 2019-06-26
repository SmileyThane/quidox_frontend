import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import { Table, Icon } from 'antd'
import { Input } from '../'
import './Table.scss'

const defaultTableState = {
  selectedRowKeys: []
}

const AntdTable = ({ children, removeDocument, ...rest }) => {
  const [tableState, setTableState] = useState({ ...defaultTableState })

  const columns = [
    {
      title: 'Дата',
      dataIndex: 'created_at',
      width: 200
    },
    {
      title: 'Имя сообщения',
      key: 'name',
      width: 300,
      render: record => <Link to={`/documents/${record.id}`}>{record.name}</Link>
    },
    {
      title: 'Текст сообщения',
      dataIndex: 'description',
      width: 500
    }
  ]

  const onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    setTableState({
      ...tableState,
      selectedRowKeys
    })
  }

  const handleRemove = (type) => {
    removeDocument(tableState.selectedRowKeys[0], type)
      .then(() => {
        setTableState({ ...defaultTableState })
      })
  }

  const rowSelection = {
    selectedRowKeys: tableState.selectedRowKeys,
    onChange: onSelectChange
  }

  return (
    <Table
      className='table'
      columns={columns}
      rowSelection={rowSelection}
      title={() =>
        (
          <div className='table__header table-header'>
            <div className='table-header__actions'>
              <Icon type='delete' style={{ color: '#FF7D1D' }} onClick={() => handleRemove('draft')} />
            </div>
            <div className='table-header__search'>
              <Input kind='search' placeholder='Введите дату, отправителя, тему...' />
            </div>
            <div className='table-header__pagination'></div>
          </div>
        )}
      {...rest}
    >
      {children}
    </Table>
  )
}

export default AntdTable
