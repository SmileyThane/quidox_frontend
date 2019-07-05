import React, { Fragment, useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'

import { Layout } from 'antd'
import { LayoutBlock, HeaderBlock, SiderBlock, ContentBlock, FooterBlock } from '../'

const PrivateRoute = ({ component: Component, getUser, ...rest }) => {

  useEffect(() => {
    if (window.localStorage.getItem('authToken')) {
      getUser()
      window.pluginLoaded()
    }
  }, [getUser])

  return <Route {...rest}
    render={props =>
      window.localStorage.getItem('authToken')
        ? <Fragment>
          <LayoutBlock content>
            <HeaderBlock />
            <Layout>
              <SiderBlock />
              <ContentBlock>
                <Component {...props} />
              </ContentBlock>
            </Layout>
            <FooterBlock />
          </LayoutBlock>
        </Fragment>
        : (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />)
    }
  />
}

export default PrivateRoute
