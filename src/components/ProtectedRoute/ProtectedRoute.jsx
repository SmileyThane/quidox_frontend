import React, { Fragment, useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { faviconIcon } from '../../resources/img'

import { Layout } from 'antd'
import { getActiveCompany } from '../../utils'
import { ContentBlock, Footer, Header, LayoutBlock, MainMenu } from '../'

const favicon = document.querySelector(('[rel=icon]'))

const ProtectedRoute = ({ component: Component, config, user: { data }, getUser, getTariffications, ...rest }) => {
   const [activeCompany, setActiveCompany] = useState(null)
  // eslint-disable-next-line spaced-comment
  const isIE = /*@cc_on!@*/false || !!document.documentMode

  useEffect(() => {
    if (config.data.co_brand_config) {
      document.title = 'MTC SmartDoc'
      favicon.href = faviconIcon
    }else {
      document.title = 'Quidox'
      favicon.href = `${process.env.REACT_APP_URL}/favicon.ico`
    }
  }, [config.data.co_brand_config])

  useEffect(() => {
    if (window.localStorage.getItem('authToken') || window.sessionStorage.getItem('authToken')) {
      getUser()
      getTariffications()
      if (isIE) {
        // setTimeout(() => {
        //   window.pluginLoaded()
        // }, 2500)
      }
    }
  }, [getUser, isIE])

  useEffect(() => {
    if (data) {
      setActiveCompany(data.hasOwnProperty('companies') && getActiveCompany(data))
    }
  }, [data])

  return <Route {...rest}
                render={props =>
                  <Fragment>
                    <LayoutBlock content>
                      <Header/>
                      <Layout>
                        <MainMenu/>
                        <Layout>
                          <ContentBlock>
                            <Component {...props} />
                          </ContentBlock>
                          <Footer/>
                        </Layout>
                      </Layout>
                    </LayoutBlock>
                  </Fragment>
                }
  />
}

export default ProtectedRoute
