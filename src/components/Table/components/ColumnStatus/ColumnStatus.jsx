import React from 'react'

import { Column } from './styled'

export default ({ status }) => (
  <Column status={status ? 'signed' : 'notSigned'}>
    {status ? 'ЭЦП 1' : 'Не подписан'}
  </Column>
)
