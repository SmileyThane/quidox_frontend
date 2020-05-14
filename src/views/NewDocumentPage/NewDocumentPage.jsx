import React, { Fragment, useEffect, useState } from 'react'
import AddToCalendar from 'react-add-to-calendar'
import _ from 'lodash'
import moment from 'moment'

import { Icon, Input, notification, Select, Spin, Typography, } from 'antd'

import { UploadFiles, Button } from '../../components'

import forbiddenEmails from '../../constants/forbiddenEmails'
import history from '../../history'
import './NewDocumentPage.scss'
import { findUsersByParams } from '../../services/api/user'

const defaultDocumentData = {
  name: '',
  description: '',
  document: {},
  data: [],
  value: [],
  fetching: false,
  message: null,
  coNumbers: ''
}

// eslint-disable-next-line spaced-comment
const isIE = /*@cc_on!@*/!!document.documentMode

const { Option } = Select
const { TextArea } = Input
const { Text } = Typography

const NewDocumentPage = props => {
  const {
    createMessage,
    getUser,
    sendDocumentToUser,
    updateDocumentById,
  } = props

  const [documentState, setDocumentState] = useState({ ...defaultDocumentData })
  const [message, setMessage] = useState(false)

  useEffect(() => {
    createMessage({ name: '[Без темы]', description: '' })
      .then(({ success, data }) => {
        if (success) {
          setDocumentState({
            ...documentState,
            message: data
          })
        }
      })
  }, [message])

  const updateField = (field, v) => {
    setDocumentState({
      ...documentState,
      [field]: v
    })
  }

  const updateFieldProcess = (field, v) => {
    updateField(field, v);
    updateDocumentById(documentState.message.id, { [field]: v });
  }

  const save2DraftDMessage = is2Draft => {
    let coEmails = []
    let UCIds = []
    if (documentState.coNumbers.length > 0) {
      let coNumbersArray = documentState.coNumbers.split(',')
      coNumbersArray.forEach(element => coEmails.push(element + '@qdx.by'))
    }
    UCIds = documentState.value.length ? documentState.value.map(i => i.key).concat(coEmails) : [].concat(coEmails)

    if (UCIds.filter(UCId => forbiddenEmails.includes(UCId)).length) {
      notification.error({
        message: 'Отправка/перенаправление по реквизиту УНП для данного адресата запрещено. Укажите точный адрес (E-mail) получателя.'
      })
      return false
    }

    updateDocumentById(documentState.message.id, {
      name: documentState.name ? documentState.name : 'Без темы',
      description: documentState.description,
      user_company_ids: JSON.stringify(UCIds)
    })
      .then(({ data }) => {
        if (is2Draft) {
          history.push({ pathname: '/documents', search: '?status=1', state: { id: '/documents/1' } })
        } else {
          if (!documentState.value.length > 0 && !documentState.coNumbers.length > 0) {
            message.error('Введите получателя!')
            setDocumentState({
              ...documentState,
              fetching: false
            })
            return null
          }
          sendDocumentToUser({
            document_ids: [documentState.message.id],
            user_company_id: documentState.value.length ? JSON.stringify(documentState.value.map(i => i.key)) : JSON.stringify([])
          }).then(({ success }) => {
            if (success) {
              notification['success']({
                message: 'Ваше сообщение успешно отправлено'
              })
              setDocumentState({ ...defaultDocumentData })
              setMessage(!message)
              getUser()
            }
          })
        }
        return data
      })
      .catch(error => console.error(error))
  }

  const fetchUser = _.debounce(v => {
    if (v.length > 2) {
      setDocumentState({
        ...documentState
        // fetching: true
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
            // fetching: false
          })
        })
        .catch(error => {
          message.error(error.message)
        })
    }
  }, 200)

  const validateEmail = label => {
    const email = label.split(' ')[0]
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  const handleSelect = v => {
    if (documentState.fetching) {
      return
    }

    const validEmails = v.filter(i => {
      if (validateEmail(i.label)) {
        return i.key
      }
    })

    if (v.length !== validEmails.length) {
      notification['error']({
        message: 'Не правильный электронный адрес'
      })
    }

    setDocumentState({
      ...documentState,
      value: validEmails
    })
  }
  return (
    <Fragment>
      <div className='content content_padding' style={{ marginBottom: '2rem' }}>
        <Spin spinning={!!documentState.fetching}>
          <div className='input-group'>
            <label className='label'>Получатели</label>

            <Select
              mode='tags'
              labelInValue
              tokenSeparators={[',']}
              value={documentState.value}
              filterOption={false}
              notFoundContent={documentState.fetching ? <Spin size='small'/> : null}
              onSearch={fetchUser}
              onChange={handleSelect}
              // disabled={documentState.fetching}
              style={{ width: '100%' }}
            >
              {documentState.data.map(element => <Option key={element.key}>{element.label}</Option>)}
            </Select>

          </div>
          <div className='input-group'>
            <label className='label'>Получатели<br/> по УНП</label>
            <Input kind='text' type='text' value={documentState.coNumbers}
                   onChange={e => updateField('coNumbers', e.target.value)}/>
          </div>
          <div className='input-group'>
            <label className='label'>Тема</label>
            <Input kind='text' type='text' value={documentState.name}
                   onChange={
                       e => updateFieldProcess('name', e.target.value)
                   }/>
          </div>

          <div className='input-group'>
            <label className='label'>Комментарий</label>
            <TextArea autosize={{ minRows: 4, maxRows: 10 }} value={documentState.description}
                      onChange={e => updateFieldProcess('description', e.target.value)}/>
          </div>

          <div className='buttons-group'>
            {documentState.message &&
            <UploadFiles document_id={documentState.message.id}/>}
          </div>

          <div className='buttons-group'>
            <Button
              ghost
              type='primary'
              onClick={() => save2DraftDMessage(true)}
              style={{ minWidth: 216 }}
            >
              <Icon type='file-text'/>
              Сохранить в черновиках
            </Button>

            <div style={{ display: 'flex' }}>
              <AddToCalendar
                buttonLabel='Добавить в календарь'
                listItems={[
                  { apple: 'Apple Calendar' },
                  { google: 'Google' },
                  { outlook: 'Outlook' }
                ]}
                event={{
                  title: 'Контроль сообщения',
                  description: '',
                  location: 'Minsk',
                  startTime: moment().add(1, 'days').startOf('day').hour('10').minute('00'),
                  endTime: moment().add(1, 'days').startOf('day').hour('11').minute('00')
                }}
              />

              <Button
                style={{ marginLeft: '2rem' }}
                type='primary'
                onClick={() => save2DraftDMessage(false)}
              >
                <Icon type='cloud-upload'/>
                Отправить
              </Button>
            </div>
          </div>
        </Spin>
      </div>

      {!isIE && <Text type='secondary'>
        Подпись файлов возможна только в браузере Internet Explorer
      </Text>
      }
    </Fragment>
  )
}

export default NewDocumentPage
