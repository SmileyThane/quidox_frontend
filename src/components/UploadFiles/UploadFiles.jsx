import React, { useState, useEffect, useReducer, useRef } from 'react'
import axios from 'axios'
import { Base64 } from 'js-base64'

import { api } from '../../services'
import { checkBrowser } from '../../utils'

import {
  Row,
  Col,
  Icon,
  message,
  Modal,
  DatePicker,
  notification,
  Progress,
  Select
} from 'antd'

import {
  Button,
  Input,
  EscDataSlider
} from '../'

import * as images from './images'

import { File, Upload } from './styled'

const getSignedHex = base64 => {
  try {
    let result = window.signProcess(base64).hex
    return result
  } catch (error) {
    return ''
  }
}

const { Option } = Select

const initialState = {
  isModalVisible: false,
  modalType: '',
  fileInfo: [],
  isDisabled: false,
  isFilesUploaded: false,
  filesToUpload: [],
  filesUploaded: []
}

function uploadReducer (state, action) {
  switch (action.type) {
    case 'SHOW_MODAL':
      return {
        ...state,
        isModalVisible: true,
        modalType: action.payload
      }
    case 'HIDE_MODAL':
      return {
        ...initialState
      }
    case 'GET_FILE_INFO':
      return {
        ...state,
        fileInfo: action.payload
      }
    case 'HANDLE_GET_FILES':
      return {
        ...state,
        filesToUpload: action.payload
      }
    case 'FILE_IS_UPLOADED':
      return {
        ...state,
        filesUploaded: [...state.filesUploaded, action.payload]
      }
    case 'FILES_UPLOADED_STATUS':
      return {
        ...state,
        isDisabled: action.payload.disabled,
        isFilesUploaded: action.payload.uploaded_status
      }
  }
}

