import React, { Fragment, useReducer, useEffect, useRef } from 'react'

import { api } from '../../services'
import { EscDataSlider } from '../'
import { checkBrowser } from '../../utils'
import { Button, Icon, Modal, Progress, List, Typography, Select, notification, Tag } from 'antd'
import { Upload, File } from './styled'

//use this effect for modification
// const isIE = /*@cc_on!@*/false || !!document.documentMode
// useEffect(() => {
//   if (isIE) {
//     setTimeout(() => {
//       window.pluginLoaded()
//     }, 1500)
//   }
// }, [isIE])

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
        const base64  = fileReader.result.split(',').pop()

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
    console.log('Uploaded:', list.length)
    console.log('To upload:', [...files].length)
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
            window.pluginClosed()
            console.log('pluginClosed')
            window.pluginLoaded()
            console.log('pluginLoaded')
            setTimeout(() => {
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
                        // window.pluginClosed()
                      } else {
                        throw new Error(response.error)
                      }
                    })
                    .catch(error => {
                      notification.error({
                        message: error.message
                      })
                    })
                } else {
                  notification.error({
                    message: 'падение'
                  })
                }
              })
              .catch(error => {
                notification.error({
                  message: error.message
                })
              })
          }, 2000)
          } catch (error) {
            notification.error({
              message: error.message
            })
          }
        } else {
          throw new Error(data.error)
        }
      })
      .catch(error => {
        notification.error({
          message: error.message
        })
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

  console.log(state)
  return (
    <Fragment>
      <Upload>
      <Upload.Button
        type='primary'
        htmlFor='uploadInput'
        ghost
      >
        <Icon type='upload' style={{ marginRight: 10 }} />
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
            actions={[
              <Tag disabled style={{ margin: 0 }} color='#87d068' onClick={() => isFileWithECP ? null : handleVerifyFile(file)}>
                <Icon style={{ marginRight: 5, cursor: 'pointer' }} type={isFileWithECP ? 'like' : 'edit'}/>
                {isFileWithECP ? 'Файл подписан' : 'Подписать'}
              </Tag>,
              <Tag color='#f50' onClick={() => handleRemoveFile(file)}
              >
                <Icon style={{ marginRight: 5, cursor: 'pointer' }} type='delete'/>
                Удалить
              </Tag>
            ]}
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
          <EscDataSlider data={fileInfo} onCancel={handleHideModal} />
        </>}
      </Modal>
      }
    </Fragment>
  )
}