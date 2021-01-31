import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'

import {
  Icon,
  notification,
  Table,
  Typography
} from 'antd'

import {
  LayoutScroll,
  Button
} from '../../components'

import { ModalUploadMessages } from './components'

import { api } from '../../services'

import {
  folder,
  folderFinish
} from './images'

import {
  Layout,
  Steps,
  Upload
} from './styled'

const { Title } = Typography

const defaultState = {
  registryData: [],
  registryHash: '',
  files: [],
  sync: false,
  completed: false,
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

export default ({
  createMessage,
  uploadFile,
  changeFileStatus
}) => {
  const history = useHistory()

  const inputNode = useRef(null)
  const filesNode = useRef(null)

  const [state, setState] = useState(defaultState)

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
            message: 'Реестр успешно загружен'
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

  const asyncFileReader = async file => {
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

  const handleCancelMessages = () => {
    setState({
      ...state,
      showModal: false,
      completed: true
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

  const handleCompleted = () => {
    setState(defaultState)

    history.push('/documents?status=10')
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
      return {
        label: 'Обработка',
        status: 'process'
      }
    } else if (bool && files.length) {
      return {
        label: 'Готов',
        status: 'completed'
      }
    } else {
      return {
        label: 'Ошибка',
        status: 'error'
      }
    }
  }

  const columns = [
    {
      title: 'Файл',
      key: 'file',
      dataIndex: 'file'
    },
    {
      title: 'Получатель',
      key: 'e_mail',
      dataIndex: 'e_mail',
      render: (email, record) => (
        <Layout.Column>
          <Layout.Column.Email>{email}</Layout.Column.Email>

          <Layout.Column.Number>
            <Layout.Column.Label>УНП</Layout.Column.Label> {record.company_number}
          </Layout.Column.Number>
        </Layout.Column>
      )
    },
    {
      title: 'Тема',
      key: 'topic',
      render: record => <p>{record.name}</p>
    },
    {
      width: 250,
      title: 'Комментарий',
      key: 'comment',
      render: record => <p>{record.description}</p>
    },
    {
      title: 'Тип запроса',
      key: 'status',
      dataIndex: 'status',
      render: status => getStatusName(status)
    },
    {
      title: 'Статус',
      key: 'success',
      render: record => {
        const systemStatus = getSystemStatus(record.system_status, state.files)

        return (
          <Layout.Column.Status status={systemStatus.status}>
            {systemStatus.label}
          </Layout.Column.Status>
        )
      }
    }
  ]

  return (
    <LayoutScroll>
      <Layout>
        {!state.registryData.length && (
          <Layout.Centering>
            <Layout.Inner>
              <Layout.Picture src={folder} />

              <Layout.Secondary>Шаг 1 из 3</Layout.Secondary>
              <Title level={3}>Для начала работы загрузите реестр</Title>
              <Layout.Secondary>Чтобы загрузить файлы нажмите на кнопку ниже.<br />Подходят файлы с разрешением .xls, не более 10 МБ</Layout.Secondary>

              <Layout.Action>
                <Upload type='primary'>
                  <Upload.Field
                    accept='application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    type='file'
                    id='upload'
                    ref={inputNode}
                    onChange={e => handleImportRegistry(e)}
                    hidden
                  />

                  <Upload.Label htmlFor='upload'>
                    <Icon type='upload' /> Загрузить реестр
                  </Upload.Label>
                </Upload>
              </Layout.Action>
            </Layout.Inner>
          </Layout.Centering>)}

        {!!state.registryData.length && (
          <>
            <Steps>
              <Steps.Item status='completed'>
                1. Загрузка реестра
                <Icon type='check' />
              </Steps.Item>

              <Steps.Item status={state.sync ? 'completed' : 'process'}>
                2. Загрузка файлов
                {state.sync && <Icon type='check' />}
              </Steps.Item>

              <Steps.Item status={state.completed ? 'completed' : 'process'}>
                3. Создание сообщений
                {state.completed && <Icon type='check' />}
              </Steps.Item>
            </Steps>

            {!state.completed ? (
              <Layout.Upload>
                <Layout.Upload.Inner>
                  {!state.sync ? (
                    <>
                      <Title level={3}>Загрузите файлы указанные в реестре</Title>
                      <Layout.Secondary>Чтобы загрузить файлы нажмите на кнопку ниже.<br />Подходят файлы с разрешением .pdf, не более 10 МБ</Layout.Secondary>

                      <Layout.Action>
                        <Upload type='primary'>
                          <Upload.Field
                            type='file'
                            id='upload-file'
                            ref={filesNode}
                            onChange={e => getFiles(e)}
                            multiple
                            hidden
                          />

                          <Upload.Label htmlFor='upload-file'>
                            <Icon type='upload' /> Загрузить файлы
                          </Upload.Label>
                        </Upload>
                      </Layout.Action>
                    </>
                  ) : (
                    <>
                      <Title level={3}>Создайте сообщения</Title>
                      <Layout.Secondary>Файлы загружены, создайте сообщения чтобы<br />автоматически распределить файлы по адресатам</Layout.Secondary>

                      <Layout.Action>
                        <Button
                          type='primary'
                          icon='mail'
                          onClick={() => setState({
                            ...state,
                            showModal: true
                          })}
                        >
                          Создать сообщения
                        </Button>
                      </Layout.Action>
                    </>
                  )}

                  <Layout.Table>
                    <Table
                      className='ui-table-list'
                      rowKey='file'
                      dataSource={state.registryData}
                      columns={columns}
                    />
                  </Layout.Table>
                </Layout.Upload.Inner>
              </Layout.Upload>
            ) : (
              <Layout.Centering withSteps>
                <Layout.Inner>
                  <Layout.Picture src={folderFinish} />

                  <Title level={3}>Сообщение сформированны</Title>
                  <Layout.Secondary>По загруженым файлам сформированы сообщения<br />и перенесы в раздел «Сообщения по реестру»</Layout.Secondary>

                  <Layout.Action>
                    <Button
                      type='primary'
                      icon='mail'
                      onClick={handleCompleted}
                    >
                      Перейти к сообщениям
                    </Button>
                  </Layout.Action>
                </Layout.Inner>
              </Layout.Centering>)}
          </>)}

        <ModalUploadMessages
          visible={state.showModal}
          data={state}
          onSave={handleCreateMessages}
          onCancel={handleCancelMessages}
        />
      </Layout>
    </LayoutScroll>
  )
}
