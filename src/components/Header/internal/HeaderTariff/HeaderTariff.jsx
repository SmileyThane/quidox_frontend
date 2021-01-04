import React, { useEffect, useState } from 'react'
import moment from 'moment'

import { getActiveCompany } from '../../../../utils'

import { Tariff } from './styled'

const HeaderTariff = ({
  user: {
    data
  }
}) => {
  const [activeCompany, setActiveCompany] = useState(null)

  useEffect(() => {
    if (data) {
      setActiveCompany(data.hasOwnProperty('companies') && getActiveCompany(data))
    }
  }, [data])

  return (
    <Tariff>
      <Tariff.Item>
        <Tariff.Item.Label>Действий:</Tariff.Item.Label>

        <Tariff.Item.Value>
          {activeCompany ? activeCompany.tarification.max_actions : 0}
        </Tariff.Item.Value>
      </Tariff.Item>

      <Tariff.Item>
        <Tariff.Item.Label>До окончания осталось:</Tariff.Item.Label>

        <Tariff.Item.Value>
          {`${activeCompany ? moment(activeCompany.tarification.expired_at).diff(moment(), 'days') : 0} дней`}
        </Tariff.Item.Value>
      </Tariff.Item>
    </Tariff>
  )
}

export default HeaderTariff
