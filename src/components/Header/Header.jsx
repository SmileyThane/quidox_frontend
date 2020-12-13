import React, { useEffect, useState } from 'react'
import axios from 'axios'
import fileDownload from 'js-file-download'

import { notification } from 'antd'

import {
  HeaderTariff,
  HeaderUser
} from './internal'

import { getActiveCompany } from '../../utils'
import { logo } from '../../resources/img'

import { Header } from './styled'

export default ({
  user: {
    data,
    isFetching
  },
  brand
}) => {
  const [activeCompany, setActiveCompany] = useState(null)

  useEffect(() => {
    if (data) {
      setActiveCompany(data.hasOwnProperty('companies') && getActiveCompany(data))
    }
  }, [data])

  const importCerts = () => {
    const isBrowserIE = /*@cc_on!@*/false || !!document.documentMode

    if (isBrowserIE) {
      // window.pluginLoaded()
      setTimeout(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/ruc/get`, {
          'responseType': 'arraybuffer',
          headers: {
            'Access-Control-Expose-Headers': 'Content-Disposition,X-Suggested-Filename'
          }
        }).then(({ data }) => {
          fileDownload(data, `ruc.cer`)
          window.importCerts(data)
          notification.success({
            message: 'Сертификаты обновлены!'
          })
        }).catch(error => console.error(error))
      }, 3000)
    }
  }

  return (
    <Header>
      <Header.Inner>
        <Header.Brand>
          {!isFetching && (
            <Header.Brand.Logo
              href={brand ? brand.logout_uri : 'https://quidox.by'}
              src={brand ? brand.logo_png : logo}
            />)}
        </Header.Brand>

        {(window.localStorage.getItem('authToken') || window.sessionStorage.getItem('authToken')) && (
          <>
            <HeaderTariff />
            <HeaderUser />
          </>)}
      </Header.Inner>
    </Header>
  )
}
