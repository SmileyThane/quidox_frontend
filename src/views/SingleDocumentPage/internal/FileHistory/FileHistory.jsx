import React from 'react'
import { Typography, Tag } from 'antd'

const { Text } = Typography

export default function ({ history }) {
  console.log(history)
  return (
    <div style={{ marginBottom: '2rem' }}>{history.map((item, idx) => (
      <div key={idx}>
        <Text>{item.users_companies_data.user_email}<br/>[{ item.users_companies_data.company_name}]</Text>
        {item.status.map((status, i) => (
          <div key={i} style={{ padding: '0.5rem', marginBottom: '0.5rem' }}>
            <Tag color={status.status_data.color}>{status.status_data.name}</Tag><br/><br/>
            <Text strong>Комментарий:</Text><br/>
            <Text secondary>{status.comment && status.comment}123</Text><br/><br/>
            {status.comment_link_basename && status.comment_link_basename !== ''
              ? <>
                <Text strong>Прикрепленный файл:</Text><br/>
                <a href={status.comment_link}>status.comment_link_basename</a>
              </>
              : <Text strong>Ссылка отсутствует</Text>
            }
          </div>
        ))}
        <hr/>
      </div>
    ))}</div>
  )
}
