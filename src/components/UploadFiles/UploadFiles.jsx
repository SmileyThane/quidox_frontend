import React, { Fragment, useReducer, useEffect } from 'react'

import { api } from '../../services'
import { checkBrowser } from '../../utils'
import { Button, Icon, Modal, Progress, List, Typography, Select, notification } from 'antd'
import { uploadReducer } from './UploadReducer'
import { Upload, File } from './styled'

const getSignedHex = base64 => {
  try {
    return window.sign(base64).hex
  } catch (error) {
    return ''
  }
}

const { Option } = Select
const { Text } = Typography

const initialState = {
  isModalVisible: false,
  isDisabled: false,
  isFilesUploaded: false,
  filesToUpload: []
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

  const [state, dispatch] = useReducer(
    uploadReducer,
    initialState
  )

  useEffect(() => {
    if (list.map(({ name }) => filesToUpload.find(({ original_name }) => name === original_name)).length === filesToUpload.length && filesToUpload.length > 0) {
      dispatch({
        type: 'FILES_UPLOADED_STATUS',
        payload: { disabled: false, uploaded_status: true }
      })
      console.log('123')
    }
  }, [list.length])

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
          'file': file
        })
        chain = chain
          .then(() => uploadFile(formData, { 'Content-Type': 'multipart/form-data' }))
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

  const handleUploadFiles = ({ target: { files } }) => {
    dispatch({ type: 'SHOW_UPLOAD_MODAL' })

    dispatch({
      type: 'HANDLE_GET_FILES',
      payload: [...files]
    })
  }

  const handleHideModal = () => {
    dispatch({ type: 'HIDE_UPLOAD_MODAL' })
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
            const certificate = window.sign(data.data.encoded_base64_file, file.hash_for_sign)

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
                  throw new Error(data.error)
                }
              })
              .catch(error => {
                notification.error({
                  message: error.message
                })
              })
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


  const { isModalVisible, isDisabled, isFilesUploaded, filesToUpload } = state
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
          onChange={e => handleUploadFiles(e)}
          hidden
          multiple
        />
      </Upload.Button>

      <div>
        <List
          itemLayout='horizontal'
          dataSource={list && list}
          locale={{ emptyText: 'Нет прикрепленных файлов' }}
          renderItem={(file, idx) => (
            <List.Item
              key={idx}
              actions={[
                <Icon
                  style={{ color: '#3278fb' }}
                  type='edit'
                  onClick={() => handleVerifyFile(file)}
                />,
                <Icon
                  style={{ color: '#3278fb' }}
                  type='delete'
                  onClick={() => handleRemoveFile(file)}
                />
              ]}
            >
              <File>
                <Text type='secondary'>{idx + 1}</Text>
                <Text strong>{file.original_name}</Text>
                <div>
                  <Select
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
          )}
        ></List>
      </div>
    </Upload>

      {isModalVisible &&
      <Modal
        visible
        closable={false}
        footer={null}
      >
        <p>Файлов к загрузке: {filesToUpload.length}</p>
        <p>Файлов загружено: {list.length}</p>
        <Progress
          status='active'
          percent={Math.floor((list.length / filesToUpload.length) * 100)}
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
      </Modal>
      }
    </Fragment>
  )
}