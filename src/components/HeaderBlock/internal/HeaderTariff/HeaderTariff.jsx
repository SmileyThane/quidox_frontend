import React from 'react'

import { Typography, Tooltip, Tag } from 'antd'
import { Tariff } from './styled'
import { getActiveCompany } from '../../../../utils'
import { User } from '../HeaderUser/styled'

const { Text } = Typography
const HeaderTariff = ({ user: { data } }) => {
  const activeCompany = data.hasOwnProperty('companies') && getActiveCompany(data)
  return (
    <Tariff>
      <Tariff.Item>
        Тариф:

        <Tariff.TagSpan>
          {activeCompany && activeCompany.tarification.tarification_data.name}
        </Tariff.TagSpan>
      </Tariff.Item>

      <Tariff.Item>
        Доступно действий:

        <Tariff.TagSpan>
          {activeCompany && activeCompany.tarification.max_actions}
        </Tariff.TagSpan>
      </Tariff.Item>

      <Tariff.Item>
        Баланс (BYN):

        <Tariff.TagSpan>
          {activeCompany && activeCompany.company_data.balance}
        </Tariff.TagSpan>
      </Tariff.Item>

      <Tooltip
        title={activeCompany && activeCompany.company_data.name}
        arrowPointAtCenter
      >
        <Tariff.Tag
          color='#87d068'
        >
          { +activeCompany.company_number === 0
            ? activeCompany.company_name
            : (`УНП: ${activeCompany.company_number}`)
          }
        </Tariff.Tag>
      </Tooltip>
    </Tariff>
  )
}

export default HeaderTariff
