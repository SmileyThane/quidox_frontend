import React, { Fragment, useEffect, useReducer, useRef } from 'react'

import { api } from '../../services'
import { EscDataSlider } from '../'
import { checkBrowser } from '../../utils'
import { Icon, List, message, Modal, notification, Progress, Select, Tag, Typography, Dropdown, Menu } from 'antd'
import { Button } from '../'
import { File, Upload } from './styled'
import axios from 'axios'

const getSignedHex = base64 => {
  try {
//need to be modified!!!!!
    let result = window.signProcess(base64).hex
    return result
  } catch (error) {
    return ''
  }
}

const { Option } = Select
const { Text } = Typography

const initialState = {
  isModalVisible: false,
  modalType: '',
  fileInfo: [],
  isDisabled: false,
  isFilesUploaded: false,
  filesToUpload: [],
  filesUploaded: []
}

const newPageUrl = `${process.env.REACT_APP_SIM_SCEP_URL}?`+
  `client_id=${process.env.REACT_APP_SIM_SCEP_CLIENT_ID}&`+
  `response_type=code&`+
  `state=1df12rt96cv12&`+
  `authentication=phone&`+
  `scope=sign&`+
  `redirect_uri=${process.env.REACT_APP_SIM_SCEP_CALLBACK}`;

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
    files: { list },
    uploadFile,
    changeFileStatus,
    removeFile,
    verifyFile
  } = props

  const inputRef = useRef()

  const [state, dispatch] = useReducer(
    uploadReducer,
    initialState
  )

  const { isModalVisible, isDisabled, isFilesUploaded, filesToUpload, modalType, fileInfo, filesUploaded } = state

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

  const handleChangeFileStatus = (file, idx) => value => {
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
            // window.pluginClosed()
            // console.log('pluginClosed')
            window.pluginLoaded()
            console.log('pluginLoaded_')
            console.log(window.conn)
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
                        console.log(response.error)
                      }
                    })
                    .catch(error => {
                      message.error('Ошибка подписания. Повторите операцию')
                      console.log(error)
                    })
                } else {
                  message.error('Ошибка подписания. Повторите операцию')
                }
              })
              .catch(error => {
                message.error('Ошибка подписания. Повторите операцию')
                console.log(error)
              })
          } catch (error) {
            message.error('Ошибка подписания. Повторите операцию')
            console.log(error)
          }
        } else {
          message.error('Ошибка подписания. Повторите операцию')
          console.log(data.error)
        }
      })
      .catch(error => {
        message.error('Ошибка подписания. Повторите операцию')
        console.log(error.message)
      })
  }

  const handleShowEscInfo = (file, type) => {
    dispatch({ type: 'SHOW_MODAL', payload: type })

    dispatch({ type: 'GET_FILE_INFO', payload: file })
  }

  const getECP = arr => {
    if (arr.length) {
      const ECP = arr.filter(i => i.verification_hash !== null && i.verification_info !== null)
      console.log(ECP)
      return ECP
    }
  }

  const handleSimVerifyFile = (item) => {
    try {
      api.documents.attachmentSimSign(item.id)
        .then(({ data }) => {
          if (data.success) {
            window.open(data.data, '')
            window.close()
          } else {
            throw new Error(data.error)
          }
        })
        .catch(error => {
          message.error(error.message)
          event.preventDefault()
          window.open(newPageUrl, '', 'width=800,height=600')
        })
    } catch (error) {
      notification['error']({
        message: error.message
      })
      event.preventDefault()
      window.open(newPageUrl, '', 'width=800,height=600')
    }
  }

  const handleTZIVerifyFile = (item) => {
    try {
      api.files.getBase64File(item.id)
        .then(({ data }) => {
          let sign = {};
          sign.data = data.data.encoded_base64_file;
          sign.isDetached = true;
          sign.token_qdx = '123';
          console.log(sign)
          // let uri  = "https://tzi.com/sign";
          // console.log(uri)
          const request = axios.post('http://127.0.0.1:8083/sign', sign)
            .then(({ data }) => {
              console.log(data)
              message.success('Подпись успешно выработана')
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


  const coBrand = data.co_brand_config && data.co_brand_config
  return (
    <Fragment>
      <Upload>
        <Upload.Button
          brand={coBrand}
          type='primary'
          htmlFor='uploadInput'
          ghost
        >
          <Icon type='upload' style={{ marginRight: 10 }}/>
          Прикрепить файл(ы)
          <Upload.Input
            type='file'
            id='uploadInput'
            ref={inputRef}
            onChange={e => handleUploadFiles(e, 'upload')}
            hidden
            multiple
          />
        </Upload.Button>

        <Upload.List>
          <List
            itemLayout='horizontal'
            dataSource={list && list}
            locale={{ emptyText: 'Нет прикрепленных файлов' }}
            renderItem={(file, idx) => {
              const isFileWithECP = file.users_companies.length ? !!getECP(file.users_companies).length : false
              return (
                <List.Item
                  key={idx}
                  style={{ padding: '5px 10px' }}
                >
                  <File>
                    <div>
                      <Text type='secondary'>{idx + 1}.</Text>
                      <Text style={{ padding: '0 10px' }} strong>{file.original_name}</Text>
                      {isFileWithECP &&
                      <Tag
                        color='#3278fb'
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleShowEscInfo(getECP(file.users_companies), 'esc')}
                      >
                        ЭЦП
                      </Tag>
                      }
                    </div>
                    <div>
                      <Select
                        style={{ minWidth: '20rem' }}
                        value={file.status.status_data.id}
                        onChange={handleChangeFileStatus(file, idx)}
                      >
                        <Option value={1}>Простая доставка</Option>
                        <Option value={2}>Согласование</Option>
                        <Option value={3}>Подпись получателя</Option>
                      </Select>
                    </div>
                  </File>
                  <Dropdown
                    overlay={() => (
                      <Menu>
                        <Menu.Item>
                          <Tag disabled style={{ margin: 0, width: '100%' }} color='#87d068'
                               onClick={() => isFileWithECP ? null : handleVerifyFile(file)}>
                            <Icon style={{ marginRight: 5, cursor: 'pointer' }} type={isFileWithECP ? 'like' : 'edit'}/>
                            {isFileWithECP ? 'Файл подписан' : 'Подписать'}
                          </Tag>
                        </Menu.Item>
                        <Menu.Item>
                          <Tag disabled style={{ margin: 0, width: '100%' }} color='#87d068'
                               onClick={() => isFileWithECP ? null : handleSimVerifyFile(file)}>
                            <Icon style={{ marginRight: 5, cursor: 'pointer' }} type={isFileWithECP ? 'like' : 'edit'}/>
                            {isFileWithECP ? '' : 'Подписать(MTC ID)'}
                          </Tag>
                        </Menu.Item>
                        <Menu.Item>
                          <Tag disabled style={{ margin: 0, width: '100%' }} color='#87d068'
                               onClick={() => isFileWithECP ? null : handleTZIVerifyFile(file)}>
                            <Icon style={{ marginRight: 5, cursor: 'pointer' }} type={isFileWithECP ? 'like' : 'edit'}/>
                            {isFileWithECP ? '' : 'Подписать(ТЗИ)'}
                          </Tag>
                        </Menu.Item>
                        <Menu.Item>
                          <Tag color='#f50' style={{ width: '100%' }} onClick={() => handleRemoveFile(file)}
                          >
                            <Icon style={{ marginRight: 5, cursor: 'pointer' }} type='delete'/>
                            Удалить
                          </Tag>
                        </Menu.Item>
                      </Menu>
                    )}
                  >
                    <Tag color="#E0E0E0" style={{  color: '#333', cursor: 'pointer',  padding: '0.8rem 1rem', fontSize: '1.5rem', width: '20rem', marginLeft: '2rem' }}>
                      Выберите действие
                      <Icon style={{ marginLeft: '1rem' }} type="down" />
                    </Tag>
                  </Dropdown>
                </List.Item>
              )
            }}
          />
        </Upload.List>
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
    </Fragment>
  )
}