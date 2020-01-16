import React, { Fragment } from 'react'
import { notification } from 'antd'

import { Button } from '../../components'
// import axios from 'axios'

const isIE = /*@cc_on!@*/false || !!document.documentMode

const EsignLoginPage = props => {



  const signLogin = () => {
    try {
      if (isIE) {
        setTimeout(() => {
          try {
            window.pluginLoaded()
          } catch (error) {
          }
        }, 1000)
        setTimeout(() => {
          try {
            const sertificationObject = window.sign('111', '111')
            notification['error']({
              message: sertificationObject
            })
          } catch (error) {
          }
        }, 2000)
      }
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
