import React, { Fragment } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Typography } from 'antd'
import {
  LayoutBlock,
  FooterBlock,
  ContentBlock,
  HeaderBlock
} from '../'

import './WhitePageRoute.scss'

const { Title, Text } = Typography

const WhitePageRoute = ({ component: Component, ...rest }) => {

  console.log(rest)

  return <Route {...rest}
    render={props =>
      window.localStorage.getItem('authToken')
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
