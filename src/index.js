import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { store } from './store'
import App from './App'

import { ConfigProvider } from 'antd'

import 'moment/locale/ru'
import ruRU from 'antd/es/locale/ru_RU'

import './styles/app.scss'

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={ruRU}>
      <App />
    </ConfigProvider>
  </Provider>,
  document.getElementById('root')
)
