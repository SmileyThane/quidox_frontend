import React, { Fragment, useEffect, useRef, useState } from 'react'

import { Icon, Modal, notification, Progress, Steps, Table } from 'antd'
import { Button } from '../../components'
import { Upload } from './styled'
import { api } from '../../services'



const { Step } = Steps

const defaultState = {
  registryData: [],
  registryHash: '',
  files: [],
  sync: false,
  fetching: false,
  showModal: false,
  filesUploaded: 0,
  disabled: false
}

const getSignedHex = (base64) => {
  try {
    let result = window.signProcess(base64).hex
    return result
  } catch (error) {
    return ''
  }
}

const RegistryPage = ({ createMessage, uploadFile, changeFileStatus }) => {
  const [state, setState] = useState(defaultState)
  const inputNode = useRef(null)
  const filesNode = useRef(null)

  const isIE = /*@cc_on!@*/false || !!document.documentMode
  useEffect(() => {
    if (isIE) {
      // setTimeout(() => {
        window.pluginLoaded()
      // }, 1500)
    }
  }, [isIE])

  useEffect(() => {
    if (state.files.length) {
      filesNode.current.value = ''
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
        sync: !state.registryData.filter(i => !i.system_status).length
      })
    }
  }, [state.files.length])

  const handleImportRegistry = e => {
    const formData = api.helpers.buildForm({
      'file': e.target.files[0]
    })

    api.registry.importRegistry(formData, { 'Content-Type': 'multipart/form-data' })
      .then(({ data }) => {
        if (data.success) {
          setState({
            ...state,
            registryData: data.data.registry,
            registryHash: data.data.registryHash
          })
          notification['success']({
            message: 'Файл реестра успешно добавлен'
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

  const asyncFileReader = async (file) => {
    const base64 = file => new Promise((resolve, reject) => {
      const reader = window.FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
    })
    return base64
  }

  const asyncCreateMessage = async (message, idx) => {
    const newMessage = await createMessage({
      name: message.name,
      description: message.description,
      idx: idx,
      registryHash: state.registryHash,
      user_company_ids: JSON.stringify([message.e_mail]),
      status: 10
    })

    const base64 = asyncFileReader(state.files[idx])

    const formData = api.helpers.buildForm({
      'hash_for_sign': getSignedHex(base64),
      'document_id': newMessage.data.id,
      'file': state.files.find(i => i.name === message.file)
    })
    const newFile = await uploadFile(formData, { 'Content-Type': 'multipart/form-data' })
    const updateStatus = await changeFileStatus({ attachment_id: newFile.data.id, status: message.status })
    if (updateStatus.success) {
      setState({
        ...state,
        disabled: true,
        filesUploaded: idx + 1
      })
    }
  }

  const handleCreateMessages = () => {
    setState({
      ...state,
      disabled: true
    })
    let chain = Promise.resolve()
    state.registryData.forEach((message, idx) => {
      chain = chain.then(() => asyncCreateMessage(message, idx))
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
  return (
    <div className='content' style={{ padding: '1rem' }}>
      <Steps size='small' style={{ maxWidth: '100%' }}>
        <Step status={state.registryData.length ? 'finish' : 'process'} title='Шаг 1'
              description='Загрузите файл реестра' icon={<Icon type='file-excel'/>}/>
        <Step status={
          state.registryData.length && !!state.registryData.reduce((a, b) => a.system_status * b.system_status) ? 'finish' : 'wait'
        } title='Шаг 2' description='Загрузите файлы, указанные в реестре' icon={<Icon type='file'/>}/>
        <Step status={state.sync ? 'finish' : 'wait'} title='Шаг 3'
              description='Синхронизация окончена, сохраните сообщения' icon={<Icon type='file-done'/>}/>
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

        <label style={{ minWidth: 216 }} className='ant-btn ant-btn-primary ant-btn-background-ghost label-btn'
               htmlFor='upload'>
          <Icon type='upload' style={{ marginRight: 10 }}/>
          Загрузить реестр
        </label>
      </div>
      <Upload>
        {!!state.registryData.length &&
        <Fragment>
          <Table rowKey='file' scroll={{ x: true }} dataSource={state.registryData} columns={columns}/>
          <div className='buttons-group'>
            <input
              type='file'
              id='upload-file'
              hidden
              multiple
              onChange={event => getFiles(event)}
              ref={filesNode}
            />

            <label style={{ minWidth: 216 }} className='ant-btn ant-btn-primary ant-btn-background-ghost label-btn'
                   htmlFor='upload-file'>
              <Icon type='upload' style={{ marginRight: 10 }}/>
              Загрузить файл(ы)
            </label>
            {state.sync &&
            <Button type='primary' onClick={() => setState({ ...state, showModal: true })}>
              <Icon type={state.fetching ? 'loading' : 'upload'}/>
              Сохранить</Button>
            }
          </div>
        </Fragment>
        }
      </Upload>
      {state.showModal &&
      <Modal
        visible
        closable={false}
        footer={null}
      >
        <p>Сообщений к загрузке: {state.registryData.length}</p>
        <p>Сообщений сохранено: {state.filesUploaded}</p>
        <Progress
          status='active'
          percent={Math.floor(
            (state.filesUploaded / state.registryData.length) * 100
          )}
        />
        {state.filesUploaded !== state.registryData.length
          ? <Button type='primary' disabled={state.disabled} onClick={() => handleCreateMessages()}>Сохранить
            сообщения</Button>
          : <Button type='primary' ghost onClick={() => { setState({ ...defaultState }) }}>Закрыть</Button>
        }
      </Modal>
      }
    </div>
  )
}

export default RegistryPage
