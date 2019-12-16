import React, { Fragment } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Typography } from 'antd'
import {
  LayoutBlock,
  FooterBlock,
  ContentBlock,
  HeaderBlock
} from '../'

import './PublicRoute.scss'

const { Title, Text } = Typography

const PublicRoute = ({ component: Component, ...rest }) => {

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
                <div className='app-preview'>
                  <Text style={{ color: '#fff', fontSize: '2rem' }} level={2}>
                    Благодаря сервису<br />
                    <span style={{ fontWeight: 'bold' }}>QuiDox.by</span><br />
                    Вы сможете с легкостью обмениваться электронными
                    документами с ЭЦП.<br /><br />
                    Доставка происходит мгновенно!<br /><br />
                    Пакет услуг "Легкий старт" БЕСПЛАТНО первые 90 дней!
                  </Text>
                </div>
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
