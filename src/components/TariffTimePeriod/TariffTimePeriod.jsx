import React, { useState } from 'react'
import moment from 'moment'
import { Statistic, Icon, Typography } from 'antd'

import { Button } from '../'

import './TariffTimePeriod.scss'

const { Text } = Typography
const { Countdown } = Statistic;

export default function ({ user: { data }, config }) {
  const [isVisible, setVisible] = useState(true)
  const expired_at = Object.keys(data).length  && data.active_company_object.tarification.expired_at
  const smartdocUri = config.data.co_brand_config && config.data.co_brand_config.logout_uri
  console.log(data)
  return (
    <div className='c-period'>
      {isVisible ?
        <div className='c-period__content'>
          <Countdown title='До окончания действующего пакета услуг осталось' value={moment(expired_at)} format="D дней" />
          <div className='c-period__links'>
            <Button onClick={() => window.open(`${smartdocUri}/services`, '_self')} type='link'>Подключить новый пакет услуг.</Button>
            <Button onClick={() => window.open(`${smartdocUri}/free-functional`, '_self')} type='link'>Что будет, если я не приобрету ни один из пакетов?</Button>
          </div>
          <Icon onClick={() => setVisible(false)} className='c-period__close' type="fullscreen-exit" />
        </div>
        : <Button onClick={() => setVisible(true)} type='primary' icon='fullscreen'>Срок действия тарифа</Button>}
    </div>
  )
}
