import React, { useState, useEffect, Fragment, useRef } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import fileDownload from 'js-file-download'
import { api } from '../../services'

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
  Spin,
  Pagination,
  Tooltip,
  notification,
  Tag
} from 'antd'

import { Button, RouterLink } from '../'
import './Table.scss'
import { findUsersByParams } from '../../services/api/user'
import history from '../../history'
import moment from 'moment'
import forbiddenEmails from '../../constants/forbiddenEmails'

const defaultTableState = {
  selectedRowKeys: [],
  searchText: '',
  value: [],
  fetching: false,
  data: [],
  showModal: false,
  sorter: '',
  isFetching: false,
  loading: false
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
    verifyFile,
    children,
    type,
    getUser,
    removeDocumentById,
    removeDocumentsByIds,
    documents,
    sendDocumentToUser,
    tableData,
    status,
    files,
    ...rest
  } = props

  const location = useLocation()

  const input = useRef(null)

  const [tableState, setTableState] = useState({ ...defaultTableState })

  const [parameterState, setParameterState] = useState({ ...defaultParameterState })

  useEffect(() => {
      setTableState({
        ...tableState,
        selectedRowKeys: []
      })
  }, [location.state.id])

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
      title: (status === 1 || status === 3 || status === 9 || status === 10) ? 'Получатель' : 'Отправитель',
      key: type,
      render: record =>
        <Fragment>
          {(status === 1 || status === 3 || status === 9 || status === 10)
            ? <RouterLink to={{ pathname: `/documents/${record.id}`, state: { from: history.location.pathname, id: history.location.state.id, menuKey: history.location.state.menuKey, type: status } }}>
              <div>
                {record.recipient &&
                    record.recipient['user_email']
                }
                <br />
                {record.recipient &&
                  <p>{`[ ${record.recipient['company_name']} ]`}</p>
                }
              </div>
            </RouterLink>
            : <RouterLink to={{ pathname: `/documents/${record.id}`, state: { from: history.location.pathname, id: history.location.state.id, menuKey: history.location.state.menuKey, type: status } }}>
              <div>
                {record.sender &&
                    record.sender['user_email']
                }
                <br />
                {record.sender &&
                  <p>{`[ ${record.sender['company_name']} ]`}</p>
                }
              </div>
            </RouterLink>
          }
        </Fragment>
    },
    {
      title: (status === 9 ? 'УНП' : ''),
      key: 'unp'
    },
    {
      title: (status === 10 ? 'ЭЦП' : ''),
      key: 'file-status',
      render: (status === 10
        ? record => <Tag color={!!record.document.applied_attachments_count ? 'green' : 'orange'}>{!!record.document.applied_attachments_count ? 'ЭЦП имеется' : 'ЭЦП отсутствует'}</Tag>
        : ''
      )
    },
    {
      title: 'Тема',
      key: 'descr',
      render: record => <RouterLink to={{ pathname: `/documents/${record.id}`, state: { from: history.location.pathname, id: history.location.state.id, menuKey: history.location.state.menuKey, type: status } }}>{record.document.name}</RouterLink>
    },
    {
      title: () => <Icon type='paper-clip' />,
      key: 'attachments',
      render: record => <RouterLink to={{ pathname: `/documents/${record.id}`, state: { from: history.location.pathname, id: history.location.state.id, menuKey: history.location.state.menuKey, type: status } }} style={{ textAlign: 'center' }} >{record.document.attachments.length === 0 ? 'Нет приложенных документов' : record.document.attachments.length }</RouterLink>,
      sorter: false
    },
    {
      title: 'Дата создания',
      key: 'created_at',
      className: 'date-column',
      render: record => <Text>{moment(record.created_at, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss')}</Text>,
      sorter: true,
      defaultSortOrder: 'descend'
    },
    {
      title: (status === 9 ? 'ЭЦП' : '')
    },
    {
      title: 'Квитанция',
      key: 'receipt',
      className: 'table-download',
      render: record => <Fragment>
        <Tooltip placement='topRight' title='Скачать квитанцию в формате pdf' arrowPointAtCenter>
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

    let auth = window.localStorage.getItem('authToken') != null ? window.localStorage.getItem('authToken') : window.sessionStorage.getItem('authToken')
    axios.get(`${process.env.REACT_APP_BASE_URL}/receipt/${type}/${id}`, {
      'responseType': 'arraybuffer',
      headers: {
        'Authorization': 'Bearer ' + auth ,
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

  const asyncSendMessage = async (id, users) => {
    await sendDocumentToUser({ document_ids: [id], user_company_id: users })
  }

  const sendToUser = () => {

    if (tableState.value.filter(i => forbiddenEmails.includes(i.key)).length) {
      notification.error({
        message: 'Отправка/перенаправление по реквизиту УНП для данного адресата запрещено. Укажите точный адрес (E-mail) получателя.'
      })
      return false
    }

    const docsDataToUser = {
      messages: tableData.data
        .filter(i => tableState.selectedRowKeys.includes(i.id)).map(i => i.document_id),
      user_company_id: JSON.stringify(tableState.value.map(i => i.key))
    }
    let chain = Promise.resolve()
    const uniqueMessagesIds = [...new Set(docsDataToUser.messages)]

    uniqueMessagesIds.forEach(id => {
      chain = chain.then(() => asyncSendMessage(id, docsDataToUser.user_company_id))
    })
    chain.finally(() => {
      window.location.reload()
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
    setParameterState({
      ...parameterState,
      sort_by: sorter.columnKey,
      sort_value: sorter.order
    })
  }

  const proccesFilesForVerifyFile = async (bool, files) => {
    for (const file of files) {
      if (bool || file.status.status_data.id === 3) {
        const base64 = await api.files.getBase64File(file.id)
        try {
          const sertificationObject = await window.signProcess(base64.data.data.encoded_base64_file, file.hash_for_sign, true)
          const verifiedData = {
            id: file.id,
            hash: sertificationObject.signedData,
            data: sertificationObject.verifiedData,
            hash_for_sign: sertificationObject.hex,
            status: bool ? null : 5
          }
          const confirm = await api.documents.attachmentSignCanConfirm({ key: sertificationObject.verifiedData.key, attachment_id: file.id })
          if (confirm.data.success) {
            api.files.verifyFile(verifiedData)
          }
        } catch (error) {
          notification['error']({
            message: error.message
          })
        }
      }
    }
  }

  const multipleVerify = () => {
    setTableState({
      ...tableState,
      loading: true
    })
    proccesMessageForVerifyFiles(tableData.data.filter(i => tableState.selectedRowKeys.includes(i.id)))
      .then(() => {
        setTableState({ ...defaultTableState })
        notification.success({
          message: 'Подпись завершена! закройте окно и перезагрузите страницу.'
        })
      })
  }

  const reloadPlugin = () => {
     window.pluginLoaded()
    multipleVerify()
  }

  const proccesMessageForVerifyFiles = async (messages) => {
     for (const [index, message] of messages.entries()) {
      await proccesFilesForVerifyFile(message.can_be_signed, message.document.attachments)
    }
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
          dataSource={tableData ? tableData.data : []}
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
                    <Button style={{ marginRight: '1rem' }} disabled={!(!!tableState.selectedRowKeys.length)} icon='cloud-upload' type='primary' onClick={() => openModal()}>Отправить выделенное</Button>
                    <Button style={{ marginRight: '1rem' }} disabled={!(!!tableState.selectedRowKeys.length) || status === 11} icon='delete' type='primary' onClick={() => handleRemove(type)}>Переместить в архив</Button>
                    <Button disabled={!(!!tableState.selectedRowKeys.length && status !== 3)} type='primary' icon={tableState.loading ? 'loading' : 'edit'} onClick={reloadPlugin}>Групповое подписание</Button>
                  </div>
                  <div className='table-header__search'>
                    <AutoComplete onSearch={_.debounce(handleSearch, 500)} placeholder={`Введите тему, ${(status === 1 || status === 3) ? '  получателя' : 'отправителя'}...`} />
                    <Pagination
                      simple
                      current={parameterState.page}
                      hideOnSinglePage
                      total={tableData && !isNaN(Math.ceil(tableData.total / +tableData.per_page) * 10) ? Math.ceil(tableData.total / +tableData.per_page) * 10 : 0}
                      onChange={handleChangePage}
                    />
                  </div>
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
                    <Text>Всего: {tableData && tableData.hasOwnProperty('data') && tableData.data.length}</Text>
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
