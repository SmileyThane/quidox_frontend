import React, { useState } from 'react'

import _ from 'lodash'
import { Link } from 'react-router-dom'
import { getTimeStamp } from '../../helpers'
import { Table, Icon, Popconfirm, AutoComplete, message } from 'antd'
import './Table.scss'

const defaultTableState = {
  selectedRowKeys: [],
  searchText: ''
}

const AntdTable = props => {

  const { activeCompany, getDocumentsWithParams, children, type, removeDocument, removeDocuments, ...rest } = props

  const [tableState, setTableState] = useState({ ...defaultTableState })

  const columns = [
    {
      title: 'Дата',
      dataIndex: 'created_at',
      sorter: (a, b) => getTimeStamp(a.created_at) - getTimeStamp(b.created_at)
    },
    {
      title: 'Отправитель'
    },
    {
      title: 'Тема',
      key: 'name',
      render: record => <Link to={`/documents/${record.id}`}>{record.name}</Link>
    },
    {
      title: 'Кол-во приложенных документы',
      key: 'attachments',
      render: record => <p style={{ textAlign: 'center' }} >{record.attachments.length === 0 ? 'Нет приложенных документов' : record.attachments.length }</p>
    },
    {
      title: 'Статус'
    },
    {
      title: 'Квитанция'
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

  const handleSearch = value => {
    if (value.length >= 3) {
      getDocumentsWithParams(activeCompany, { parameter: value })
    } else {
      getDocumentsWithParams(activeCompany)
    }
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
              <AutoComplete onSearch={_.debounce(handleSearch, 500)} placeholder='Введите дату, отправителя, тему...' />
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
