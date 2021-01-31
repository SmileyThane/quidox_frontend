import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import fileDownload from 'js-file-download'
import _ from 'lodash'
import moment from 'moment'

import {
  Table,
  Typography,
  Select,
  Modal,
  Spin,
  Pagination,
  Checkbox,
  Tag,
  notification,
  message
} from 'antd'

import {
  Button,
  FooterFixed
} from '../'

import { api } from '../../services'

import { findUsersByParams } from '../../services/api/user'
import forbiddenEmails from '../../constants/forbiddenEmails'

import {
  ColumnAddressee,
  ColumnActions,
  ColumnAttachments,
  ColumnStatus
} from './components'

import { Layout } from './styled'

const defaultTableState = {
  selectedRowKeys: [],
  searchText: '',
  value: [],
  fetching: false,
  data: [],
  showModal: false,
  sorter: '',
  isFetching: false,
  loading: false,
  indeterminate: false
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

export default ({
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
}) => {
  const location = useLocation()

  const input = useRef(null)

  const [tableState, setTableState] = useState({ ...defaultTableState })
  const [parameterState, setParameterState] = useState({ ...defaultParameterState })

  const tablePerPage = window.localStorage.getItem('perPage')

  useEffect(() => {
    setTableState({
      ...tableState,
      selectedRowKeys: []
    })
  }, [location.search])

  useEffect(() => {
    if (activeCompany && status && type) {
      setParameterState({
        ...parameterState,
        status: status,
        selection_type: type,
        per_page: tablePerPage || 15,
        page: 1
      })
    }
  }, [activeCompany, status, type])

  useEffect(() => {
    if (parameterState.status) {
      getDocumentsWithParams(activeCompany, parameterState)
    }
  }, [
    parameterState.per_page,
    parameterState.page,
    parameterState.parameter,
    parameterState.sort_by,
    parameterState.sort_value
  ])

  useEffect(() => {
    if (parameterState.status) {
      getDocumentsWithParams(activeCompany, parameterState)
    }
  }, [parameterState.status])

  const downloadReceipt = (id, name, type) => {
    setTableState({
      ...tableState,
      isFetching: true
    })

    let auth = window.localStorage.getItem('authToken') != null
      ? window.localStorage.getItem('authToken')
      : window.sessionStorage.getItem('authToken')

    axios.get(`${process.env.REACT_APP_BASE_URL}/receipt/${type}/${id}`, {
      'responseType': 'arraybuffer',
      headers: {
        'Authorization': 'Bearer ' + auth,
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
      indeterminate: !!selectedRowKeys.length,
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
      notification.error('Отправка/перенаправление по реквизиту УНП для данного адресата запрещено. Укажите точный адрес (E-mail) получателя.')

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

          const confirm = await api.documents.attachmentSignCanConfirm({
            key: sertificationObject.verifiedData.key,
            attachment_id: file.id
          })

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

        notification.success('Подпись завершена! закройте окно и перезагрузите страницу.')
      })
  }

  const reloadPlugin = () => {
    window.pluginLoaded()

    multipleVerify()
  }

  const proccesMessageForVerifyFiles = async messages => {
    for (const [index, message] of messages.entries()) {
      await proccesFilesForVerifyFile(message.can_be_signed, message.document.attachments)
    }
  }

  const handleChangeIndeterminate = e => {
    if (e.target.checked) {
      setTableState({
        ...tableState,
        indeterminate: false,
        selectedRowKeys: []
      })
    }
  }

  const columns = [
    {
      title: (status === 1 || status === 3 || status === 10) ? 'Получатель' : 'Отправитель',
      key: type,
      render: record => (
        <ColumnAddressee
          status={status}
          record={record}
        />
      )
    },
    {
      title: (status === 9 ? 'УНП' : ''),
      key: 'unp'
    },
    {
      title: (status === 10 ? 'ЭЦП' : ''),
      key: 'file-status',
      render: record => {
        if (status === 10) {
          return <ColumnStatus status={!!record.document.applied_attachments_count} />
        } else {
          return ''
        }
      }
    },
    {
      title: 'Тема',
      key: 'descr',
      render: record => (
        <Layout.Column.Theme to={`/documents/${record.id}`}>
          {record.document.name}
        </Layout.Column.Theme>
      )
    },
    {
      title: 'Вложения',
      key: 'attachments',
      align: 'center',
      render: record => <ColumnAttachments files={record.document.attachments} />
    },
    {
      title: 'Дата',
      key: 'created_at',
      align: 'right',
      sorter: true,
      defaultSortOrder: 'descend',
      render: record => <Text>{moment.utc(record.created_at, 'YYYY-MM-DD HH:mm:ss').local().format('DD.MM.YYYY, HH:mm:ss')}</Text>
    },
    {
      title: (status === 9 ? 'ЭЦП' : '')
    },
    {
      title: 'Квитанция',
      key: 'receipt',
      render: record => {
        const {
          id,
          document
        } = record

        return (
          <ColumnActions
            onDownloadPDF={() => downloadReceipt(id, document.name, 'pdf')}
            onDownloadXml={() => downloadReceipt(id, document.name, 'xml')}
          />
        )
      }
    }
  ]

  const columnsArchive = [
    {
      title: 'Адресат',
      key: type,
      render: record => (
        <ColumnAddressee
          status={status}
          record={record}
        />
      )
    },
    {
      title: 'Тема',
      key: 'descr',
      render: record => (
        <Layout.Column.Theme to={`/documents/${record.id}`}>
          {record.document.name}
        </Layout.Column.Theme>
      )
    },
    {
      title: 'Добавлено из',
      key: 'status',
      render: () => 'Архив'
    },
    {
      title: 'Дата',
      key: 'created_at',
      align: 'right',
      sorter: true,
      defaultSortOrder: 'descend',
      render: record => <Text>{moment.utc(record.created_at, 'YYYY-MM-DD HH:mm:ss').local().format('DD.MM.YYYY, HH:mm:ss')}</Text>
    },
    {
      title: 'Квитанция',
      key: 'receipt',
      render: record => {
        const {
          id,
          document
        } = record

        return (
          <ColumnActions
            onDownloadPDF={() => downloadReceipt(id, document.name, 'pdf')}
            onDownloadXml={() => downloadReceipt(id, document.name, 'xml')}
          />
        )
      }
    }
  ]

  const columnsPartySources = [
    {
      title: 'Получатель',
      key: type,
      render: record => (
        <ColumnAddressee
          status={status}
          record={record}
        />
      )
    },
    {
      title: (status === 10 ? 'ЭЦП' : ''),
      key: 'file-status',
      render: record => {
        if (status === 10) {
          return <ColumnStatus status={!!record.document.applied_attachments_count} />
        } else {
          return ''
        }
      }
    },
    {
      title: 'Тема',
      key: 'descr',
      render: record => (
        <Layout.Column.Theme to={`/documents/${record.id}`}>
          {record.document.name}
        </Layout.Column.Theme>
      )
    },
    {
      title: 'Вложения',
      key: 'attachments',
      align: 'center',
      render: record => <ColumnAttachments files={record.document.attachments} />
    },
    {
      title: 'Дата',
      key: 'created_at',
      align: 'right',
      sorter: true,
      defaultSortOrder: 'descend',
      render: record => <Text>{moment.utc(record.created_at, 'YYYY-MM-DD HH:mm:ss').local().format('DD.MM.YYYY, HH:mm:ss')}</Text>
    },
    {
      title: 'Квитанция',
      key: 'receipt',
      render: record => {
        const {
          id,
          document
        } = record

        return (
          <ColumnActions
            onDownloadPDF={() => downloadReceipt(id, document.name, 'pdf')}
            onDownloadXml={() => downloadReceipt(id, document.name, 'xml')}
          />
        )
      }
    }
  ]

  const handleTableColumns = () => {
    if (status === 1 || status === 3 || status === 10) {
      return columns
    } else if (status === 4) {
      return columnsArchive
    } else if (status === 9) {
      return columnsPartySources
    } else {
      return columns
    }
  }

  return (
    <Layout>
      <Spin spinning={tableState.isFetching}>
        <Table
          rowKey='id'
          rowSelection={{
            selectedRowKeys: tableState.selectedRowKeys,
            onChange: onSelectChange
          }}
          rowClassName={record => record.is_read === 0 ? 'unread' : ''}
          locale={{ emptyText: 'Нет данных' }}
          columns={handleTableColumns()}
          dataSource={tableData ? tableData.data : []}
          pagination={false}
          onChange={handleTableChange}
          {...rest}
        >
          {children}
        </Table>
      </Spin>

      <FooterFixed>
        {tableState.selectedRowKeys.length ? (
          <>
            <Layout.Selected>
              <Checkbox
                indeterminate={tableState.indeterminate}
                onChange={handleChangeIndeterminate}
                checked={false}
              >
                Снять выделение
              </Checkbox>

              <Layout.Selected.Count>Выделено: {tableState.selectedRowKeys.length}</Layout.Selected.Count>
            </Layout.Selected>

            <Layout.Actions>
              <Layout.Actions.Item>
                <Button
                  type='link'
                  icon='export'
                  onClick={() => openModal()}
                >
                  Отправить выделенное
                </Button>
              </Layout.Actions.Item>

              <Layout.Actions.Item>
                <Button
                  type='link'
                  icon='edit'
                  onClick={reloadPlugin}
                >
                  Групповое подписание
                </Button>
              </Layout.Actions.Item>

              {status !== 4 && (
                <Layout.Actions.Item>
                  <Button
                    type='link'
                    icon='delete'
                    onClick={() => handleRemove(type)}
                  >
                    В архив
                  </Button>
                </Layout.Actions.Item>)}
            </Layout.Actions>
          </>
        ) : (
          <Layout.Pagination>
            <Layout.Pagination.List>
              <Layout.Pagination.Label>На странице</Layout.Pagination.Label>

              <Layout.Pagination.Item
                onClick={() => handleChangePerPage(15)}
                active={tablePerPage === '15'}
              >
                15
              </Layout.Pagination.Item>

              <Layout.Pagination.Item
                onClick={() => handleChangePerPage(30)}
                active={tablePerPage === '30'}
              >
                30
              </Layout.Pagination.Item>

              <Layout.Pagination.Item
                onClick={() => handleChangePerPage(60)}
                active={tablePerPage === '60'}
              >
                60
              </Layout.Pagination.Item>
            </Layout.Pagination.List>

            <Pagination
              current={parameterState.page}
              total={tableData && !isNaN(Math.ceil(tableData.total / +tableData.per_page) * 10) ? Math.ceil(tableData.total / +tableData.per_page) * 10 : 0}
              onChange={handleChangePage}
              hideOnSinglePage
              simple
            />
          </Layout.Pagination>
        )}
      </FooterFixed>

      <Modal
        title={null}
        visible={tableState.showModal}
        closable={false}
        footer={null}
      >
        <Text>Получатели:</Text>

        <input
          type='text'
          ref={input}
          style={{
            opacity: 0,
            width: '100%',
            height: 0
          }}
        />

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

        <Button
          type='primary'
          onClick={sendToUser}
          style={{ marginTop: 20 }}
        >
          Отправить
        </Button>

        <Button
          type='primary'
          onClick={() => setTableState({ ...tableState, showModal: false })}
          style={{ marginLeft: 20 }}
          ghost
        >
          Отмена
        </Button>
      </Modal>
    </Layout>
  )
}
