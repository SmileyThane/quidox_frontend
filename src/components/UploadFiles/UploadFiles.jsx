import React, { Fragment, useReducer, useEffect } from 'react'

import { uploadReducer } from './UploadReducer'
import { api } from '../../services'
import { Button, Icon, Modal, Progress } from 'antd'
import Upload from './styled'

const getSignedHex = (base64) => {
  try {
    return window.sign(base64).hex
  } catch (error) {
    return ''
  }
}

const initialState = {
  isModalVisible: false,
  isDisabled: false,
  isFilesUploaded: false,
  filesToUpload: []
}

export default function (props) {
  const {
    documents: { singleDocument },
    files: { list },
    uploadFile
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
          'document_id': id,
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

  const { id } = singleDocument
  const { isModalVisible, isDisabled, isFilesUploaded, filesToUpload } = state
  console.log(isFilesUploaded)
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