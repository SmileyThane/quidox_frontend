import React, { Fragment } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { LayoutBlock, HeaderBlock, FooterBlock, ContentBlock } from '../'
const PublicRoute = ({ component: Component, ...rest }) => {

  return <Route {...rest}
    render={props =>
      window.localStorage.getItem('authToken')
        ? (<Redirect to={{ pathname: '/', state: { from: props.location } }} />)
        : <Fragment>
          <LayoutBlock top>
            <HeaderBlock />
            <ContentBlock logWrapp>
              <Component {...props} />
            </ContentBlock>
          </LayoutBlock>
          <FooterBlock />
        </Fragment>
    }
  />
}

export default PublicRoute
