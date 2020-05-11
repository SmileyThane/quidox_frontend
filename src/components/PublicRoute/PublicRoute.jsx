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

const PublicRoute = ({ component: Component, ...rest }) => {
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

  if (fetching) {
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
                <div className='app-preview'>
                  <Text style={{ color: '#fff', fontSize: '2rem' }} level={2}>
                    Благодаря сервису<br />
                    <span style={{ fontWeight: 'bold' }}>QuiDox.by</span><br />
                    Вы сможете с легкостью обмениваться электронными
                    документами с ЭЦП.<br /><br />
                    Доставка происходит мгновенно!<br /><br />
                    Пакет услуг "Легкий старт" подписание БЕСПЛАТНО первые 90 дней!
                    Все входящие сообщения ВСЕГДА БЕСПЛАТНО!
                  </Text>
                  <a style={{ color: '#000', fontSize: '2rem' }} href={'https://quidox.by/release'}>Список изменений(ver:3.2.3)</a>
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
