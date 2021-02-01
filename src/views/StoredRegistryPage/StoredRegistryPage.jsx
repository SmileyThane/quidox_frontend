import React, { useEffect, useState } from 'react'
import fileDownload from 'js-file-download'
import axios from 'axios'

import {
  Table,
  notification,
  Button
} from 'antd'

import { LayoutScroll } from '../../components'

import { api } from '../../services'

import { Layout } from './styled'

const defaultState = {
  registryData: [],
  sync: false,
  fetching: false,
  showModal: false,
  filesUploaded: 0,
  disabled: false
}

export default () => {
  const [state, setState] = useState(defaultState)

  useEffect(() => {
    handleImportRegistry()
  }, [])

  const handleImportRegistry = e => {
    api.registry.importStoredRegistry()
      .then(({ data }) => {
        if (data.success) {
          setState({
            ...state,
            registryData: data.data,
          })

          notification['success']({
            message: 'Ваши файлы реестров успешно загружены!'
          })
        } else {
          throw new Error(data.error)
        }
      })
      .catch(error => {
        notification['error']({
          message: error.message
        })
      })
  }

  const downloadRegistry = id => {
    let auth = window.localStorage.getItem('authToken') != null
      ? window.localStorage.getItem('authToken')
      : window.sessionStorage.getItem('authToken')

    axios.get(`${process.env.REACT_APP_BASE_URL}/registry/stored/${id}`, {
      'responseType': 'arraybuffer',
      headers: {
        'Authorization': 'Bearer ' + auth,
        'Access-Control-Expose-Headers': 'Content-Disposition,X-Suggested-Filename'
      }
    })
      .then(({ data }) => {
        if (data) {
          fileDownload(data, `registry.xls`)

          notification['success']({
            message: ' Файл подготовлен к загрузке!'
          })
        } else {
          throw new Error(data.error)
        }
      })
      .catch(error => {
        notification['error']({
          message: error.message
        })
      })
  }

  const columns = [
    {
      title: 'Название файла',
      key: 'filename',
      dataIndex: 'filename'
    },
    {
      title: 'Создано',
      key: 'created_at',
      dataIndex: 'created_at'
    },
    {
      key: 'download',
      render: record => (
        <Button
          type='link'
          icon='download'
          onClick={() => downloadRegistry(record.id)}
        >
          Скачать
        </Button>
      )
    }
  ]

  return (
    <LayoutScroll>
      <Layout>
        {!!state.registryData.length && (
          <Table
            rowKey='id'
            className='ui-table-list'
            dataSource={state.registryData}
            columns={columns}
          />)}
      </Layout>
    </LayoutScroll>
  )
}
