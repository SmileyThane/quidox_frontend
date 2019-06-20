import React, { useState } from 'react'

import { Upload, message, Icon } from 'antd'
import { Input, Button } from '../../components'
import './NewDocumentPage.scss'

const defaultDocumentData = {
  name: '',
  theme: '',
  description: '',
  document: {},
  second_documents: []
}

const NewDocumentPage = props => {

  const {
    createDocument,
    documents: { isFetching }
  } = props

  const [documentState, setDocumentState] = useState({ ...defaultDocumentData })

  const updateField = (field, value) => {
    setDocumentState({
      ...documentState,
      [field]: value
    })
  }

  const uploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text'
    },
    onChange (info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} файл добавлен успешно`)
        setDocumentState({
          ...documentState,
          document: info.file,
          second_documents: info.fileList

        })
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} файл не добавлен.`)
      }
    }
  }

  const handleSend = () => {
    const docData = {
      name: documentState.name,
      theme: documentState.theme,
      description: documentState.description,
      document: documentState.document,
      second_documents: documentState.second_documents
    }
    return Promise.resolve()
      .then(() => {
        return createDocument(docData)
      })
      .then(() => {
        setDocumentState({ ...defaultDocumentData })
      })
  }

  return (
    <div className='content content_padding'>
      <div className='input-group'>
        <label className='label'>Получатели</label>
        <Input kind='text' type='text' value={documentState.name} onChange={e => updateField('name', e.target.value)} />
      </div>
      <div className='input-group'>
        <label className='label'>Тема</label>
        <Input kind='text' type='text' value={documentState.theme} onChange={e => updateField('theme', e.target.value)} />
      </div>
      <div className='input-group'>
        <label className='label'>Комментарий</label>
        <Input kind='textarea' type='text' value={documentState.description} onChange={e => updateField('description', e.target.value)} />
      </div>
      <div className='buttons-group'>
        <Upload {...uploadProps}>
          <Button
            type='primary'
            ghost
          >
            <Icon type='upload' />
            Прикрепить документ
          </Button>
        </Upload>
      </div>
      <div className='buttons-group buttons-group_border-top'>
        <Button
          ghost
          type='primary'
        >
          <Icon type='file' />
          Сохранить в черновиках
        </Button>
        <Button
          type='primary'
          onClick={handleSend}
        >
          <Icon type={isFetching ? 'loading' : 'cloud-upload'} />
          Отправить
        </Button>
      </div>
    </div>
  )
}

export default NewDocumentPage
