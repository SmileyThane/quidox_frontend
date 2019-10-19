import React from 'react'

import { message } from 'antd'
import {
  AvestErrorHandling
} from '../../../../components'
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

const FileActions = props => {
  const {
    file,
    index,
    documentId,
    changeStatus,
    verifyDocument
  } = props

  const receivingTooltipText = (status, array = []) => {
    return array.find(i => i.status === status).text
  }

  const receivingIconColor = (status, array = []) => {
    return array.find(i => i.status === status).style
  }

  const handleAgreeFile = (file, status) => {
    if (status !== 2) {
      return null
    }

    const data = {
      attachments: [
        {
          id: file.id,
          status: 4,
          color: '#808000',
          name: 'Согласовано'
        }
      ]
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
        attachments: [
          {
            id: file.id,
            status: 6,
            color: '#800000',
            name: 'Отклонен'
          }
        ]
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

  const handleVerifyFile = (file, status, index) => {
    // if (!isIE || item.status.status_data.id !== 3) {
    //   return null
    // }

    const base64 = file.encoded_file
    const input = window.document.createElement('input')
    input.type = 'hidden'
    input.id = `dataFile-${index}`
    window.document.body.appendChild(input)
    window.document.getElementById('dataFile-' + index).value = base64

    try {
      window.sign('File-' + index)

      setTimeout(() => {
        const value = document.getElementById(`verifiedDataFile-${index}`).value
        const signedValue = document.getElementById(`signedDataFile-${index}`).value
        const flashData = JSON.parse(decodeURIComponent(value))
        const key = flashData.cert['2.5.29.14']
        const newData = {
          documents: [{
            id: documentId,
            attachments: [
              {
                id: file.id,
                hash: signedValue,
                data: value,
                status: 5
              }
            ]
          }]
        }
        api.documents.checkFlashKey({ key: key, attachment_id: file.id })
          .then(({ data }) => {
            if (data.success) {
              verifyDocument(newData)
                .then(({ success, error }) => {
                  if (success) {
                    message.success('Файл успешно подписан!')
                  } else {
                    throw new Error(error)
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
      }, 1000)
    } catch (error) {
      console.log(error)
    }
  }

  const statusId = file.status.status_data.id
  return [
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
    </ActionTooltip>,

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
    </ActionTooltip>,

    <ActionTooltip
      arrowPointAtCenter
      placement='topRight'
      key={3}
      title={receivingTooltipText(statusId, verifyText)}
    >
      <ActionIcon
        type='edit'
        style={receivingIconColor(statusId, verifyStyle)}
        onClick={() => handleVerifyFile(file, statusId, index)}
      />
    </ActionTooltip>,

    <ActionTooltip
      arrowPointAtCenter
      key={4}
      placement='topRight'
      title='Скачать файл'
    >
      <ActionIcon
        type='download'
        style={{ color: '#3278fb', fontSize: '1.7rem' }}
      />
    </ActionTooltip>
  ]
}

export default FileActions
