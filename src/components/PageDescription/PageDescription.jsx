import React, { Fragment } from 'react'

import { Typography } from 'antd'
import './PageDescription.scss'

const { Title, Text } = Typography

const PageDescription = ({ isVisible = false, title = '', text = [] }) => {
  return (
    <Fragment>
      {isVisible &&
      <div className='page-description'>
        <Title level={3}>{title}</Title>
        {text.map(i => <Text>{i}<br /></Text>)}
      </div>
      }
    </Fragment>
  )
}

export default PageDescription
