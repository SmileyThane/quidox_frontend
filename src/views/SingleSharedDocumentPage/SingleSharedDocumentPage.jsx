import React, { useEffect, useState, Fragment } from 'react'
import axios from 'axios'
import moment from 'moment'

import {
  List,
  Tag,
  Typography
} from 'antd'

import './SingleDocumentPage.scss'

const { Text, Paragraph } = Typography

const SingleSharedDocumentPage = props => {
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const { id, code } = props.match.params
    axios.get(`${process.env.REACT_APP_BASE_URL}/document/${id}/shared/${code}`)
      .then(({ data }) => {
        if (data.success) {
          setMessage(data.data)
        }
      })
  }, [])

  const getEcpCount = (arr = []) => {
    if (arr.length) {
      let acpCount = arr.filter(i => i.verification_hash !== null)
      return acpCount.length
    }
  }

  // const { document, sender, recipient, statuses } = message
  console.log(message)
  return (
    <Fragment>
      {message && Object.keys(message).length &&
      <div className='content'>
        <div className='document'>
          <div className='document__header'>
            <div className='document__header_left'>

              {(message.statuses && message.statuses.length && message.statuses[0].user_company_document_list_id === 1)
                ? <Paragraph
                  className='document-title'
                >
                  {message.document && message.document.name}
                </Paragraph>
                : <h2 className='document__title'>{message.document && message.document.name}</h2>
              }
            </div>

            <div className='document__header_right'>
              <p className='document__date'>
                {moment.utc(message.created_at, 'YYYY-MM-DD HH:mm:ss').local().format('DD/MM/YYYY HH:mm:ss')}
              </p>
            </div>
          </div>
          <div className='document__content'>
            <div className='document__info info'>
              <div className='info__item'>
                <div className='info__title'>Получатели</div>
                <div className='info__content'>
                  {message.recipient &&
                  <div style={{ padding: '.5rem 0' }}>
                    <Text>{message.recipient['user_email']}</Text>
                    <br />
                    <Text>{`[ ${message.recipient['company_name']} ]`}</Text>
                  </div>
                  }
                </div>
              </div>

              <div className='info__item'>
                <div className='info__title'>Отправители</div>
                <div className='info__content'>
                  {message.sender &&
                  <div>
                    <Text>{message.sender.user_email}</Text>
                    <br />
                    <Text>{`[ ${message.sender.company_name} ]`}</Text>
                  </div>
                  }
                </div>
              </div>

              <div className='info__item'>
                <div className='info__title'>Комментарий</div>
                {(message.statuses && message.statuses.length && message.statuses[0].user_company_document_list_id === 1)
                  ? <Paragraph
                    className='info__content'
                  >
                    {message.document && message.document.description}
                  </Paragraph>
                  : <div className='info__content'>{message.document && message.document.description}</div>
                }
              </div>
            </div>
            <div className='document__attached-doc attached-doc'>
              <List
                itemLayout='horizontal'
                locale={{ emptyText: 'Нет приложенных документов' }}
                dataSource={message.document && message.document.attachments}
                style={{ maxHeight: '20rem', overflowY: 'scroll' }}
                renderItem={(item, index) => (
                  <List.Item key={item.id}
                  >
                    <div className='single-document'>

                      <p style={{ marginRight: 10 }} className='single-document__name'>{item.name}</p>

                      {getEcpCount(item.users_companies) > 0 &&
                      <Tag
                        color='#3278fb'
                        style={{ cursor: 'pointer' }}
                      >
                        ЭЦП {getEcpCount(item.users_companies)}
                      </Tag>
                      }

                      {item.status &&
                      <Tag color={item.status.status_data.color}>{item.status.status_data.name}</Tag>
                      }
                    </div>
                  </List.Item>
                )}
              />
            </div>
          </div>
        </div>
      </div>
      }
    </Fragment>
  )
}

export default SingleSharedDocumentPage
