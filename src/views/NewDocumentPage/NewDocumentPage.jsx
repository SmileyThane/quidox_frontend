import React, { Fragment, useEffect, useReducer, useState } from 'react'
import AddToCalendar from 'react-add-to-calendar'
import _ from 'lodash'
import moment from 'moment'

import {
  Row,
  Col,
  // Icon,
  Input,
  notification,
  Select,
  Spin,
  // Table,
  Typography
} from 'antd'

import {
  LayoutScroll,
  FooterFixed,
  Button,
  UploadFiles
} from '../../components'

import forbiddenEmails from '../../constants/forbiddenEmails'
import history from '../../history'

import { findUsersByParams } from '../../services/api/user'

import { Layout } from './styled'

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
const { Title, Paragraph } = Typography

const initialState = {
  isChainMessage: false,
  isTableVisible: false,
  users: [{
    id: 0,
    email: '',
    activeUNP: '',
    unp: [],
    status: 1,
    additionally: 1
  }]
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_MESSAGE':
      return {
        ...state,
        isChainMessage: !state.isChainMessage
      }
    case 'SHOW_TABLE':
      return {
        ...state,
        isTableVisible: true
      }
    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, action.payload]
      }
    case 'EDIT_FIELD':
      return {
        ...state,
        users: [
          ...state.users.slice(0, state.users.findIndex(i => i.id === action.payload.id)),
          action.payload,
          ...state.users.slice(state.users.findIndex(i => i.id === action.payload.id) + 1)
        ]
      }
    case 'RESET':
      return {
        ...initialState
      }
  }
}

