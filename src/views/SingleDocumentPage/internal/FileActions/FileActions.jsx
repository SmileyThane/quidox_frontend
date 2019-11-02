import React, { Fragment } from 'react'
import axios from 'axios'
import fileDownload from 'js-file-download'

import { message, notification } from 'antd'
import { ActionTooltip, ActionIcon } from './styled'
import {
  agreeText,
  declineText,
  verifyText,
  agreeStyle,
  declineStyle,
  verifyStyle
} from './static'
import { api } from '../../../../services'
import { checkBrowser } from '../../../../utils'

const FileActions = props => {
  const {
    file,
    documentId,
    isHidden = false,
    getDocument,
    changeStatus,
    verifyFile
  } = props

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

  const handleAgreeFile = (file, status) => {
    if (status !== 2) {
      return null
    }

    const data = {
      attachment_id: file.id,
      status: 4,
      color: '#808000',
      name: 'Согласовано'
    }

    changeStatus(data)
      .then(({ data }) => {
        if (data.success) {
          message.success('Файл успешно согласован')
        } else {
          throw new Error(data.error)
        }
      })
      .catch(error => {
        message.error(error.message)
      })
  }

  const handleDeclineFile = (file, status) => {
    if (status === 2 || status === 3) {
      const data = {
        attachment_id: file.id,
        status: 6,
        color: '#800000',
        name: 'Отклонен'
      }
      changeStatus(data)
        .then(({ data }) => {
          if (data.success) {
            message.success('Файл успешно отклонен')
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
  }

  const handleVerifyFile = (item, documentId, status) => {
    if (checkBrowser('ie') && status === 3) {
      console.log('11111111', item)
      api.files.getBase64File(item.id)
          .then(({ data }) => {
            if (data.success) {
              try {
                console.log('22222222', data.data)
                const sertificationObject = window.sign(data.data, item.hash_for_sign)

                const newData = {
                  id: item.id,
                  hash: sertificationObject.signedData,
                  data: sertificationObject.verifiedData,
                  hash_for_sign: sertificationObject.hex,
                  status: 5
                }

                console.log(newData)
                api.documents.attachmentSignCanConfirm({ key: sertificationObject.verifiedData.key, attachment_id: item.id })
                    .then(({ data }) => {
                      if (data.success) {
                        verifyFile(newData)
                            .then((response) => {
                              if (response.success) {
                                message.success('Файл успешно подписан!')
                                getDocument()
                              } else {
                                throw new Error(response.error)
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
                console.log(error)
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
        'Authorization': 'Bearer ' + window.localStorage.getItem('authToken'),
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
        console.log(123)
        message.error(error.message)
      })
  }

  const statusId = file.status.status_data.id
  return [
    <Fragment>
      { statusId !== 5 && isHidden &&
        <ActionTooltip
          arrowPointAtCenter
          placement='topRight'
          key={1}
          title={receivingTooltipText(statusId, agreeText)}
        >
          <ActionIcon
            type='check-circle'
            style={receivingIconColor(statusId, agreeStyle)}
            onClick={() => handleAgreeFile(file, statusId)}
          />
        </ActionTooltip>
      },
    </Fragment>,

    <Fragment>
      {statusId !== 5 && isHidden &&
        <ActionTooltip
          arrowPointAtCenter
          placement='topRight'
          key={2}
          title={receivingTooltipText(statusId, declineText)}
        >
          <ActionIcon
            type='stop'
            style={receivingIconColor(statusId, declineStyle)}
            onClick={() => handleDeclineFile(file, statusId)}
          />
        </ActionTooltip>
      }
    </Fragment>,

    <Fragment>
      {statusId !== 5 && isHidden &&
        <ActionTooltip
          arrowPointAtCenter
          placement='topRight'
          key={3}
          title={receivingTooltipText(statusId, verifyText)}
        >
          <ActionIcon
            type='edit'
            style={receivingIconColor(statusId, verifyStyle)}
            onClick={() => handleVerifyFile(file, documentId, statusId)}
          />
        </ActionTooltip>
      }
    </Fragment>,

    <ActionTooltip
      arrowPointAtCenter
      key={4}
      placement='topRight'
      title='Скачать файл'
    >
      <ActionIcon
        type='download'
        style={{ color: '#3278fb', fontSize: '1.7rem' }}
        onClick={() => downloadFile(file)}
      />
    </ActionTooltip>
  ]
}

export default FileActions
