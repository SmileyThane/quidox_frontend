import React, { useState, useEffect, useRef, Fragment } from 'react'

import { Typography, Table } from 'antd'
import { Upload } from './styled'
import { api } from '../../services'

const { Text } = Typography

const defaultState = {
  registryData: [],
  files: []
}
const RegistryPage = () => {
  const [state, setState] = useState(defaultState)
  const inputNode = useRef(null)
  const filesNode = useRef(null)

  const handleImportRegistry = e => {
    console.log(e.target.files)
    const formData = api.helpers.buildForm({
      'file': e.target.files[0]
    })

    api.registry.importRegistry(formData, { 'Content-Type': 'multipart/form-data' })
      .then(({ data }) => {
        if (data.success) {
          setState({
            ...state,
            registryData: data.data
          })
          inputNode.current.value = ''
        }
      })
  }

  const getFiles = e => {
    setState({
      ...state,
      files: [...e.target.files].filter(e => state.registryData.find(i => i.file === e.name))
    })
  }

  const getStatusName = id => {
    switch (id) {
      case 1:
        return 'Простая доставка'
      case 2:
        return 'Согласование'
      case 3:
        return 'Требуется подпись'
    }
  }

  const getSystemStatus = bool => {
    if (bool) {
      return 'Ok'
    } else {
      return 'Error'
    }
  }

  useEffect(() => {
    if (state.files.length) {
      setState({
        ...state,
        registryData: state.registryData.map(i => {
          state.files.map(e => {
            if (i.file !== e.name) {
              console.log('True', i)
              return {
                ...i,
                system_status: false
              }
            }
            return i
          })
        })
      })
    }
  }, [state.files.length])

  const columns = [
    {
      title: 'File',
      key: 'file',
      render: record => <p>{record.file}</p>
    },
    {
      title: 'E-mail',
      key: 'e-mail',
      render: record => <p>{record.e_mail}</p>
    },
    {
      title: 'UNP*',
      key: 'unp',
      render: record => <p>{record.company_number}</p>
    },
    {
      title: 'Topic',
      key: 'topic',
      render: record => <p>{record.name}</p>
    },
    {
      title: 'Comment',
      key: 'comment',
      render: record => <p>{record.description}</p>
    },
    {
      title: 'Request',
      key: 'request',
      render: record => <p>{getStatusName(record.status)}</p>
    },
    {
      title: 'Success',
      key: 'success',
      render: record => <p style={{ color: record.system_status ? 'green' : 'red' }}>{getSystemStatus(record.system_status)}</p>
    }
  ]
  console.log(state.files)
  console.log(state.registryData)
  return (
    <div className='content' style={{ padding: '1rem' }}>
      <Text>
        <strong>Работа с Реестром документов</strong> - это простой встроенный сервис для работы с большим количеством
        сообщений и документов, который позволит Вам принимать решение об интеграции Ваших систем (1С, CRM и др.)
        Работа с Реестром документов более детально описана <a href='#'>тут</a>.
      </Text>
      <Upload>
        <Upload.Button htmlFor='upload'>
          Загрузить
          <input
            hidden
            type='file'
            id='upload'
            ref={inputNode}
            accept='application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            onChange={event => handleImportRegistry(event)}
          />
        </Upload.Button>
        {!!state.registryData.length &&
        <Fragment>
          <Table rowKey='file' scroll={{ x: true }} dataSource={state.registryData} columns={columns} />
          <Upload>
            <Upload.Button htmlFor='file-upload'>Загрузить
              <input
                hidden
                type='file'
                ref={filesNode}
                multiple
                id='file-upload'
                onChange={event => getFiles(event)}
              />
            </Upload.Button>
          </Upload>
        </Fragment>
        }
      </Upload>
    </div>
  )
}

export default RegistryPage
