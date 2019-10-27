import React, { Fragment } from 'react'

import { Tooltip, Icon } from 'antd'
import { PDF } from './styled'

const FileView = ({ file }) => {
  return (
    <Fragment>
      <Tooltip
        title='Просмотреть содержимое файла'
        placement='top'
        arrowPointAtCenter
      >
        <Icon
          type='eye'
          style={{ color: '#3278fb', marginRight: 10, fontSize: 20 }}
        />
      </Tooltip>
      <PDF />
    </Fragment>
  )
}

export default FileView
