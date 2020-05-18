import React, { Fragment, useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'

import {
  LayoutBlock,
  FooterBlock,
  ContentBlock,
  HeaderBlock
} from '../'

import './WhitePageRoute.scss'

const WhitePageRoute = ({ component: Component, getConfig, config: { isFetching }, ...rest }) => {

  useEffect(() => {
    getConfig()
  }, [])

  if (isFetching) {
    return 'Loading...'
  }

  return <Route {...rest}
    render={props =>
      (window.localStorage.getItem('authToken') || window.sessionStorage.getItem('authToken'))
        ? (<Redirect to={{ pathname: '/', state: { from: props.location } }} />)
        : <Fragment>
          <LayoutBlock>
            <ContentBlock logWrapp>
              <HeaderBlock />
              <div className='app'>
                <div className='app-content-white'>
                  <Component {...props} />
                  <FooterBlock className='footer public-footer white-background' />
                </div>
              </div>
            </ContentBlock>
          </LayoutBlock>
        </Fragment>
    }
  />
}

export default WhitePageRoute
