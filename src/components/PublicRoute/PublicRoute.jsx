import React, { Fragment } from 'react'
import { Redirect, Route } from 'react-router-dom'

import { LayoutBlock, FooterBlock, ContentBlock, HeaderBlock } from '../'
import { logo } from '../../resources/img'

import './PublicRoute.scss'

const PublicRoute = ({ component: Component, ...rest }) => {

  return <Route {...rest}
    render={props =>
      window.localStorage.getItem('authToken')
        ? (<Redirect to={{ pathname: '/', state: { from: props.location } }} />)
        : <Fragment>
          <LayoutBlock>
            <ContentBlock logWrapp>
              <HeaderBlock />
              <Component {...props} />
            </ContentBlock>
            <FooterBlock className='footer public-footer' />
          </LayoutBlock>
        </Fragment>
    }
  />
}

export default PublicRoute
