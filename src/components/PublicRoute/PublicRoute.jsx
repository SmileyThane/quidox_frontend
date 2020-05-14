import React, { useEffect, useState, Fragment } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useLocation } from 'react-router'
import { Typography, message } from 'antd'
import axios from 'axios'

import {
  LayoutBlock,
  FooterBlock,
  ContentBlock,
  HeaderBlock
} from '../'

import history from '../../history'
import './PublicRoute.scss'

const { Title, Text } = Typography

const PublicRoute = ({ component: Component, getConfig, config: { isFetching }, ...rest }) => {
  const [fetching, setFetching] = useState(true)

  function useQuery () {
    return new URLSearchParams(useLocation().search)
  }

  const query = useQuery()

  useEffect(() => {
    const token = query.get('token')
    if (token) {
      setFetching(true)
      window.localStorage.setItem('authToken', token)
      history.push('/')
      setFetching(false)
    } else {
      setFetching(false)
    }
  })

  useEffect(() => {
    getConfig()
  }, [])

  if (fetching || isFetching) {
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
