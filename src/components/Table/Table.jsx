import React, { useState, useEffect, Fragment, useRef } from 'react'

import _ from 'lodash'
import { Link } from 'react-router-dom'
import { getTimeStamp } from '../../helpers'
import {
  Table,
  Icon,
  Popconfirm,
  AutoComplete,
  message,
  Typography,
  Select,
  Modal,
  Button,
  Spin,
  Pagination,
  Tooltip
} from 'antd'

import './Table.scss'
import { findUsersByParams } from '../../services/api/user'
import history from '../../history'
import moment from 'moment'

const defaultTableState = {
  selectedRowKeys: [],
  searchText: '',
  value: [],
  fetching: false,
  data: [],
  showModal: false
}

const { Text } = Typography
const { Option } = Select

const AntdTable = props => {
  const {
    getDocumentsWithParams,
    activeCompany,
    children,
    type,
    columnName = '',
    removeDocumentById,
    removeDocumentsByIds,
    documents,
    sendDocumentToUser,
    tableData,
    status,
    ...rest
  } = props

  const input = useRef(null)

  const [tableState, setTableState] = useState({ ...defaultTableState })

  useEffect(() => {
    if (activeCompany) {
      getDocumentsWithParams(activeCompany, { status: status, per_page: window.localStorage.getItem('perPage') ? +window.localStorage.getItem('perPage') : 5 })
    }
  }, [activeCompany, getDocumentsWithParams, status])

  const columns = [
    {
      title: type !== 'draft' && `${columnName}`,
      key: type !== 'draft' ? 'author' : '',
      render: record => type !== 'draft' &&
        <Fragment>
          {columnName !== 'Отправитель'
            ? <Fragment>
              {record.document.attached_to_users && record.document.attached_to_users.map((user, index) => {
                if (index === 0) {
                  return (
                    <Link to={{ pathname: `/documents/${user.document_id}`, state: { from: history.location.pathname } }} key={user.id}>
                      <div style={{ padding: '.5rem 0' }}>
                        {user.user_company &&
                        user.user_company.user_email
                        }
                        <br />
                        {user.user_company &&
                        '[ ' + user.user_company.company_name + ' ]'
                        }
                        {record.document.attached_to_users.length > 1 && <Fragment><br />и еще {record.document.attached_to_users.length - 1}</Fragment>}
                      </div>
                    </Link>
                  )
                } else {
                  return null
                }
              })}
            </Fragment>
            : <Link to={{ pathname: `/documents/${record.document.id}`, state: { from: history.location.pathname } }}>
              <div>
                {record.document.author &&
                '[' + record.document.author['user_email'] + ']'
                }
                <br />
                {record.document.author &&
                  '[' + record.document.author['company_name'] + ']'
                }
              </div>
            </Link>
          }
        </Fragment>
    },
    {
      title: 'Тема',
      key: 'descr',
      render: record => <Link to={{ pathname: `/documents/${record.document.id}`, state: { from: history.location.pathname } }}>{record.document.name}</Link>
    },
    {
      title: () => <Icon type="paper-clip" />,
      key: 'attachments',
      render: record => <Link to={{ pathname: `/documents/${record.document.id}`, state: { from: history.location.pathname } }} style={{ textAlign: 'center' }} >{record.document.attachments.length === 0 ? 'Нет приложенных документов' : record.document.attachments.length }</Link>
    },
    {
      title: 'Дата',
      key: 'date',
      className: 'date-column',
      render: record => <Text>{moment.utc(record.document.created_at, 'YYYY-MM-DD HH:mm').local().format('DD/MM/YYYY HH:mm:ss')}</Text>,
      sorter: (a, b) => getTimeStamp(a.document.created_at) - getTimeStamp(b.document.created_at)
    },
    {
      title: 'Статус',
      key: 'status',
      className: 'status-column',
      render: record => <Text>{record.status_name}</Text>
    },
    {
      title: 'Квитанция',
      key: 'receipt',
      className: 'table-download',
      render: record => <Fragment>
        <Tooltip placement='topRight' title='Скачать квитанцию в формате pdf' arrowPointAtCenter>
          <Icon type='file-pdf' style={{ marginRight: '0.5rem', fontSize: '1.8rem', cursor: 'pointer' }} />
        </Tooltip>

        <Tooltip placement='topRight' title='Скачать квитанцию в формате xml' arrowPointAtCenter>
          <Icon type='file-text' style={{ fontSize: '1.8rem', cursor: 'pointer' }} />
        </Tooltip>
      </Fragment>
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
      removeDocumentsByIds(obj, type)
        .then(response => {
          if (response.success) {
            message.success('Документы удалены')
            setTableState({ ...defaultTableState })
          } else {
            throw new Error(response.error)
          }
        })
        .catch(error => {
          message.error(error.message)
        })
    } else {
      removeDocumentById(tableState.selectedRowKeys[0], type)
        .then(response => {
          if (response.success) {
            message.success('Документ удален')
            setTableState({ ...defaultTableState })
          } else {
            throw new Error(response.error)
          }
        })
        .catch(error => {
          message.error(error.message)
        })
    }
  }

  const handleSearch = value => {
    if (value.length >= 3) {
      getDocumentsWithParams(activeCompany, { status: status, parameter: value })
    } else {
      getDocumentsWithParams(activeCompany, { status: status })
    }
  }

  const rowSelection = {
    selectedRowKeys: tableState.selectedRowKeys,
    onChange: onSelectChange
  }

  const fetchUser = _.debounce(v => {
    if (v.length > 2) {
      setTableState({
        ...tableState,
        fetching: true
      })
      findUsersByParams(v)
        .then(({ data }) => {
          const dataIds = tableState.data.map(i => i.key)
          const dataArray = data.data
            .map(user => ({
              label: `${user.user_data.email} (УНП:${user.company_data.company_number}; Компания:${user.company_data.name})`,
              key: `${user.id}`
            }))
            .filter(i => !dataIds.includes(i.key))

          setTableState({
            ...tableState,
            data: [...tableState.data, ...dataArray],
            fetching: false
          })
        })
        .catch(error => {
          message.error(error.message)
        })
    }
  }, 200)

  const handleSelect = v => {
    setTableState({
      ...tableState,
      data: v,
      value: v
    })
  }

  const hideOptions = () => {
    input.current.focus()
  }

  const openModal = () => {
    if (tableState.selectedRowKeys.length === 0) {
      message.error('Нет выбраных документов!')
      return null
    }
    setTableState({
      ...tableState,
      showModal: true
    })
  }

  const sendToUser = () => {
    const docsDataToUser = {
      document_ids: tableData.data
        .filter(i => tableState.selectedRowKeys.includes(i.id))
        .map(i => i.id),
      user_company_id: JSON.stringify(tableState.value.map(i => i.key))
    }
    sendDocumentToUser(docsDataToUser)
      .then(getDocumentsWithParams(activeCompany, { status: status }))
      .then(response => {
        if (response.success) {
          message.success('Сообщение успешно отправлено!')
          setTableState({
            ...tableState,
            fetching: false,
            showModal: false
          })
        } else {
          throw new Error(response.error)
        }
      })
      .catch(error => {
        message.error(error.message)
        setTableState({ ...defaultTableState })
      })
  }

  const handleChangePerPage = value => {
    window.localStorage.setItem('perPage', value)
    getDocumentsWithParams(activeCompany, { status: status, per_page: +window.localStorage.getItem('perPage') })
  }

  return (
    <Fragment>
      {tableState.showModal && <Modal
        title={null}
        visible
        closable={false}
        footer={null}
      >
        <Text>Получатели:</Text>
        <input type='text' ref={input} style={{ opacity: 0, width: '100%', height: 0 }} />
        <Select
          mode='tags'
          labelInValue
          tokenSeparators={[',']}
          value={tableState.value}
          filterOption={false}
          notFoundContent={tableState.fetching ? <Spin size='small' /> : null}
          onSearch={fetchUser}
          onChange={handleSelect}
          onSelect={hideOptions}
          style={{ width: '100%' }}
        >
          {tableState.data.map(element => <Option key={element.key}>{element.label}</Option>)}
        </Select>
        <Button style={{ marginTop: 20 }} type='primary' onClick={sendToUser}>Отправить</Button>
        <Button
          style={{ marginLeft: 20 }}
          type='primary'
          ghost
          onClick={() => setTableState({ ...tableState, showModal: false })}
        >Отмена</Button>
      </Modal>
      }
      <Table
        className='table'
        columns={columns}
        rowSelection={rowSelection}
        dataSource={tableData.hasOwnProperty('data') ? tableData.data : []}
        rowKey='document_id'
        locale={{ emptyText: 'Нет данных' }}
        rowClassName={record => record.is_read === 0 ? 'unread' : ''}
        pagination={false}
        title={() =>
          (
            <div className='table__header table-header'>
              <div className='table-header__actions'>
                <Tooltip title='Перенаправление документа(ов)' placement='topRight' arrowPointAtCenter>
                  <Icon type='cloud-upload' onClick={() => openModal()} />
                </Tooltip>
                <Tooltip title='Удаление документа(ов)' placement='topRight' arrowPointAtCenter>
                  <Popconfirm
                    title='Вы уверены?'
                    onConfirm={() => handleRemove(type)}
                    okText='Удалить'
                    cancelText='Отмена'
                  >
                    <Icon type='delete' style={{ color: '#FF7D1D' }} />
                  </Popconfirm>
                </Tooltip>
              </div>
              <div className='table-header__search'>
                <AutoComplete onSearch={_.debounce(handleSearch, 500)} placeholder='Введите дату, отправителя, тему...' />
              </div>
              <Pagination
                simple
                defaultCurrent={1}
                total={Math.ceil(tableData.total / +tableData.per_page) * 10}
                onChange={page => getDocumentsWithParams(activeCompany, { status: status, per_page: +window.localStorage.getItem('perPage') ? +window.localStorage.getItem('perPage') : 5, page: page })}
              />
            </div>
          )}
        footer={() =>
          (
            <div className='table__footer table-footer'>
              <div className='table-footer-left'>
                <div className='table-footer__item'>
                  <Text>Отмечено: {tableState.selectedRowKeys.length}</Text>
                </div>
                <div className='table-footer__item'>
                  <Text>Всего: {tableData.hasOwnProperty('data') && tableData.data.length}</Text>
                </div>
              </div>
              <div>
                <Text>На странице:</Text>
                <Select onChange={handleChangePerPage} defaultValue={window.localStorage.getItem('perPage') ? window.localStorage.getItem('perPage') : 5} style={{ width: 120, marginLeft: '1rem' }}>
                  <Option value={5}>5</Option>
                  <Option value={10}>10</Option>
                  <Option value={15}>15</Option>
                </Select>
              </div>
            </div>
          )}
        {...rest}
      >
        {children}
      </Table>
    </Fragment>
  )
}

export default AntdTable
