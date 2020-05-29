import React, { Fragment, useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { faviconIcon } from '../../resources/img'

import { Layout } from 'antd'
import { getActiveCompany } from '../../utils'
import { ContentBlock, FooterBlock, HeaderBlock, LayoutBlock, SiderBlock } from '../'

const favicon = document.querySelector(('[rel=icon]'))

const ProtectedRoute = ({ component: Component, user: { data }, getUser, getTariffications, ...rest }) => {
   const [activeCompany, setActiveCompany] = useState(null)
  // eslint-disable-next-line spaced-comment
  const isIE = /*@cc_on!@*/false || !!document.documentMode

  useEffect(() => {
    if (Object.keys(config).length) {
      document.title = 'MTC SmartDoc'
      favicon.href = faviconIcon
    }
  }, [Object.keys(config).length])

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
                      <HeaderBlock/>
                      <Layout>
                        <SiderBlock/>
                        <Layout>
                          <ContentBlock>
                            <Component {...props} />
                          </ContentBlock>
                          <FooterBlock/>
                        </Layout>
                      </Layout>
                    </LayoutBlock>
                  </Fragment>
                }
  />
}

export default ProtectedRoute
