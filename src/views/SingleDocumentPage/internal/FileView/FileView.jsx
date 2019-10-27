import React from 'react'

import { Tooltip, Icon } from 'antd'

const FileView = () => {
  return (
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
  )
}

export default FileView
