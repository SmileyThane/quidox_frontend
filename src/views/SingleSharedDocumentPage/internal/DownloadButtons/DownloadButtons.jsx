import React, { Fragment, useState } from 'react'
import axios from 'axios'
import fileDownload from 'js-file-download'

import { Button, message, Icon } from 'antd'
import { api } from '../../../../services'

const defaultState = {
  fetching: [false, false]
}
const DownloadButtons = ({ document }) => {
  const [state, setState] = useState({ ...defaultState })

  const downloadArchive = (document, withCert = false) => {
    setState({
      ...state,
      fetching: [!withCert, withCert]
    })
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
                setState({ ...defaultState })
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

  const { fetching } = state
  return (
    <Fragment>
      {/*<Button*/}
      {/*  type='primary'*/}
      {/*  onClick={() => downloadArchive(document, false)}*/}
      {/*  style={{ marginRight: '2rem' }}*/}
      {/*>*/}
      {/*  <Icon type={fetching[0] ? 'loading' : 'file-zip'} />*/}
      {/*  Скачать всe*/}
      {/*</Button>*/}
      <Button
        type='primary'
        onClick={() => downloadArchive(document, true)}
      >
        <Icon type={fetching[1] ? 'loading' : 'file-zip'} />
        Скачать всe
        {/*c сигнатурами*/}
      </Button>
    </Fragment>
  )
}

export default DownloadButtons
