import React from 'react'
import axios from 'axios'
import moment from 'moment'

import {
  message,
  notification
} from 'antd'

import { Button } from '../../../../components'

import { Layout } from './styled'

const bitrixLink = 'https://bitrix24public.com/quidox.bitrix24.by/form/10_mts_smartdoc_zapros_klyucha_dlya_podklyucheniya_po_api/rsva1h/'

const continueTariff = () => {
  try {
    let auth = window.localStorage.getItem('authToken') || 'Bearer ' + window.sessionStorage.getItem('authToken')
    axios.get(`${process.env.REACT_APP_BASE_URL}/mts/service/continue`, {
      headers: {
        'Authorization': 'Bearer ' + auth
      }
    })
      .then(() => {
        message.success('Тариф успешно продлен.')
        window.location.reload()
      })
      .catch(error => {
        message.error('Вам недоступно продление тарифа!')
      })
  } catch (error) {
    notification['error']({
      message: error.message
    })
  }
}

export default ({ data }) => (
  <Layout>
    <Layout.List>
      <Layout.Item>
        <Layout.Item.Title>Наименование компании:</Layout.Item.Title>
        <Layout.Item.Value>{data.name}</Layout.Item.Value>
      </Layout.Item>

      <Layout.Item>
        <Layout.Item.Title>УНП:</Layout.Item.Title>
        <Layout.Item.Value>{data.company_number}</Layout.Item.Value>
      </Layout.Item>

      <Layout.Item>
        <Layout.Item.Title>Адрес:</Layout.Item.Title>
        <Layout.Item.Value>{data.description}</Layout.Item.Value>
      </Layout.Item>

      <Layout.Item>
        <Layout.Item.Title>Дата регистрации:</Layout.Item.Title>
        <Layout.Item.Value>{moment.utc(data.registration_date, 'YYYY-MM-DD').local().format('DD MMMM YYYY')}</Layout.Item.Value>
      </Layout.Item>

      <Layout.Item>
        <Layout.Item.Title>Баланс:</Layout.Item.Title>
        <Layout.Item.Value primary>{data.balance} BYN</Layout.Item.Value>
      </Layout.Item>
    </Layout.List>

    <Layout.Actions>
      <Button
        type='primary'
        onClick={() => window.open(bitrixLink, '_blank')}
        ghost
      >
        Запросить ключ для подключения по API
      </Button>

      {data.co_brand_id !== null && (
        <Button
          type='primary'
          onClick={continueTariff}
          disabled={(data.is_owner === true && data.tariff_was_expired === true) ? '' : 'disabled'}
          ghost
        >
          Продлить тариф
        </Button>)}
    </Layout.Actions>
  </Layout>
)
