import React, { Fragment, useEffect, useRef, useState } from 'react'

import { Button, Icon, Modal, notification, Progress, Steps, Table } from 'antd'
import { api } from '../../services'
import fileDownload from 'js-file-download'
import { Base64 } from 'js-base64'
import axios from 'axios'


const defaultState = {
  registryData: [],
  sync: false,
  fetching: false,
  showModal: false,
  filesUploaded: 0,
  disabled: false
}



const StoredRegistryPage = () => {
  const [state, setState] = useState(defaultState)
  const inputNode = useRef(null)

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

  const downloadRegistry = (id) => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/registry/stored/${id}`, {
      'responseType': 'arraybuffer',
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.getItem('authToken') || 'Bearer ' + window.sessionStorage.getItem('authToken'),
        'Access-Control-Expose-Headers': 'Content-Disposition,X-Suggested-Filename'
      }
    })
      .then(({ data }) => {
        if (data) {
          console.log(data)
          fileDownload(data, `aapp.xlsx`)
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
  useEffect(() => {
      handleImportRegistry();
  }, [])

  console.log(state)
  const columns = [
    {
      title: 'Имя файла',
      key: 'filename',
      render: record => <p>{record.filename}</p>
    },
    {
      title: 'Создано',
      key: 'created_at',
      render: record => <p>{record.created_at}</p>
    }
  ]
  return (
    <div className='content' style={{ padding: '1rem' }}>
      <div className='buttons-group'>
      </div>
        {!!state.registryData.length &&
        <Fragment>
          <Table
            dataSource={state.registryData}
            columns={columns}
            rowKey='id'
            onRow={(record, index) => ({
              onClick: (event) => { downloadRegistry(record.id) }
            })}
          />
        </Fragment>
        }
    </div>
  )
}

export default StoredRegistryPage
