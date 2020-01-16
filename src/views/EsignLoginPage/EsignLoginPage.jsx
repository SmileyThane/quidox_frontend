import React, { Fragment, useEffect, useState } from 'react'
// import axios from 'axios'

import { notification, Typography } from 'antd'

import { Button } from '../../components'

const {} = Typography

const defaultDocumentState = {
  isVisible: false,
  fileLink: '',
  fileType: '',
  showModal: false,
  data: [],
  value: [],
  fetching: false,
  modalType: 'ecp',
  base64files: '',
  certs: '',
  fileHashes: '',
  fileData: '',
  fileCerts: [],
  activeFileCert: 0,
  ecpInfo: null,
  isSelectVisible: false,
  isErrorWitchEcp: false,
  declineMessage: '',
  singleFile: null
}

const isIE = /*@cc_on!@*/false || !!document.documentMode

const EsignLoginPage = props => {
  const [documentState] = useState({ ...defaultDocumentState })

  useEffect(() => {
    if (isIE) {
      setTimeout(() => {
        try {
          window.pluginLoaded()
        } catch (error) {
        }
      }, 1000)
    }
  }, [documentState.isErrorWitchEcp])

  const signLogin = () => {
    try {
      const sertificationObject = window.sign('111', '111')
      console.log(sertificationObject)
    } catch (error) {
      notification['error']({
        message: error.message
      })
    }
  }
  return (
    <Fragment>
      <Button
        type='primary'
        style={{ marginTop: 20 }}
        onClick={signLogin}
      >
        Перейти
      </Button>
    </Fragment>
  )
}
export default EsignLoginPage
