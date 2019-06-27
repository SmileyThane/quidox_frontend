import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import { Table, Icon, Popconfirm, message } from 'antd'
import { Input } from '../'
import './Table.scss'

const defaultTableState = {
  selectedRowKeys: [],
  searchText: ''
}

const AntdTable = props => {

  const { children, type, removeDocument, removeDocuments, ...rest } = props

  const [tableState, setTableState] = useState({ ...defaultTableState })

  const columns = [
    {
      title: 'Дата',
      width: 200,
      dataIndex: 'created_at',
      sorter: (a, b) => Math.round(new Date(a.created_at).getTime() / 1000) - Math.round(new Date(b.created_at).getTime() / 1000)
    },
    {
      title: 'Тема',
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
    setTableState({
      ...tableState,
      selectedRowKeys
    })
  }

  const handleRemove = (type) => {
    if (tableState.selectedRowKeys.length === 0) {
      message.error('Нет выбраных документов!')
      return null
    }
    if (tableState.selectedRowKeys.length > 1) {
      const obj = {
        ids: tableState.selectedRowKeys
      }
      removeDocuments(obj, type)
        .then(() => {
          message.success('Документы удалены')
          setTableState({ ...defaultTableState })
        })
    } else {
      removeDocument(tableState.selectedRowKeys[0], type)
        .then(() => {
          message.success('Документ удален')
          setTableState({ ...defaultTableState })
        })
        .catch(error => {
          message.error(error.message)
        })
    }
  }

  const handleSearch = e => {
    setTableState({
      ...tableState,
      searchText: e.target.value
    })
  }

  const rowSelection = {
    selectedRowKeys: tableState.selectedRowKeys,
    onChange: onSelectChange
  }

  console.log(tableState.searchText)
  return (
    <Table
      className='table'
      columns={columns}
      rowSelection={rowSelection}
      title={() =>
        (
          <div className='table__header table-header'>
            <div className='table-header__actions'>
              <Popconfirm
                title='Вы уверены?'
                onConfirm={() => handleRemove(type)}
                okText='Удалить'
                cancelText='Отмена'
              >
                <Icon type='delete' style={{ color: '#FF7D1D' }} />
              </Popconfirm>
            </div>
            <div className='table-header__search'>
              <Input kind='search' onChange={e => handleSearch(e)} placeholder='Введите дату, отправителя, тему...' />
            </div>
          </div>
        )}
      {...rest}
    >
      {children}
    </Table>
  )
}

export default AntdTable
