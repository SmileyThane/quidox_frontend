import React, { useReducer, Fragment, useEffect } from 'react'
import useForm from 'rc-form-hooks'
import axios from 'axios'
import fileDownload from 'js-file-download'
import { Base64 } from 'js-base64'

import { message, notification, Modal, Form, Input } from 'antd'
import { Button } from '../../../../components'
import { ActionTooltip, ActionIcon } from './styled'
import {
  agreeText,
  declineText,
  verifyText,
  agreeStyle,
  declineStyle,
  verifyStyle,
  normal
} from './static'
import { api } from '../../../../services'
import { checkBrowser } from '../../../../utils'

const { TextArea } = Input

const initialState = {
  isModalVisible: false,
  modalType: '',
  selected_file: null,
  status: null
}

function reducer (state, action) {
  switch (action.type) {
    case 'SHOW_MODAL':
      return {
        ...state,
        isModalVisible: true,
        modalType: action.payload.modal_type,
        selected_file: action.payload.selected_file,
        status: action.payload.status
      }
    case 'HIDE_MODAL':
      return {
        ...initialState
      }
    default:
      return state
  }
}

const FileActions = props => {
  const {
    file,
    documentId,
    canBeSigned,
    messageId,
    getDocument,
    changeStatus,
    verifyFile,
    user,
    config
  } = props

const [state, dispatch] = useReducer(
  reducer,
  initialState
)

const {
  isModalVisible,
  modalType,
  selected_file,
  status
} = state

  const { getFieldDecorator, validateFields, values } = useForm()

  const receivingTooltipText = (status, array = []) => {
    if (status === 5) {
      return null
    }
    return array.find(i => i.status === status).text
  }

  const receivingIconColor = (status, array = []) => {
    if (status === 5) {
      return null
    }
    return array.find(i => i.status === status).style
  }

  const handleAgreeFile = e => {
    e.preventDefault()
    if (status !== 2) {
      return null
    }

    const data = {
      attachment_id: file.id,
      status: 4,
      color: '#808000',
      name: 'Согласовано',
      comment: values.agree_message
    }

    changeStatus(data)
      .then(({ data }) => {
        if (data.success) {
          message.success('Файл успешно согласован')
          dispatch({ type: 'HIDE_MODAL' })
        } else {
          throw new Error(data.error)
        }
      })
      .catch(error => {
        message.error(error.message)
      })
  }

  const handleDeclineFile = e => {
    e.preventDefault()
    validateFields()
      .then(() => {
        if (status === 2 || status === 3) {
          const data = {
            attachment_id: file.id,
            status: 6,
            color: '#800000',
            name: 'Отклонен',
            comment: values.decline_message
          }
          changeStatus(data)
            .then(({ data }) => {
              if (data.success) {
                message.success('Файл успешно отклонен')
                dispatch({ type: 'HIDE_MODAL' })
              } else {
                throw new Error(data.error)
              }
            })
            .catch(error => {
              message.error(error.message)
            })
        } else {
          return null
        }
      })
  }

  const clientId = config.data.co_brand_config ? config.data.co_brand_config.client_id : process.env.REACT_APP_SIM_SCEP_URL
  const callback = config.data.co_brand_config ? config.data.co_brand_config.callback : process.env.REACT_APP_SIM_SCEP_URL

  const newPageUrl = `${process.env.REACT_APP_SIM_SCEP_URL}?`+
    `client_id=${clientId}&`+
    `response_type=code&`+
    `state=${Base64.encode(JSON.stringify({ 'co_brand_name': config.data.co_brand_config ? 'mts' : 'quidox', 'user_id': user.data.id }))}&`+
    `authentication=phone&`+
    `scope=sign&`+
    `redirect_uri=${callback}`;

  const handleSimVerifyFile = (file, documentId, status) => {
    if (status === 3 || canBeSigned) {
      try {
        api.documents.attachmentSimSign(file.id)
          .then(({ data }) => {
            if (data.success) {
              const file = {
                attachment_id: file.id,
                status: 5,
                color: '#808000',
                name: 'Файл подписан',
                comment: ''
              }
              changeStatus(file)
                .then(( data ) => {
                  if (data.success) {
                    window.open(data.data, '_self')
                    window.close()
                  } else {
                    throw new Error(data.error)
                  }
              })
            } else {
              throw new Error(data.error)
            }
          })
          .catch(error => {
            message.error(error.message)
            window.open(newPageUrl, '_self')
          })
      } catch (error) {
        notification['error']({
          message: error.message
        })
        window.open(newPageUrl, '_self')
      }
    }
  }

  const handleVerifyFile = (item, documentId, status) => {
    if ((checkBrowser('ie') && status === 3) || canBeSigned) {
      api.files.getBase64File(item.id)
        .then(({ data }) => {
          if (data.success) {
            try {
              const isIE = /*@cc_on!@*/false || !!document.documentMode
              window.pluginLoaded()
                  const sertificationObject = window.signProcess(data.data.encoded_base64_file, item.hash_for_sign)
                  const newData = {
                    id: item.id,
                    hash: sertificationObject.signedData,
                    data: sertificationObject.verifiedData,
                    hash_for_sign: sertificationObject.hex,
                    status: canBeSigned ? null : 5
                  }

                  api.documents.attachmentSignCanConfirm({ key: sertificationObject.verifiedData.key, attachment_id: item.id })
                    .then(({ data }) => {
                      if (data.success) {
                        verifyFile(newData)
                          .then((response) => {
                            if (response.success) {
                              message.success('Файл успешно подписан!')
                              getDocument()
                              window.pluginClosed()
                            } else {
                              message.error('Ошибка подписания. Повторите операцию')
                              // throw new Error(response.error)
                            }
                          })
                          .catch(error => {
                            message.error(error.message)
                          })
                      } else {
                        throw new Error(data.error)
                      }
                    })
                    .catch(error => {
                      message.error(error.message)
                    })

            } catch (error) {
              notification['error']({
                message: error.message
              })
            }
          }
        })
    }
  }

  const downloadFile = file => {
    axios.get(file.original_path, {
      'responseType': 'arraybuffer',
      headers: {
        'Authorization': 'Bearer ' + window.localStorage.getItem('authToken') || 'Bearer ' + window.sessionStorage.getItem('authToken'),
        'Access-Control-Expose-Headers': 'Content-Disposition,X-Suggested-Filename'
      }
    })
      .then(({ data }) => {
        if (data) {
          fileDownload(data, file.name)
          message.success('Файл успешно загружен!')
        }
      })
      .catch(error => {
        message.error(error.message)
      })
  }

  const statusId = file.status.status_data.id
  const simButtonName = config.data.co_brand_config ? config.data.co_brand_config.co_brand_name : 'Mobile'

  return (
    <Fragment>
      <Fragment>
        { statusId !== 5 && ![1, 3, 4, 9, 10].includes(messageId) &&
        <ActionTooltip
          arrowPointAtCenter
          placement='topRight'
          title={receivingTooltipText(statusId, agreeText)}
        >
          <ActionIcon
            key={1}
            type='check-circle'
            style={receivingIconColor(statusId, agreeStyle)}
            // onClick={() => handleAgreeFile(file, statusId)}
            onClick={() => dispatch({ type:'SHOW_MODAL', payload: { isModalVisible: true, modal_type: 'agree', status: statusId, selected_file: file }})}
          />
        </ActionTooltip>
        },
      </Fragment>,

      <Fragment>
        {statusId !== 5 && ![1, 3, 4, 9, 10].includes(messageId) &&
        <ActionTooltip
          arrowPointAtCenter
          placement='topRight'
          title={receivingTooltipText(statusId, declineText)}
        >
          <ActionIcon
            key={2}
            type='stop'
            style={receivingIconColor(statusId, declineStyle)}
            // onClick={() => handleDeclineFile(file, statusId)}
            onClick={() => dispatch({ type:'SHOW_MODAL', payload: { isModalVisible: true, modal_type: 'decline', status: statusId, selected_file: file }})}
          />
        </ActionTooltip>
        }
      </Fragment>,

      <Fragment>
        {statusId !== 5 && ![3, 4].includes(messageId) &&
        <ActionTooltip
          arrowPointAtCenter
          placement='topRight'
          title={`Подписать документ (${simButtonName} ID)`}
        >
          <ActionIcon
            key={3}
            type='mobile'
            style={canBeSigned ? normal : receivingIconColor(statusId, verifyStyle)}
            onClick={() => handleSimVerifyFile(file, documentId, statusId)}
          />
        </ActionTooltip>
        }
      </Fragment>,

      <Fragment>
        {statusId !== 5 && ![3, 4].includes(messageId) &&
        <ActionTooltip
          arrowPointAtCenter
          placement='topRight'
          title={canBeSigned ? 'Подписать документ (ЭЦП)' : receivingTooltipText(statusId, verifyText)}
        >
          <ActionIcon
            key={3}
            type='edit'
            style={canBeSigned ? normal : receivingIconColor(statusId, verifyStyle)}
            onClick={() => handleVerifyFile(file, documentId, statusId)}
          />
        </ActionTooltip>
        }
      </Fragment>,

      <ActionTooltip
        arrowPointAtCenter
        placement='topRight'
        title='Скачать файл'
      >
        <ActionIcon
          key={4}
          type='download'
          style={{ color: '#3278fb', fontSize: '1.7rem' }}
          onClick={() => downloadFile(file)}
        />
      </ActionTooltip>
      {isModalVisible &&
      <Modal
        visible
        onCancel={() => dispatch({ type: 'HIDE_MODAL' })}
        footer={false}
      >
        <Fragment>
          {modalType === 'decline' &&
            <Form onSubmit={handleDeclineFile}>
              <Form.Item label='Введите причину отклонения'>
                {getFieldDecorator('decline_message', {
                  rules: [{ required: true, message: 'Текст отлконения является обязательным' }]
                })(
                  <TextArea style={{ resize: 'none' }} autoSize={{ minRows: 3, maxRows: 5 }} size='large' placeholder='Введите причину отклонения' />
                )}
              </Form.Item>
              <Button type='primary' htmlType='submit'>Подтвердить отклонение</Button>
            </Form>
          }
        </Fragment>
        <Fragment>
          {modalType === 'agree' &&
          <Form onSubmit={handleAgreeFile}>
            <Form.Item label='Введите текст согласования'>
              {getFieldDecorator('agree_message', {
              })(
                <TextArea style={{ resize: 'none' }} autoSize={{ minRows: 3, maxRows: 5 }} size='large' placeholder='Введите текс согласования' />
              )}
            </Form.Item>
            <Button type='primary' htmlType='submit'>Подтвердить согласование</Button>
          </Form>
          }
        </Fragment>
      </Modal>
      }
    </Fragment>
  )
}

export default FileActions
