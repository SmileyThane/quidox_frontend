import React from 'react'

import { Tooltip } from 'antd'

import { Column } from './styled'

export default ({
  onDownloadPDF,
  onDownloadXml
}) => (
  <Column>
    <Column.Item>
      <Tooltip
        title='Скачать квитанцию'
        placement='topRight'
        arrowPointAtCenter
      >
        <Column.Download onClick={onDownloadPDF}>
          PDF
        </Column.Download>
      </Tooltip>
    </Column.Item>

    <Column.Item>
      <Tooltip
        title='Скачать квитанцию'
        placement='topRight'
        arrowPointAtCenter
      >
        <Column.Download onClick={onDownloadXml}>
          XML
        </Column.Download>
      </Tooltip>
    </Column.Item>
  </Column>
)