export default function (props) {
  const {
    document_id = null,
    user: { data },
    config,
    files: { list },
    uploadFile,
    changeFileStatus,
    removeFile,
    verifyFile,
    verifyFileTZI
  } = props

  const inputRef = useRef()

  const [state, dispatch] = useReducer(
    uploadReducer,
    initialState
  )

  const [fileAmount, setFileAmount] = useState(null)

  const { isModalVisible, isDisabled, isFilesUploaded, filesToUpload, modalType, fileInfo, filesUploaded } = state

  const clientId = config.data.co_brand_config ? config.data.co_brand_config.client_id : process.env.REACT_APP_SIM_SCEP_CLIENT_ID
  const callback = config.data.co_brand_config ? config.data.co_brand_config.callback : process.env.REACT_APP_SIM_SCEP_CALLBACK

  const newPageUrl = `${process.env.REACT_APP_SIM_SCEP_URL}?` +
    `client_id=${clientId}&` +
    `response_type=code&` +
    `state=${Base64.encode(JSON.stringify({
      'co_brand_name': config.data.co_brand_config ? 'mts' : 'quidox',
      'user_id': data.id
    }))}&` +
    `authentication=phone&` +
    `scope=sign&` +
    `redirect_uri=${callback}`

  useEffect(() => {
    if (filesToUpload.length === filesUploaded.length && filesUploaded.length) {
      dispatch({
        type: 'FILES_UPLOADED_STATUS',
        payload: { disabled: false, uploaded_status: true }
      })
      inputRef.current.value = ''
    }
  }, [filesUploaded.length])

  const uploadingAFile = () => {
    dispatch({
      type: 'FILES_UPLOADED_STATUS',
      payload: { disabled: true }
    })

    let chain = Promise.resolve()
    filesToUpload.forEach((file, idx) => {
      const fileReader = new window.FileReader()
      fileReader.readAsDataURL(file)

      fileReader.onload = function () {
        const base64 = fileReader.result.split(',').pop()

        const formData = api.helpers.buildForm({
          'hash_for_sign': getSignedHex(base64),
          'document_id': document_id,
          'status': 1,
          'file': file
        })
        chain = chain
          .then(() => {
            uploadFile(formData, { 'Content-Type': 'multipart/form-data' })
              .then(({ data }) => {
                dispatch({ type: 'FILE_IS_UPLOADED', payload: data })
              })
          })
          .catch(error => {
            dispatch({
              type: 'FILES_UPLOADED_STATUS',
              payload: { disabled: false, uploaded_status: false }
            })
            console.error(error)
          })
      }
    })
  }

  const handleUploadFiles = ({ target: { files } }, type) => {
    if ([...files].length > 5 || (list.length + [...files].length) > 5) {
      notification.error({
        message: 'Превышен лимит файлов!',
        description: 'Максимальное количество файлов для данного тарифа - 5'
      })
      return
    }
    dispatch({ type: 'SHOW_MODAL', payload: type })
    dispatch({
      type: 'HANDLE_GET_FILES',
      payload: [...files]
    })
  }

  const handleHideModal = () => {
    dispatch({ type: 'HIDE_MODAL' })
  }

  const handleChangeFileStatus = (file, idx, value) => {
    changeFileStatus({ attachment_id: file.id, status: value, index: idx })
  }

  const handleRemoveFile = file => {
    removeFile(file.id)
      .then(({ success, error }) => {
        if (success) {
          notification.success({
            message: 'Файл успешно удален'
          })
        } else {
          throw new Error(error)
        }
      })
      .catch(error => {
        notification.error({
          message: error.message
        })
      })
  }

  const handleVerifyFile = file => {
    if (!checkBrowser('ie')) {
      notification.error({
        message: 'Ошибка подписания',
        description: 'Подписание файла возможно только в браузере IE'
      })
      return null
    }

    api.files.getBase64File(file.id)
      .then(({ data }) => {
        if (data.success) {
          try {
            window.pluginLoaded()
            const certificate = window.signProcess(data.data.encoded_base64_file, file.hash_for_sign)
            const verifiedData = {
              id: file.id,
              hash: certificate.signedData,
              data: certificate.verifiedData,
              hash_for_sign: certificate.hex,
              status: file.status.status_data.id ? file.status.status_data.id : null
            }

            api.documents.attachmentSignCanConfirm({ key: certificate.verifiedData.key, attachment_id: file.id })
              .then(({ data }) => {
                if (data.success) {
                  verifyFile(verifiedData)
                    .then(response => {
                      if (response.success) {
                        notification.success({
                          message: 'Файл успешно подписан'
                        })
                        window.pluginClosed()
                      } else {
                        message.error('Ошибка подписания. Повторите операцию')
                        // throw new Error(response.error)
                      }
                    })
                    .catch(error => {
                      message.error('Ошибка подписания. Повторите операцию')
                    })
                } else {
                  message.error('Ошибка подписания. Повторите операцию')
                }
              })
              .catch(error => {
                message.error('Ошибка подписания. Повторите операцию')
              })
          } catch (error) {
            message.error('Ошибка подписания. Повторите операцию')
          }
        } else {
          message.error('Ошибка подписания. Повторите операцию')
        }
      })
      .catch(error => {
        message.error('Ошибка подписания. Повторите операцию')
      })
  }

  const handleShowEscInfo = (file, type) => {
    dispatch({ type: 'SHOW_MODAL', payload: type })

    dispatch({ type: 'GET_FILE_INFO', payload: file })
  }

  const getECP = arr => {
    if (arr.length) {
      const ECP = arr.filter(i => i.verification_hash !== null && i.verification_info !== null)
      return ECP
    }
  }

  const handleSimVerifyFile = (item) => {
    try {
      api.documents.attachmentSimSign(item.id)
        .then(({ data }) => {
          if (data.success) {
            window.open(data.data, '_self')
          } else {
            throw new Error(data.error)
          }
        })
        .catch(error => {
          message.error(error.message)
          window.open(newPageUrl, '_self')
        })
    } catch (error) {
      notification['error']({
        message: error.message
      })
      window.open(newPageUrl, '_self')
    }
  }

  const handleTZIVerifyFile = (item) => {
    try {
      api.files.getBase64File(item.id)
        .then(({ data }) => {
          let sign = {}
          sign.data = data.data.encoded_base64_file
          sign.isDetached = true
          sign.token_qdx = window.localStorage.getItem('authToken') || 'Bearer ' + window.sessionStorage.getItem('authToken')
          const request = axios.post('http://127.0.0.1:8083/sign', sign)
            .then(({ data }) => {
              if (data.cms) {
                let signObj = {}
                signObj.raw_sign = data.cms
                signObj.status_id = item.status.status_data.id
                signObj.comment = 'Подписано при помощи сервиса НИИ ТЗИ'
                axios.post(`${process.env.REACT_APP_BASE_URL}/attachment/${item.id}/sign/add`, signObj, {
                  headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('authToken') || 'Bearer ' + window.sessionStorage.getItem('authToken'),
                  }
                }).then(({ data }) => {
                  // item.users_companies.push(data.data)
                  verifyFileTZI(item.id, data.data)
                  message.success('Подпись успешно выработана')
                })
                  .catch(function (error) {
                    message.error(error.message)
                  })
              }
            })
            .catch(function (error) {
              message.error(error.message)
            })
        })
        .catch(error => {
          message.error(error.message)
        })
    } catch (error) {
      notification['error']({
        message: error.message
      })
    }
  }

  const handleAmount = e => {
    const value = e.target.value

    setFileAmount(value)
  }

  const coBrand = data.co_brand_config && data.co_brand_config
  const simButtonName = config.data.co_brand_config ? config.data.co_brand_config.co_brand_name : 'Mobile'

  return (
    <>
      <Upload>
        <Upload.List>
          {list.map((file, idx) => {
            const isFileWithECP = file.users_companies.length ? !!getECP(file.users_companies).length : false

            return (
              <Upload.Item key={idx}>
                <Row gutter={[12, 16]}>
                  <Col span={9}>
                    <Upload.Control>
                      <label>Файл</label>

                      <Input
                        kind='text'
                        type='text'
                        value={file.original_name}
                      />
                    </Upload.Control>
                  </Col>

                  <Col span={5}>
                    <Upload.Control>
                      <label>Тип документа</label>

                      <Select placeholder='Выберите тип'>
                        <Option value={1}>1</Option>
                      </Select>
                    </Upload.Control>
                  </Col>

                  <Col span={5}>
                    <Upload.Control>
                      <label>Стоимость</label>

                      <Upload.Control.Group>
                        <Input
                          kind='text'
                          type='text'
                          placeholder='0'
                          value={fileAmount}
                          onChange={handleAmount}
                        />

                        <Select defaultValue='BYN'>
                          <Option value='BYN'>BYN</Option>
                        </Select>
                      </Upload.Control.Group>
                    </Upload.Control>
                  </Col>

                  <Col span={5}>
                    <Upload.Control>
                      <label>Подписать до</label>

                      <DatePicker />
                    </Upload.Control>
                  </Col>
                </Row>

                <File>
                  {/* <div>
                    {isFileWithECP &&
                    <Tag
                      color='#3278fb'
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleShowEscInfo(getECP(file.users_companies), 'esc')}
                    >
                      ЭЦП
                    </Tag>
                    }
                  </div> */}

                  <File.Controls>
                    <File.Controls.Label>Действие получателя:</File.Controls.Label>

                    <File.Controls.List>
                      <File.Controls.Item
                        type='gray'
                        onClick={() => handleChangeFileStatus(file, idx, 1)}
                        selected={file.status.status_data.id === 1}
                      >
                        Простая доставка
                      </File.Controls.Item>

                      <File.Controls.Item
                        type='orange'
                        onClick={() => handleChangeFileStatus(file, idx, 2)}
                        selected={file.status.status_data.id === 2}
                      >
                        Согласование
                      </File.Controls.Item>

                      <File.Controls.Item
                        type='green'
                        onClick={() => handleChangeFileStatus(file, idx, 3)}
                        selected={file.status.status_data.id === 3}
                      >
                        Подпись
                      </File.Controls.Item>
                    </File.Controls.List>
                  </File.Controls>

                  <File.Controls>
                    <File.Controls.Label>Ваша подпись:</File.Controls.Label>

                    <File.Controls.List>
                      <File.Controls.Item
                        type='blue'
                        onClick={() => handleVerifyFile(file)}
                      >
                        В браузере
                      </File.Controls.Item>

                      <File.Controls.Item
                        type='blue'
                        onClick={() => handleVerifyFile(file)}
                      >
                        Mobile ID
                      </File.Controls.Item>

                      <File.Controls.Item
                        type='blue'
                        onClick={() => handleVerifyFile(file)}
                      >
                        ТЗИ
                      </File.Controls.Item>
                    </File.Controls.List>
                  </File.Controls>

                  <Button
                    type='primary'
                    icon='delete'
                    onClick={() => handleRemoveFile(file)}
                    ghost
                  >
                    Удалить файл
                  </Button>
                </File>
              </Upload.Item>
            )
          })}
        </Upload.List>

        <Upload.Button
          brand={coBrand}
          htmlFor='uploadInput'
        >
          <Icon component={images.IconAttach} />

          <Upload.Label>Прикрепить файлы</Upload.Label>

          <Upload.Input
            type='file'
            id='uploadInput'
            ref={inputRef}
            onChange={e => handleUploadFiles(e, 'upload')}
            hidden
            multiple
          />
        </Upload.Button>
      </Upload>

      {isModalVisible &&
      <Modal
        visible
        closable={false}
        footer={null}
      >
        {modalType === 'upload' &&
        <>
          <p>Файлов к загрузке: {filesToUpload.length}</p>
          <p>Файлов загружено: {filesUploaded.length}</p>
          <Progress
            status='active'
            percent={Math.floor((filesUploaded.length / filesToUpload.length) * 100)}
          />
          <div>
            <Button
              onClick={isFilesUploaded ? handleHideModal : uploadingAFile}
              disabled={isDisabled}
              type='primary'
            >
              {isFilesUploaded
                ? 'Закрыть'
                : 'Загрузить'
              }
            </Button>
          </div>
        </>}
        {modalType === 'esc' &&
        <>
          <EscDataSlider data={fileInfo} onCancel={handleHideModal}/>
        </>}
      </Modal>
      }
    </>
  )
}