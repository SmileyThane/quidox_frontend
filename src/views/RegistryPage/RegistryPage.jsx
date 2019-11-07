import React, { useState, useEffect, useRef, Fragment } from 'react'

import { Table, Steps, Icon, notification, Button } from 'antd'
import { Upload } from './styled'
import { api } from '../../services'

const { Step } = Steps

const defaultState = {
  registryData: [],
  files: [],
  sync: false
}

const getSignedHex = (base64) => {
  try {
    return window.sign(base64).hex
  } catch (error) {
    return ''
  }
}

const RegistryPage = ({ createMessage, uploadFile, updateDocumentById }) => {
  const [state, setState] = useState(defaultState)
  const inputNode = useRef(null)
  const filesNode = useRef(null)

  useEffect(() => {
    if (state.files.length) {
      filesNode.current.value = ''
      // console.log(Boolean(state.registryData.filter(i => i.system_status).length))
      if (!state.registryData.filter(i => !i.system_status).length) {
        notification['success']({
          message: 'Файлы синхронизированы',
          description: `${state.files.length} успешная(ых) синхронизаций`
        })
      } else {
        notification['error']({
          message: 'Ошибка синхронизации',
          description: 'Убедитесь в правильности загружаемых файлов!'
        })
      }
      setState({
        ...state,
        sync: !!state.registryData.reduce((a, b) => a.system_status * b.system_status)
      })
    }
  }, [state.files.length])

  const handleImportRegistry = e => {
    console.log(e.target.files)
    const formData = api.helpers.buildForm({
      'file': e.target.files[0]
    })

    api.registry.importRegistry(formData, { 'Content-Type': 'multipart/form-data' })
      .then(({ data }) => {
        if (data.success) {
          console.log(data.data.filter(i => i.system_status === false))
          setState({
            ...state,
            registryData: data.data
          })
          notification['success']({
            message: 'Файл реестра успешно добавлен'
          })
          inputNode.current.value = ''
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

  const getFiles = e => {
    const oldFileNames = state.registryData.map(i => i.file)
    const newFileNames = [...e.target.files].map(i => i.name)
    setState({
      ...state,
      files: [...e.target.files].filter(e => oldFileNames.includes(e.name)),
      registryData: state.registryData.map(i => ({ ...i, system_status: newFileNames.includes(i.file) }))
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

  const getSystemStatus = (bool, files = []) => {
    if (bool && !files.length) {
      return <p style={{ color: 'orange' }}>processing</p>
    } else if (bool && files.length) {
      return <p style={{ color: 'green' }}>ok</p>
    } else {
      return <p style={{ color: 'red' }}>error</p>
    }
  }

  const handleCreateMessage = () => {
    let chain = Promise.resolve()
    const messages = state.registryData
    messages.forEach((message, idx) => {
      chain = chain
        .then(() => {
          createMessage({ name: message.name, description: message.description, status: 10 })
            .then(({ success, data }) => {
              if (success) {
                const fileReader = new window.FileReader()
                fileReader.readAsDataURL(state.files[idx])
                fileReader.onload = function () {
                  const base64 = fileReader.result.split(',').pop()

                  const formData = api.helpers.buildForm({
                    'hash_for_sign': getSignedHex(base64),
                    'document_id': data.id,
                    'file': state.files[idx]
                  })

                  uploadFile(formData, { 'Content-Type': 'multipart/form-data' })
                    .then(() => {
                      updateDocumentById(data.id, {
                        name: message.name,
                        description: messages.description,
                        user_company_ids: JSON.stringify([message.e_mail])
                      })
                    })
                }
              }
            })
        })
    })
  }

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
      render: record => getSystemStatus(record.system_status, state.files)
    }
  ]
  console.log(state.registryData.length)
  console.log(state.files.length)
  return (
    <div className='content' style={{ padding: '1rem' }}>
      <Steps size='small' style={{ maxWidth: '100%' }}>
        <Step status={state.registryData.length ? 'finish' : 'process'} title='Шаг 1' description='Загрузите файл реестра' icon={<Icon type='file-excel' />} />
        <Step status={
          state.registryData.length && !!state.registryData.reduce((a, b) => a.system_status * b.system_status) ? 'finish' : 'wait'
        } title='Шаг 2' description='Загрузите файлы, указанные в реестре' icon={<Icon type='file' />} />
        <Step status={state.sync ? 'finish' : 'wait'} title='Шаг 3' description='Синхронизация окончена, сохраните сообщения' icon={<Icon type='file-done' />} />
      </Steps>
      <div className='buttons-group'>
        <input
          type='file'
          id='upload'
          hidden
          onChange={event => handleImportRegistry(event)}
          accept='application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          ref={inputNode}
        />

        <label style={{ minWidth: 216 }} className='ant-btn ant-btn-primary ant-btn-background-ghost label-btn' htmlFor='upload'>
          <Icon type='upload' style={{ marginRight: 10 }} />
          Загрузить реестр
        </label>
      </div>
      <Upload>
        {!!state.registryData.length &&
        <Fragment>
          <Table rowKey='file' scroll={{ x: true }} dataSource={state.registryData} columns={columns} />
          <div className='buttons-group'>
            <input
              type='file'
              id='upload-file'
              hidden
              multiple
              onChange={event => getFiles(event)}
              ref={filesNode}
            />

            <label style={{ minWidth: 216 }} className='ant-btn ant-btn-primary ant-btn-background-ghost label-btn' htmlFor='upload-file'>
              <Icon type='upload' style={{ marginRight: 10 }} />
              Загрузить файл(ы)
            </label>
            {state.sync &&
            <Button type='primary' onClick={() => handleCreateMessage()}>Сохранить</Button>
            }
          </div>
        </Fragment>
        }
      </Upload>
    </div>
  )
}

export default RegistryPage
