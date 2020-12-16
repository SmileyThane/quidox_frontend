import React, { useEffect, useState } from 'react'
import moment from 'moment'

import { decryptionData } from '../../utils'
import { Typography, Icon } from 'antd'
import { Button } from '../'
import { EscData } from './styled'

const { Text } = Typography

const defaultState = {
  singleEscData: {},
  activeEscSlide: 0
}

const EscDataSlider = ({ data = [], onCancel, }) => {
  const [state, setState] = useState({ ...defaultState })

  const { singleEscData, activeEscSlide } = state

  useEffect(() => {
    setState({
      ...state,
      singleEscData: decryptionData(data[activeEscSlide])
    })
  }, [activeEscSlide])

  const getPrevCert = () => {
    if (activeEscSlide === 0) {
      return null
    }

    setState({
      ...state,
      activeEscSlide: activeEscSlide - 1
    })
  }

  const getNextCert = () => {
    if (activeEscSlide === data.length - 1) {
      return
    }

    setState({
      ...state,
      activeEscSlide: activeEscSlide + 1
    })
  }

  return (
    <EscData>
      <EscData.Head>
        <Text strong> Просмотр ЭЦП,
          {activeEscSlide + 1} из {data.length}
        </Text>

        <EscData.Arrow onClick={getPrevCert}>
          <Icon type='left' />
        </EscData.Arrow>

        <EscData.Arrow onClick={getNextCert}>
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
                УНП: {singleEscData.unp && singleEscData.unp}
              </Text>
            </EscData.BodyItemRightCert>

            <EscData.BodyItemRightCert>
              <Text type='secondary'>
                Организация: {singleEscData.org && singleEscData.org}
              </Text>
            </EscData.BodyItemRightCert>

            <EscData.BodyItemRightCert>
              <Text type='secondary'>
                Должность: {singleEscData.position && singleEscData.position}
              </Text>
            </EscData.BodyItemRightCert>

            <EscData.BodyItemRightCert>
              <Text type='secondary'>
                ФИО: {singleEscData.name && singleEscData.name}
              </Text>
            </EscData.BodyItemRightCert>

            <EscData.BodyItemRightCert>
              <Text type='secondary'>
                Адрес: {singleEscData.address && singleEscData.address}
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
              <Text type='secondary'>
                {singleEscData.validity_from && singleEscData.validity_from}
              </Text>
            </EscData.BodyItemRightCert>

            <EscData.BodyItemRightCert>
              <Text type='secondary'>
                {singleEscData.validity_to && singleEscData.validity_to}
              </Text>
            </EscData.BodyItemRightCert>
          </EscData.BodyItemRight>
        </EscData.BodyItem>

        <EscData.BodyItem>
          <EscData.BodyItemLeft>
            <Text type='secondary'>Дата создания ЭЦП</Text>
          </EscData.BodyItemLeft>

          <EscData.BodyItemRight>
            <EscData.BodyItemRightCert>
              <Text type='secondary'>
                {moment.utc(data[activeEscSlide].verification_date, 'YYYY-MM-DD HH:mm:ss')
                  .format('DD/MM/YYYY HH:mm:ss')}
              </Text>
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

      <Button
        type='primary'
        ghost
        onClick={onCancel}
      >Закрыть
      </Button>
    </EscData>
  )
}

export default EscDataSlider
