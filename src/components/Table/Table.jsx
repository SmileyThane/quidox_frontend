import React, { useState, useEffect, Fragment, useRef } from 'react'
import axios from 'axios'
import fileDownload from 'js-file-download'

import _ from 'lodash'
import { Link } from 'react-router-dom'

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
  showModal: false,
  sorter: '',
  isFetching: false
}

const defaultParameterState = {
  selection_type: '',
  status: null,
  per_page: 15,
  page: 1,
  parameter: '',
  sort_by: 'created_at',
  sort_value: 'descend'
}

const { Text } = Typography
const { Option } = Select

const AntdTable = props => {
  const {
    getDocumentsWithParams,
    activeCompany,
    children,
    type,
    getUser,
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

  const [parameterState, setParameterState] = useState({ ...defaultParameterState })

  useEffect(() => {
    if (activeCompany && status && type) {
      setParameterState({
        ...parameterState,
        status: status,
        selection_type: type,
        per_page: window.localStorage.getItem('perPage') ? window.localStorage.getItem('perPage') : 15,
        page: 1
      })
    }
  }, [activeCompany, status, type])

  useEffect(() => {
    if (parameterState.status) {
      getDocumentsWithParams(activeCompany, parameterState)
    }
  }, [parameterState.status])

  const columns = [
    {
      title: (status === 1 || status === 3) ? 'Получатель' : 'Отправитель',
      key: type,
      render: record =>
        <Fragment>
          {(status === 1 || status === 3)
            ? <Link to={{ pathname: `/documents/${record.id}`, state: { from: history.location.pathname, id: history.location.state.id, menuKey: history.location.state.menuKey, type: status } }}>
              <div>
                {record.recipient &&
                    record.recipient['user_email']
                }
                <br />
                {record.recipient &&
                  <p>{`[ ${record.recipient['company_name']} ]`}</p>
                }
              </div>
            </Link>
            : <Link to={{ pathname: `/documents/${record.id}`, state: { from: history.location.pathname, id: history.location.state.id, menuKey: history.location.state.menuKey, type: status } }}>
              <div>
                {record.sender &&
                    record.sender['user_email']
                }
                <br />
                {record.sender &&
                  <p>{`[ ${record.sender['company_name']} ]`}</p>
                }
              </div>
            </Link>
          }
        </Fragment>
    },
    {
      title: 'Тема',
      key: 'descr',
      render: record => <Link to={{ pathname: `/documents/${record.id}`, state: { from: history.location.pathname, id: history.location.state.id, menuKey: history.location.state.menuKey, type: status } }}>{record.document.name}</Link>
    },
    {
      title: () => <Icon type='paper-clip' />,
      key: 'attachments',
      render: record => <Link to={{ pathname: `/documents/${record.id}`, state: { from: history.location.pathname, id: history.location.state.id, menuKey: history.location.state.menuKey, type: status } }} style={{ textAlign: 'center' }} >{record.document.attachments.length === 0 ? 'Нет приложенных документов' : record.document.attachments.length }</Link>,
      sorter: false
    },
    {
      title: 'Дата',
      key: 'created_at',
      className: 'date-column',
      render: record => <Text>{moment.utc(record.document.created_at, 'YYYY-MM-DD HH:mm:ss').local().format('DD/MM/YYYY HH:mm:ss')}</Text>,
      sorter: true,
      defaultSortOrder: 'descend'
    },
    // {
    //   title: 'Статус',
    //   key: 'status',
    //   className: 'status-column',
    //   render: record => <Text>{record.status_name}</Text>
    // },
    {
      title: 'Квитанция',
      key: 'receipt',
      className: 'table-download',
      render: record => <Fragment>
        <Tooltip placement='topRight' title='Скачать квитанцию в формате pdf (Скоро...)' arrowPointAtCenter>
          <Icon onClick={() => downloadReceipt(record.id, record.document.name, 'pdf')} type='file-pdf' style={{ marginRight: '0.5rem', fontSize: '1.8rem', cursor: 'pointer' }} />
        </Tooltip>

        <Tooltip placement='topRight' title='Скачать квитанцию в формате xml  (Скоро...)' arrowPointAtCenter>
          <Icon onClick={() => downloadReceipt(record.id, record.document.name, 'xml')} type='file-text' style={{ marginRight: '0.5rem', fontSize: '1.8rem', cursor: 'pointer' }} />
        </Tooltip>
      </Fragment>
    }
  ]

  const downloadReceipt = (id, name, type) => {
    setTableState({
      ...tableState,
      isFetching: true
    })
    axios.get(`${process.env.REACT_APP_BASE_URL}/receipt/${type}/${id}`, {
      'responseType': 'arraybuffer',
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.getItem('authToken'),
        'Access-Control-Expose-Headers': 'Content-Disposition,X-Suggested-Filename'
      }
    })
      .then(({ data }) => {
        if (data) {
          fileDownload(data, `${name}.${type}`)
          setTableState({
            ...tableState,
            isFetching: false
          })
        }
      })
      .catch(error => {
        message.error(error)
      })
  }

  const onSelectChange = selectedRowKeys => {
    setTableState({
      ...tableState,
      selectedRowKeys
    })
  }

  const handleRemove = () => {
    if (tableState.selectedRowKeys.length === 0) {
      message.error('Нет выбраных документов!')
      return null
    }
    if (tableState.selectedRowKeys.length > 1) {
      const obj = {
        ids: tableState.selectedRowKeys
      }
      removeDocumentsByIds(obj)
        .then(response => {
          if (response.success) {
            message.success('Документы перемещены в архив')
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
            message.success('Документ перемещен в архив')
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
    setParameterState({
      ...parameterState,
      parameter: value
    })
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
      document_ids: [...new Set(tableData.data
        .filter(i => tableState.selectedRowKeys.includes(i.id))
        .map(i => i.document_id))],
      user_company_id: JSON.stringify(tableState.value.map(i => i.key))
    }
    sendDocumentToUser(docsDataToUser)
      .then(response => {
        if (response.success) {
          message.success('Сообщение успешно отправлено!')
          getDocumentsWithParams(activeCompany, parameterState)
          getUser()
          setTableState({
            ...tableState,
            fetching: false,
            selectedRowKeys: [],
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
    setParameterState({
      ...parameterState,
      per_page: value
    })
  }

  const handleChangePage = page => {
    setParameterState({
      ...parameterState,
      page: page
    })
  }

  const handleTableChange = (pagination, filters, sorter) => {
    console.log(sorter)
    setParameterState({
      ...parameterState,
      sort_by: sorter.columnKey,
      sort_value: sorter.order
    })
  }

  const multipleVerify = () => {
    const selectedDocuments = tableData.data.filter(i => tableState.selectedRowKeys.includes(i.id))
    selectedDocuments.forEach(message => {
      console.log(message)
      const document = message.document
      if (!document.attachments.length) {
        return null
      }
      const attachemnts = document.attachments
      attachemnts.forEach(file => {
      })
    })
  }

  useEffect(() => {
    if (parameterState.status) {
      getDocumentsWithParams(activeCompany, parameterState)
    }
  }, [parameterState.per_page,
    parameterState.page,
    parameterState.parameter,
    parameterState.sort_by,
    parameterState.sort_value
  ])

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
      <Spin spinning={tableState.isFetching}>
        <Table
          className='table'
          scroll={{ x: true }}
          columns={columns}
          rowSelection={rowSelection}
          dataSource={tableData.hasOwnProperty('data') ? tableData.data : []}
          rowKey='id'
          locale={{ emptyText: 'Нет данных' }}
          rowClassName={record => record.is_read === 0 ? 'unread' : ''}
          pagination={false}
          onChange={handleTableChange}
          title={() =>
            (
              <div>
                <div className='table__header table-header'>
                  <div className='table-header__actions'>
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
                    <AutoComplete onSearch={_.debounce(handleSearch, 500)} placeholder={`Введите тему, ${(status === 1 || status === 3) ? '  получателя' : 'отправителя'}...`} />
                  </div>
                  <Pagination
                    simple
                    current={parameterState.page}
                    hideOnSinglePage
                    total={!isNaN(Math.ceil(tableData.total / +tableData.per_page) * 10) ? Math.ceil(tableData.total / +tableData.per_page) * 10 : 0}
                    onChange={handleChangePage}
                  />
                </div>
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
                  <Select onChange={handleChangePerPage} defaultValue={window.localStorage.getItem('perPage') ? window.localStorage.getItem('perPage') : 15} style={{ width: 120, marginLeft: '1rem' }}>
                    <Option value={15}>15</Option>
                    <Option value={30}>30</Option>
                    <Option value={60}>60</Option>
                  </Select>
                </div>
              </div>
            )}
          {...rest}
        >
          {children}
        </Table>
      </Spin>

    </Fragment>
  )
}

export default AntdTable
