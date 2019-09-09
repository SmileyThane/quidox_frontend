import React, { Fragment } from 'react'
import { Redirect, Route } from 'react-router-dom'

import { LayoutBlock, FooterBlock, ContentBlock } from '../'
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
              <header className='public-header'>
                <img className='logo' src={logo} alt="Logo"/>
              </header>
              <Component {...props} />
            </ContentBlock>
            <FooterBlock className='footer public-footer' />
          </LayoutBlock>
        </Fragment>
    }
  />
}

export default PublicRoute
