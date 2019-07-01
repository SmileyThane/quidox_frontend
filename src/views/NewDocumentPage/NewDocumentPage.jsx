import React, { useState } from 'react'

import axios from 'axios'
import { findUsersByParams } from '../../services/api/user'
import { message, Icon, Select, Spin } from 'antd'
import { Input, Button } from '../../components'
import './NewDocumentPage.scss'

const defaultDocumentData = {
  name: '',
  description: '',
  document: {},
  files: [],
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

  const getFiles = e => {
    console.log(e.target.files, e.target.curFiles)
    setDocumentState({
      ...documentState,
      files: documentState.files.concat([...e.target.files])
    })
  }

  const removeFile = (index) => {
    setDocumentState({
      ...documentState,
      files: documentState.files.filter((e, i) => i !== index)
    })
  }

  const handleSendToDraft = () => {
    const formData = new window.FormData()

    formData.append(
      'name',
      documentState.name
    )
    formData.append(
      'description',
      documentState.description
    )

    documentState.files.forEach((file, index) => {
      formData.append(`second_documents[${index}]`, file)
    })
    console.log(formData)
    return axios.post('https://api.quidox.by/api/document/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + window.localStorage.getItem('authToken')
      }
    })
      .then(() => {
        message.success(`Документ ${documentState.name} успешно сохранен!`)
        setDocumentState({ ...defaultDocumentData })
      })
      .catch(error => {
        message.error(error.message)
        setDocumentState({ ...defaultDocumentData })
      })
  }

  const handleSendToUser = () => {
    const docDataDraft = {
      name: documentState.name,
      description: documentState.description,
      document: documentState.document,
      second_documents: documentState.files
    }

    return createDocument(docDataDraft)
      .then(data => {
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
            text: `${user.user_data.email} (УНП:${user.company_data.company_number}; Компания:${user.company_data.name})`,
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
  console.log(documentState.files)
  return (
    <div className='content content_padding'>
      <Spin spinning={!!isFetching}>
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
          <input type='file' id='upload' hidden multiple onChange={event => getFiles(event)} />
          <label className='label-btn' htmlFor='upload'>
            <Icon type='upload' style={{ marginRight: 10 }} />
            Прикрепить файл(ы)
          </label>
        </div>
        <div className='files-group'>
          <ul className='attached-files'>
            {documentState.files && documentState.files.map((e, i) => (
              <li className='attached-file' key={i}>
                <span className='attached-file__count'>{i + 1}</span>
                <p className='attached-file__name'>{e.name}</p>
                <div className='attached-file__actions'>
                  <Icon style={{ color: '#3278fb' }} type='edit' />
                  <Icon
                    onClick={() => removeFile(i)}
                    style={{ color: '#FF7D1D' }}
                    type='close'
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className='buttons-group'>
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
