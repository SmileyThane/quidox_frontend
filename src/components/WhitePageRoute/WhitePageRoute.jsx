import React, { Fragment, useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'

import {
  LayoutBlock,
  Footer,
  ContentBlock,
  Header
} from '../'

import './WhitePageRoute.scss'

const WhitePageRoute = ({ component: Component, getConfig, config: { isFetching }, ...rest }) => {
  const isIE = /*@cc_on!@*/!!document.documentMode;

  useEffect(() => {
    getConfig()
  }, [])

  useEffect(() => {
    if (isIE && !isFetching) {
      setTimeout(() => {
        try {
          window.pluginLoaded()
        } catch (error) {
        }
      }, 1500)
    }
  }, [isIE])

  if (isFetching) {
    return 'Loading...'
  }

  return <Route {...rest}
                render={props =>
                  (window.localStorage.getItem('authToken') || window.sessionStorage.getItem('authToken'))
                    ? (<Redirect to={{ pathname: '/', state: { from: props.location } }}/>)
                    : <Fragment>
                      <LayoutBlock>
                        <ContentBlock logWrapp>
                          <Header/>
                          <div className='app'>
                            <div className='app-content-white'>
                              <Component {...props} />
                              <Footer className='footer public-footer white-background'/>
                            </div>
                          </div>
                        </ContentBlock>
                      </LayoutBlock>
                    </Fragment>
                }
  />
}

export default WhitePageRoute