const NewDocumentPage = props => {
  const {
    createMessage,
    getUser,
    sendDocumentToUser,
    updateDocumentById
  } = props

  const [documentState, setDocumentState] = useState({ ...defaultDocumentData })
  const [state, dispatch] = useReducer(reducer, initialState)
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

  const tableColumns = [
    {
      key: '1',
      title: 'Адрес',
      render: record => <Paragraph editable={{ onChange: str => editEmail(str, record) }}>{record.email}</Paragraph>
    },
    {
      key: '2',
      title: 'УНП',
      render: record => <Fragment>
        {!!record.unp.length &&
        <Select style={{ minWidth: '20rem' }} onChange={value => editUNP(value, record)} placeholder='Выберете УНП'>
          {record.unp.map(i => (
            <Option value={i.id} key={i.company_number}>{i.company_number}</Option>
          ))}
        </Select>
        }
      </Fragment>
    },
    // {
    //   key: '3',
    //   title: 'Тип требовония',
    //   render: record => <Select  onChange={value => editStatus(value, record)} style={{ minWidth: '20rem' }} defaultValue={record.status}>
    //     <Option value={1}>Простая доставка</Option>
    //     <Option value={2}>Согласование</Option>
    //     <Option value={3}>Подпись получателя</Option>
    //   </Select>
    // },
    {
      key: '4',
      title: 'Дополнительно',
      render: record => (
        <Select
          onChange={value => editAdditionallyStatus(value, record)}
          style={{ minWidth: '20rem' }}
          value={record.additionally}
        >
          <Option value={1}>Прервать цепочку в случае отказа</Option>
          <Option value={2}>Не прерывать цепочку в случае отказа</Option>
        </Select>
      )
    }
  ]

  const addUser = () => {
    dispatch({ type: 'ADD_USER',
      payload: {
        id: state.users.length + 1,
        email: '',
        activeUNP: '',
        unp: [],
        status: state.users[state.users.length - 1].status,
        additionally: state.users[state.users.length - 1].additionally
      }
    })
  }

  const editStatus = (value, record) => {
    dispatch({ type: 'EDIT_FIELD', payload: { ...record, status: value } })
  }

  const editUNP = (value, record) => {
    dispatch({ type: 'EDIT_FIELD', payload: { ...record, activeUNP: value } })
  }

  const editAdditionallyStatus = (value, record) => {
    dispatch({ type: 'EDIT_FIELD', payload: { ...record, additionally: value } })
  }

  const editEmail = (str, record) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (re.test(String(str).toLowerCase())) {
      dispatch({ type: 'EDIT_FIELD', payload: { ...record, email: str, activeUNP: str } })
      findUsersByParams(str)
        .then(({ data }) => {
          console.log(data)
          dispatch({ type: 'EDIT_FIELD', payload: { ...record, unp: data.data, email: str, activeUNP: str } })
        })
    } else {
      dispatch({ type: 'EDIT_FIELD', payload: { ...record, email: '' } })
      notification['error']({
        message: 'Не правильный электронный адрес'
      })
    }

  }

  const chainSend = () => {
    const { message } = documentState
    const { users } = state
    const sendData = users.map((i, idx) => {
      return {
        document_ids: [message.id],
        user_company_id: JSON.stringify([i.activeUNP]),
        continues_action: i.additionally !== 1,
        is_disabled: idx !== 0
      }
    })
    sendData.forEach(element => {
      sendDocumentToUser(element)
        .then(({ success, error }) => {
          if (success) {
          } else {
            throw new Error(error)
          }
        })
        .catch(error => {
          notification.error({
            message: error.message
          })
        })
    })
    notification['success']({
      message: 'Ваше сообщение успешно отправлено'
    })
    history.push({ pathname: '/documents', search: '?status=3', state: { id: '/documents/3' } })
    setDocumentState({ ...defaultDocumentData })
    setMessage(!message)
    dispatch({ type: 'RESET' })
    getUser()
  }

  const updateField = (field, v) => {
    setDocumentState({
      ...documentState,
      [field]: v
    })
  }

  const updateFieldProcess = (field, v) => {
    updateField(field, v)
    updateDocumentById(documentState.message.id, { [field]: v })
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
              history.push({ pathname: '/documents', search: '?status=3', state: { id: '/documents/3' } })
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

    updateDocumentById(documentState.message.id, { user_company_ids: JSON.stringify(validEmails.map(i => i.key)) })

    setDocumentState({
      ...documentState,
      value: validEmails
    })
  }

  return (
    <LayoutScroll withFooter>
      <Layout>
        {/* <Button
          onClick={() => dispatch({ type: 'TOGGLE_MESSAGE' })}
          type='primary'
        >
          {state.isChainMessage ? 'Обычная отправка' : 'Отправка цепочкой'}
        </Button>

        {state.isChainMessage
          ? <div>
            <Layout.Control>
              <label>Тема</label>

              <Input
                kind='text'
                type='text'
                value={documentState.name}
                onChange={e => updateFieldProcess('name', e.target.value)}
              />
            </Layout.Control>

            <Layout.Control>
              <label>Комментарий</label>

              <TextArea
                autoSize={{ minRows: 5, maxRows: 12 }}
                value={documentState.description}
                onChange={e => updateFieldProcess('description', e.target.value)}
              />
            </Layout.Control>

            <div className='buttons-group'>
              <Button
                type='primary'
                onClick={() => dispatch({ type: 'SHOW_TABLE' })}
              >
                Добавить файл и указать маршрут
              </Button>
            </div>

            {state.isTableVisible && (
              <>
                <div className='buttons-group'>
                  {documentState.message &&
                  <UploadFiles isStatus={false} document_id={documentState.message.id}/>}
                </div>

                <div className='buttons-group'>
                  <Table
                    className='user_table'
                    pagination={false}
                    style={{ width: '100%' }}
                    columns={tableColumns}
                    dataSource={state.users}
                  />
                </div>
                <Button type='link' onClick={addUser}>+ Добавить получателя</Button>

                <div className='buttons-group'>
                  <Button onClick={chainSend} type='primary'>Отправить</Button>
                </div>
              </>)}
          </div> */}

        <Layout.Inner>
          <Title level={3}>Новое сообщение</Title>

          <Spin spinning={!!documentState.fetching}>
            <Row gutter={[12, 16]}>
              <Col span={24}>
                <Layout.Control>
                  <label>Получатели по почте</label>

                  <Select
                    mode='tags'
                    labelInValue
                    tokenSeparators={[',']}
                    value={documentState.value}
                    filterOption={false}
                    notFoundContent={documentState.fetching ? <Spin size='small' /> : null}
                    onSearch={fetchUser}
                    placeholder='Введите электронную почту'
                    onChange={handleSelect}
                    style={{ width: '100%' }}
                  >
                    {documentState.data.map(element => <Option key={element.key}>{element.label}</Option>)}
                  </Select>
                </Layout.Control>
              </Col>

              <Col span={12}>
                <Layout.Control>
                  <label>Получатели по УНП</label>

                  <Input
                    kind='text'
                    type='text'
                    value={documentState.coNumbers}
                    placeholder='Введите УНП получателя'
                    onChange={e => updateField('coNumbers', e.target.value)}
                  />
                </Layout.Control>

                <Layout.Control>
                  <label>Тема</label>

                  <Input
                    kind='text'
                    type='text'
                    value={documentState.name}
                    placeholder='Ёмкое название сообщения'
                    onChange={e => updateFieldProcess('name', e.target.value)}
                  />
                </Layout.Control>
              </Col>

              <Col span={12}>
                <Layout.Control>
                  <label>Комментарий</label>

                  <TextArea
                    className='control-comment'
                    autoSize={{ minRows: 5, maxRows: 12 }}
                    placeholder='Опишите все, что важно знать получателю'
                    value={documentState.description}
                    onChange={e => updateFieldProcess('description', e.target.value)}
                  />
                </Layout.Control>
              </Col>

              {documentState.message && (
                <Col span={24}>
                  <UploadFiles document_id={documentState.message.id} />
                </Col>)}
            </Row>
          </Spin>
        </Layout.Inner>

        <FooterFixed>
          <Layout.Actions>
            <Button
              type='primary'
              onClick={() => save2DraftDMessage(true)}
              icon='file-text'
              ghost
            >
              Сохранить в черновиках
            </Button>

            <Layout.Actions.Calendar>
              <AddToCalendar
                buttonClassClosed='ant-btn ant-btn-primary ant-btn-background-ghost'
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
            </Layout.Actions.Calendar>
          </Layout.Actions>

          <Button
            type='primary'
            icon='export'
            onClick={() => save2DraftDMessage(false)}
          >
            Отправить сообщение
          </Button>
        </FooterFixed>
      </Layout>
    </LayoutScroll>
  )
}

export default NewDocumentPage
