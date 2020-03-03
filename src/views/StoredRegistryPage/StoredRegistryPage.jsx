import React, { Fragment, useEffect, useRef, useState } from 'react'

import { Button, Icon, Modal, notification, Progress, Steps, Table } from 'antd'
import { api } from '../../services'
import fileDownload from 'js-file-download'

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
    api.registry.downloadStoredRegistry(id)
      .then(({ data }) => {
        if (data) {
          fileDownload(data, `test.xlsx`)
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
