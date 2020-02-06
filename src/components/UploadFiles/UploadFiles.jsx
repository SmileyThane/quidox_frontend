import React, { Fragment, useReducer, useCallback } from 'react'

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

  const uploadingAFile = () => {
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
          .catch(error => console.error(error))
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

  const { id } = singleDocument
  const { isModalVisible, filesToUpload } = state
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
        {filesToUpload.length &&
        <p>Файлов к загрузке: {filesToUpload.length}</p>}
        <Progress
          status='active'
          percent={Math.floor((list.length / filesToUpload.length) * 100)}
        />
        <div>
          <Button onClick={uploadingAFile}>Загрузить</Button>
        </div>
      </Modal>
      }
    </Fragment>
  )
}