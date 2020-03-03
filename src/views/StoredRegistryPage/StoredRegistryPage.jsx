import React, { Fragment, useEffect, useRef, useState } from 'react'

import { Button, Icon, Modal, notification, Progress, Steps, Table } from 'antd'
import { api } from '../../services'

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
            message: 'Файлы реестра успешно добавлены'
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
        <Button
          type='primary'
          style={{ marginTop: '2rem' }}
          disabled={state.disabled}
          onClick={handleImportRegistry}
          ref={inputNode}
        >
          <Icon type={'alert'} />
          {'Обновить'}
        </Button>
      </div>
        {!!state.registryData.length &&
        <Fragment>
          <Table
            dataSource={state.registryData}
            columns={columns}
            rowKey='filename'
          />
        </Fragment>
        }
    </div>
  )
}

export default StoredRegistryPage
