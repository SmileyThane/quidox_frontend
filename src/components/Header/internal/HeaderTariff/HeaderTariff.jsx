import React, { useEffect, useState } from 'react'

import { Tooltip } from 'antd'
import { Tariff } from './styled'
import { getActiveCompany } from '../../../../utils'

const defaultState = {
  activeCompany: null
}

const HeaderTariff = ({ user: { data } }) => {
  const [state, setState] = useState({ ...defaultState })

  useEffect(() => {

    if (data) {
      setState({
        ...state,
        activeCompany: data.hasOwnProperty('companies') && getActiveCompany(data)
      })
    }
  }, [data])

  const { activeCompany } = state

  const coBrand = data.co_brand_config && data.co_brand_config
  return (
    <Tariff>
      <Tariff.Item>
        Тариф:

        <Tariff.TagSpan brand={coBrand}>
          {activeCompany && activeCompany.tarification.tarification_data.name}
        </Tariff.TagSpan>
      </Tariff.Item>

      <Tariff.Item>
        Доступно действий:

        <Tariff.TagSpan brand={coBrand}>
          {activeCompany && activeCompany.tarification.max_actions}
        </Tariff.TagSpan>
      </Tariff.Item>
      {!coBrand &&
        <Tariff.Item>
          Баланс (BYN):

          <Tariff.TagSpan brand={coBrand}>
            {activeCompany && activeCompany.company_data.balance}
          </Tariff.TagSpan>
        </Tariff.Item>
      }

      <Tooltip
        title={activeCompany && activeCompany.company_data.name}
        arrowPointAtCenter
      >
        {activeCompany &&
          <Tariff.Tag
            color='#87d068'
          >
            { activeCompany && +activeCompany.company_number === 0
              ? activeCompany.company_name
              : (`УНП: ${activeCompany.company_number}`)
            }
          </Tariff.Tag>
        }
      </Tooltip>
    </Tariff>
  )
}

export default HeaderTariff
