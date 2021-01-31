import React from 'react'

import { Column } from './styled'

export default ({ files }) => (
  <Column>
    {files.length === 0 ? (
      <Column.Empty>Нет вложений</Column.Empty>
    ) : (
      <Column.Count>{files.length}</Column.Count>
    )}
  </Column>
)
