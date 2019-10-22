import React from 'react'

import { message } from 'antd'
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
    getDocument,
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

  const verifyFile = (item, documentId, status) => {
    if (checkBrowser('ie') || status !== 3) {
      return null
    }
    const base64 = item.encoded_file

    try {
      const sertificationObject = window.sign(base64)

      const newData = {
        documents: [{
          id: documentId,
          attachments: [
            {
              id: item.id,
              hash: sertificationObject.signedData,
              data: sertificationObject.verifiedData,
              status: 5
            }
          ]
        }]
      }

      api.documents.checkFlashKey({ key: sertificationObject.verifiedData.key, attachment_id: item.id })
        .then(({ data }) => {
          if (data.success) {
            verifyDocument(newData)
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
    }
  }

  const statusId = file.status.status_data.id
  console.log(statusId)
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
        onClick={() => verifyFile(file, documentId, statusId)}
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
