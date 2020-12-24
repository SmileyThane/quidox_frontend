import React, { useState } from 'react'
import axios from 'axios'
import fileDownload from 'js-file-download'

import { message } from 'antd'

import { Button } from '../../../../components'
import { api } from '../../../../services'

export default ({ document }) => {
  const [isFetching, setIsFetching] = useState([false, false])

  const downloadArchive = (document, withCert = false) => {
    setIsFetching([!withCert, withCert])

    api.document.downloadDocument(document.id, withCert)
      .then(({ data }) => {
        if (data.success) {
          axios.get(data.data, {
            'responseType': 'arraybuffer',
            headers: {
              'Authorization': 'Bearer ' + window.localStorage.getItem('authToken') || 'Bearer ' + window.sessionStorage.getItem('authToken'),
              'Access-Control-Expose-Headers': 'Content-Disposition,X-Suggested-Filename'
            }
          })
            .then(({ data }) => {
              if (data) {
                fileDownload(data, `${document.author.company_number}_${document.created_at.split(' ')[0].split('-').join('')}_${document.name}.zip`)
                message.success('Архив успешно загружен!')

                setIsFetching([false, false])
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
  }

  return (
    <Button
      type='primary'
      icon={isFetching[1] ? 'loading' : 'download'}
      onClick={() => downloadArchive(document, true)}
    >
      Скачать всe
    </Button>
  )
}
