import React from 'react'
// import axios from 'axios'
// import fileDownload from 'js-file-download'

// import { notification } from 'antd'

import {
  HeaderSearch,
  HeaderTariff,
  HeaderConnect,
  HeaderUser
} from './internal'

import { logo } from '../../resources/img'

import { Header } from './styled'

export default ({
  user: {
    isFetching
  },
  brand
}) => {
  // const importCerts = () => {
  //   const isBrowserIE = /*@cc_on!@*/false || !!document.documentMode

  //   if (isBrowserIE) {
  //     // window.pluginLoaded()
  //     setTimeout(() => {
  //       axios.get(`${process.env.REACT_APP_BASE_URL}/ruc/get`, {
  //         'responseType': 'arraybuffer',
  //         headers: {
  //           'Access-Control-Expose-Headers': 'Content-Disposition,X-Suggested-Filename'
  //         }
  //       }).then(({ data }) => {
  //         fileDownload(data, `ruc.cer`)
  //         window.importCerts(data)
  //         notification.success({
  //           message: 'Сертификаты обновлены!'
  //         })
  //       }).catch(error => console.error(error))
  //     }, 3000)
  //   }
  // }

  const isLogged = window.localStorage.getItem('authToken') || window.sessionStorage.getItem('authToken')

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

        {isLogged && (
          <Header.Params>
            <HeaderSearch />
            <HeaderTariff />
            <HeaderConnect />
            <HeaderUser />
          </Header.Params>)}
      </Header.Inner>
    </Header>
  )
}
