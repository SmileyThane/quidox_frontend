import React, { Fragment } from 'react'
import { notification } from 'antd'

import { Button } from '../../components'
// import axios from 'axios'

const isIE = /*@cc_on!@*/false || !!document.documentMode

const EsignLoginPage = props => {

  if (isIE) {
    setTimeout(() => {
      try {
        window.pluginLoaded()
      } catch (error) {
      }
    }, 1000)
  }

  const signLogin = () => {
    try {
      const sertificationObject = window.sign('111', '111')
      console.log(sertificationObject)
      notification['error']({
        message: 'успех!'
      })
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
