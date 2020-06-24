import React from 'react'

import { Typography } from 'antd'
import { Button } from '../../../../components'

import './CompanyDescription.scss'

const { Text } = Typography

const bitrixLink = 'https://bitrix24public.com/quidox.bitrix24.by/form/10_mts_smartdoc_zapros_klyucha_dlya_podklyucheniya_po_api/rsva1h/'

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
    </div>
  )
}

export default CompanyDescription
