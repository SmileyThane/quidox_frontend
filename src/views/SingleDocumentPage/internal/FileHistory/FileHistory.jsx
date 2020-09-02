import React from 'react'
import { Typography } from 'antd'

const { Text } = Typography

export default function ({ history }) {
  console.log(history)
  return (
    <div style={{ marginBottom: '2rem' }}>{history.map((item, idx) => (
      <div key={idx}>
        {item.status.map((status, i) => (
          <div key={i}>
            <Text>{status.status_data.name}</Text>
          </div>
        ))}
      </div>
    ))}</div>
  )
}
