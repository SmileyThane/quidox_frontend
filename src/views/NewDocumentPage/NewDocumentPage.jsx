import React, { useState } from 'react'

import { findUsersByParams } from '../../services/api/user'
import { Upload, message, Icon, Select, Spin } from 'antd'
import { Input, Button } from '../../components'
import './NewDocumentPage.scss'

const defaultDocumentData = {
  name: '',
  description: '',
  document: {},
  second_documents: [],
  data: [],
  value: [],
  fetching: false,
  ids: []
}

const NewDocumentPage = props => {
  const {
    createDocument,
    sendDocumentToUser,
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
      console.log(info.file.status)
      setDocumentState({
        ...documentState,
        second_documents: info.fileList
      })
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} файл добавлен успешно`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} файл не добавлен.`)
      }
    },
    fileList: documentState.second_documents
  }

  const handleSendToDraft = () => {
    const docData = {
      name: documentState.name,
      description: documentState.description,
      second_documents: documentState.second_documents
    }
    return createDocument(docData)
      .then(() => {
        message.success(`Файл ${docData.name} успешко сохранен`)
        setDocumentState({ ...defaultDocumentData })
      })
      .catch(error => {
        message.error(error.message)
      })
  }

  const handleSendToUser = () => {
    const docDataDraft = {
      name: documentState.name,
      description: documentState.description,
      document: documentState.document,
      second_documents: documentState.second_documents
    }
    return createDocument(docDataDraft)
      .then(data => {
        console.log(data)
        if (data.success) {
          const docDataToUser = {
            document_ids: [data.data.id],
            user_company_id: documentState.ids
          }
          sendDocumentToUser(docDataToUser)
            .then(() => {
              message.success('Сообщение успешно отправлено!')
              setDocumentState({ ...defaultDocumentData })
            })
            .catch(error => {
              message.error(error.message)
            })
        }
      })
      .catch(error => {
        message.error(error.message)
      })
  }

  const { Option } = Select

  const fetchUser = value => {
    setDocumentState({
      ...documentState,
      fetching: true
    })
    if (value.length > 0) {
      findUsersByParams(value)
        .then(({ data }) => {
          const dataArray = data.data.map(user => ({
            text: `${user.company_data.company_number}, ${user.company_data.name}`,
            value: `${user.id}`
          }))
          setDocumentState({
            ...documentState,
            data: dataArray,
            fetching: false
          })
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      setDocumentState({
        ...documentState,
        data: [],
        fetching: false
      })
    }
  }

  const handleSelect = value => {
    const ids = value.map(i => Number(i.key))
    setDocumentState({
      ...documentState,
      ids,
      value
    })
  }

  return (
    <div className='content content_padding'>
      <Spin spinning={isFetching}>
        <div className='input-group'>
          <label className='label'>Получатели</label>
          <Select
            mode='multiple'
            labelInValue
            value={documentState.value}
            filterOption={false}
            notFoundContent={documentState.fetching ? <Spin size='small' /> : null}
            onSearch={fetchUser}
            onChange={handleSelect}
            style={{ width: '100%' }}
          >
            {documentState.data.map(d => (
              <Option key={d.value}>{d.text}</Option>
            ))}
          </Select>
        </div>
        <div className='input-group'>
          <label className='label'>Тема</label>
          <Input kind='text' type='text' value={documentState.name} onChange={e => updateField('name', e.target.value)} />
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
            onClick={handleSendToDraft}
          >
            <Icon type='file-text' />
        Сохранить в черновиках
          </Button>
          <Button
            type='primary'
            onClick={handleSendToUser}
          >
            <Icon type='cloud-upload' />
        Отправить
          </Button>
        </div>
      </Spin>
    </div>
  )
}

export default NewDocumentPage
