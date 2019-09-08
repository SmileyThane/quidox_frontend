import React, { Fragment } from 'react'

import { Typography } from 'antd'

import './CompanyDescription.scss'

const { Text } = Typography

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
    </div>
  )
}

export default CompanyDescription
