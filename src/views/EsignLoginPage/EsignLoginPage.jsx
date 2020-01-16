import React, { Fragment } from 'react'
import { notification } from 'antd'

import { Button } from '../../components'
// import axios from 'axios'

const isIE = /* @cc_on!@*/false || !!document.documentMode

function signAuth (isIE) {

  if (isIE) {
    setTimeout(() => {
      try {
        window.pluginLoaded()
        console.log('111')
        return true
      } catch (error) {
        return false
      }
    }, 1000)
  }
  console.log('111')
}

function signLogin (isIE) {
  try {
    let $res = signAuth(isIE)
    if ($res) {
      const sertificationObject = window.sign('111', '111')
      return true
    }
  } catch (error) {
    return false
  }
  console.log('22')
}

const EsignLoginPage = props => {

  const signLoginSubmit = () => {
    try {
      signLogin(isIE)
      console.log('aaaa')
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
        onClick={signLoginSubmit}
      >
        Перейти
      </Button>
    </Fragment>
  )
}
export default EsignLoginPage
