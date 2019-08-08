import React, { useState, Fragment } from 'react'

import _ from 'lodash'
import { Link } from 'react-router-dom'
import { getTimeStamp } from '../../helpers'
import { Table, Icon, Popconfirm, AutoComplete, message, Typography } from 'antd'
import './Table.scss'

const defaultTableState = {
  selectedRowKeys: [],
  searchText: ''
}

const { Text } = Typography

const AntdTable = props => {
  const { activeCompany, getDocumentsWithParams, children, type, columnName = '', removeDocument, removeDocuments, ...rest } = props

  const [tableState, setTableState] = useState({ ...defaultTableState })

  const columns = [
    {
      title: type !== 'draft' && `${columnName}`,
      key: type !== 'draft' ? 'author' : '',
      render: record => type !== 'draft' &&
        <Fragment>
          {columnName !== 'Отправитель'
            ? <Fragment>
              {record.attached_to_users && record.attached_to_users.map(user => (
                <Link to={`/documents/${record.id}`} key={user.id}>
                  <div style={{ padding: '.5rem 0' }}>
                    {user.user_company.user_email}<br />
                    [{user.user_company.company_name}]
                  </div>
                </Link>
              ))}
            </Fragment>
            : <Link to={`/documents/${record.id}`}>
              <div>
                {record.author['user_email']}<br />
                [{record.author['company_name']}]
              </div>
            </Link>
          }
        </Fragment>
    },
    {
      title: 'Тема',
      key: 'name',
      render: record => <Link style={{ textTransform: 'uppercase' }} to={`/documents/${record.id}`}>{record.name}</Link>
    },
    {
      title: 'Кол-во документов',
      key: 'attachments',
      render: record => <Link to={`/documents/${record.id}`} style={{ textAlign: 'center' }} >{record.attachments.length === 0 ? 'Нет приложенных документов' : record.attachments.length }</Link>
    },
    {
      title: 'Дата',
      dataIndex: 'created_at',
      sorter: (a, b) => getTimeStamp(a.created_at) - getTimeStamp(b.created_at)
    },
    {
      title: 'Статус'
    },
    {
      title: 'Квитанция',
      render: record => <Link to={`/documents/${record.id}`}>{record['applied_attachments_count'] === 0 ? 'Нет квитанций' : record['applied_attachments_count']}</Link>
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
      console.log('documents')
      removeDocuments(obj, type)
        .then(() => {
          message.success('Документы удалены')
          setTableState({ ...defaultTableState })
        })
    } else {
      console.log('document')
      removeDocument(tableState.selectedRowKeys[0], type)
        .then(response => {
          console.log(response)
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
      locale={{ emptyText: 'Нет данных' }}
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
      footer={() =>
        (
          <div className='table__footer table-footer'>
            <div className='table-footer__item'>
              <Text>Отмечено: {tableState.selectedRowKeys.length}</Text>
            </div>
            <div className='table-footer__item'>
              <Text>Всего: {tableState.selectedRowKeys.length}</Text>
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
