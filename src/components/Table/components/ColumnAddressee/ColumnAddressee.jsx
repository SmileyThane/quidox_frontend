import React from 'react'
import { Link } from 'react-router-dom'

import { Column } from './styled'

export default ({
  status,
  record
}) => (
  <Column>
    {(status === 1 || status === 3 || status === 9 || status === 10) ? (
      <Link to={`/documents/${record.id}`}>
        {record.recipient && (
          <>
            <Column.Email>{record.recipient['user_email']}</Column.Email>
            <Column.Company>{record.recipient['company_name']}</Column.Company>
          </>)}
      </Link>
    ) : (
      <Link to={`/documents/${record.id}`}>
        {record.sender && (
          <>
            <Column.Email>{record.sender['user_email']}</Column.Email>
            <Column.Company>{record.sender['company_name']}</Column.Company>
          </>)}
      </Link>
    )}
  </Column>
)
