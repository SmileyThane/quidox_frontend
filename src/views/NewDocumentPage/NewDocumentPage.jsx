import React, { useState } from 'react'

import axios from 'axios'
import _ from 'lodash'
import { findUsersByParams } from '../../services/api/user'
import { message, Icon, Select, Spin } from 'antd'
import { Input, Button } from '../../components'
import './NewDocumentPage.scss'

const defaultDocumentData = {
  name: '',
  description: '',
  document: {},
  files: [],
  base64files: [],
  certs: [],
  fileHashes: [],
  data: [],
  value: [],
  fetching: false,
  ids: []
}

const NewDocumentPage = props => {
  const {
    sendDocumentToUser
  } = props

  const [documentState, setDocumentState] = useState({ ...defaultDocumentData })

  const updateField = (field, v) => {
    setDocumentState({
      ...documentState,
      [field]: v
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
      files: documentState.files.filter((e, i) => i !== index),
      base64files: documentState.base64files.filter((e, i) => i !== index)
    })
  }

  const handleSendToDraft = () => {
    setDocumentState({
      ...documentState,
      fetching: true
    })
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
    setDocumentState({
      ...documentState,
      fetching: true
    })
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
    return axios.post('https://api.quidox.by/api/document/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + window.localStorage.getItem('authToken')
      }
    })
      .then(({ data }) => {
        if (data.success) {
          const docDataToUser = {
            document_ids: [data.data.id],
            user_company_id: documentState.value.map(i => i.key)
          }
          console.log(docDataToUser)
          sendDocumentToUser(docDataToUser)
            .then(() => {
              message.success('Сообщение успешно отправлено!')
              setDocumentState({ ...defaultDocumentData })
            })
            .catch(error => {
              message.error(error.message)
              setDocumentState({ ...defaultDocumentData })
            })
        }
      })
      .catch(error => {
        message.error(error.message)
      })
  }

  const fetchUser = _.debounce(v => {
    if (v.length > 2) {
      setDocumentState({
        ...documentState,
        fetching: true
      })
      findUsersByParams(v)
        .then(({ data }) => {
          const dataIds = documentState.data.map(i => i.key)
          const dataArray = data.data
            .map(user => ({
              label: `${user.user_data.email} (УНП:${user.company_data.company_number}; Компания:${user.company_data.name})`,
              key: `${user.id}`
            }))
            .filter(i => !dataIds.includes(i.key))
          setDocumentState({
            ...documentState,
            data: [...documentState.data, ...dataArray],
            fetching: false
          })
        })
        .catch(error => {
          message.error(error.message)
        })
    }
  }, 200)

  const handleSelect = v => {
    setDocumentState({
      ...documentState,
      data: v,
      value: v
    })
  }

  const { Option } = Select
  const verifyFile = index => {
    const reader = new window.FileReader()
    reader.readAsDataURL(documentState.files[index])
    reader.onload = function () {
      setDocumentState({
        ...documentState,
        base64files: [...documentState.base64files, reader.result]
      })
    }
    reader.onerror = function (error) {
      message.error(error.message)
    }
  }

  console.log(documentState.value.map(i => i.key))
  return (
    <div className='content content_padding'>
      <Spin spinning={!!documentState.fetching}>
        <div className='input-group'>
          <label className='label'>Получатели</label>
          <Select
            mode='tags'
            labelInValue
            tokenSeparators={[',']}
            value={documentState.value}
            filterOption={false}
            notFoundContent={documentState.fetching ? <Spin size='small' /> : null}
            onSearch={fetchUser}
            onChange={handleSelect}
            style={{ width: '100%' }}
          >
            {documentState.data.map(element => <Option key={element.key}>{element.label}</Option>)}
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
                  <Icon onClick={() =>verifyFile(i)} style={{ color: '#3278fb' }} type='edit' />
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
      {/* <input type='hidden' id='dataNewCompany' value={documentState.base64files} /> */}
      {documentState.base64files.map((item, index) =>
        React.createElement('input', {
          key: {index},
          type: 'hidden',
          id: `file-${index}`,
          value: documentState.base64files[index]
        })
        )}
      <input type='hidden' id='attr' size='80' value='1.2.112.1.2.1.1.1.1.2' />
      <div id='attrCertSelectContainer' style={{ display: 'none' }}>
        <span id='certExtAbsent' />
        <select style={{ visibility: 'hidden' }} id='attrCertSelect' />
      </div>
      <input type='hidden' id='attrValue' size='80' disabled='disabled' />
    </div>
  )
}

export default NewDocumentPage
