import React from 'react'

import { message, notification, Typography } from 'antd'
import { Button } from '../../../../components'

import './CompanyDescription.scss'
import axios from 'axios'

const { Text } = Typography

const bitrixLink = 'https://bitrix24public.com/quidox.bitrix24.by/form/10_mts_smartdoc_zapros_klyucha_dlya_podklyucheniya_po_api/rsva1h/'

const continueTariff = () => {
  try {
    let auth = window.localStorage.getItem('authToken') || 'Bearer ' + window.sessionStorage.getItem('authToken')
    axios.get(`${process.env.REACT_APP_BASE_URL}/mts/service/continue`, {
      headers: {
        'Authorization': 'Bearer ' + auth
      }
    })
      .then(({}) => {
        message.success('Тариф успешно продлен.')
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

const CompanyDescription = props => {

  const { data } = props

  return (
    <div className='company-data'>
      <div className='company-data-group'>
        <Text className='company-data-title'>Наименование компании: </Text>
        <div className='company-data-content'>{data.name}</div>
      </div>

      <div className='company-data-group'>
        <Text className='company-data-title'>УНП: </Text>
        <div className='company-data-content'>{data.company_number}</div>
      </div>

      <div className='company-data-group'>
        <Text className='company-data-title'>Адрес: </Text>
        <div className='company-data-content'>{data.description}</div>
      </div>

      <Button
        type='primary'
        ghost
        onClick={() => window.open(bitrixLink, '_blank')}>
        Запросить ключ для подключения по API
      </Button>
      <br/>
      <br/>
      {data.co_brand_id !== null &&
      <Button
        disabled={!(data.is_owner === false && data.tariff_was_expired === false) }
        type='primary'
        ghost
        onClick={continueTariff}>
        Продлить тариф
      </Button>
      }

    </div>
  )
}

export default CompanyDescription
