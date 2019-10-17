import React, { useEffect, useState } from 'react'

import { Typography, Icon } from 'antd'
import {
  EscData
} from './styled'
import moment from 'moment'

const { Text } = Typography

const defaultState = {
  escDataArray: [],
  singleEscData: {},
  activeEscData: 0
}

const EscDataSlider = ({ data }) => {
  const [state, setState] = useState({ ...defaultState })

  useEffect(() => {
    setState({
      ...state,
      escDataArray: data
    })
  }, [])

  const { singleEscData } = state
  console.log('state', state)
  return (
    <EscData>
      <EscData.Head>
        <Text strong> Просмотр ЭЦП,
          № {1} из {1}
        </Text>

        <EscData.Arrow>
          <Icon type='left' />
        </EscData.Arrow>

        <EscData.Arrow>
          <Icon type='right' />
        </EscData.Arrow>
      </EscData.Head>

      <EscData.Body>
        <EscData.BodyItem>
          <EscData.BodyItemLeft>
            <Text type='secondary'>Данные из сертификата ЭЦП</Text>
          </EscData.BodyItemLeft>

          <EscData.BodyItemRight>
            <EscData.BodyItemRightCert>
              <Text type='secondary'>
                УНП: {singleEscData.unp ? singleEscData.unp : 'Данные отсутствуют'}
              </Text>
            </EscData.BodyItemRightCert>

            <EscData.BodyItemRightCert>
              <Text type='secondary'>
                Организация: {singleEscData.org ? singleEscData.org : 'Данные отсутствуют'}
              </Text>
            </EscData.BodyItemRightCert>

            <EscData.BodyItemRightCert>
              <Text type='secondary'>
                Должность: {singleEscData.position ? singleEscData.position : 'Данные отсутствуют'}
              </Text>
            </EscData.BodyItemRightCert>

            <EscData.BodyItemRightCert>
              <Text type='secondary'>
                ФИО: {singleEscData.name ? singleEscData.name : 'Данные отсутствуют'}
              </Text>
            </EscData.BodyItemRightCert>

            <EscData.BodyItemRightCert>
              <Text type='secondary'>
                Адрес: {singleEscData.address ? singleEscData.address : 'Данные отсутствуют'}
              </Text>
            </EscData.BodyItemRightCert>
          </EscData.BodyItemRight>
        </EscData.BodyItem>

        <EscData.BodyItem>
          <EscData.BodyItemLeft>
            <Text type='secondary'>Срок действия сертификата</Text>
          </EscData.BodyItemLeft>

          <EscData.BodyItemRight>
            <EscData.BodyItemRightCert>
              {singleEscData.validity_from
                ? <Text type='secondary'>{singleEscData.validity_from}</Text>
                : <Text type='secondary'>Нет данных</Text>
              }
            </EscData.BodyItemRightCert>

            <EscData.BodyItemRightCert>
              {singleEscData.validity_to
                ? <Text type='secondary'>{singleEscData.validity_to}</Text>
                : <Text type='secondary'>Нет данных</Text>
              }
            </EscData.BodyItemRightCert>
          </EscData.BodyItemRight>
        </EscData.BodyItem>

        <EscData.BodyItem>
          <EscData.BodyItemLeft>
            <Text type='secondary'>Дата создания ЭЦП</Text>
          </EscData.BodyItemLeft>

          <EscData.BodyItemRight>
            <EscData.BodyItemRightCert>
              <Text type='secondary'>123</Text>
            </EscData.BodyItemRightCert>
          </EscData.BodyItemRight>
        </EscData.BodyItem>
      </EscData.Body>

      <EscData.Footer>
        <Text>
          <strong>&#10003; Проверка Сертификата, СОС: Пройдена</strong><br />
        </Text>

        <Text>
          <strong>&#10003; Проверка Сигнатуры: Пройдена</strong>
        </Text>
      </EscData.Footer>
    </EscData>
  )
}

export default EscDataSlider
