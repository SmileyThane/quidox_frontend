import React, { useEffect, useState, Fragment } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useLocation } from 'react-router'
import { faviconIcon } from '../../resources/img'

import {
  LayoutBlock,
  FooterBlock,
  ContentBlock,
  HeaderBlock
} from '../'

import './PublicRoute.scss'

const favicon = document.querySelector(('[rel=icon]'))

const PublicRoute = ({ component: Component, getConfig, config, ...rest }) => {
  const [fetching, setFetching] = useState(true)

  function useQuery () {
    return new URLSearchParams(useLocation().search)
  }

  const query = useQuery()

  useEffect(() => {
    if (Object.keys(config).length) {
      document.title = 'MTC SmartDoc'
      favicon.href = faviconIcon
    }
  }, [Object.keys(config).length])

  useEffect(() => {
    const token = query.get('token')
    if (token) {
      setFetching(true)
      window.localStorage.setItem('authToken', token)
      window.open('/', '_self')
      setFetching(false)
    } else {
      setFetching(false)
    }
  })

  useEffect(() => {
    getConfig()
  }, [])

  if (fetching || config.isFetching) {
    return 'Loading...'
  }
  console.log(favicon)
  return <Route {...rest}
    render={props =>
      (window.localStorage.getItem('authToken') || window.sessionStorage.getItem('authToken'))
        ? (<Redirect to={{ pathname: '/', state: { from: props.location } }} />)
        : <Fragment>
          <LayoutBlock>
            <ContentBlock logWrapp>
              <HeaderBlock />
              <div className='app'>
                <div className='app-content'>
                  <Component {...props} />
                  <FooterBlock className='footer public-footer' />
                </div>
              </div>
            </ContentBlock>
          </LayoutBlock>
        </Fragment>
    }
  />
}

export default PublicRoute
