import React, { Fragment } from 'react'

import { Typography, Button } from 'antd'
import {
  pdf20,
  pdf100,
  pdf500,
  pdf1000
} from '../../../../resources/pdf'

import './CompanyBalance.scss'

const { Title, Text } = Typography

const CompanyBalance = ({ balance }) => {
  return (
    <Fragment>
      <div className='balance-header'>
        <Title level={3}>
          Пополнить баланс
        </Title>

        <Title level={3}>
          {`Текущее состояние баланса: ${balance} BYN`}
        </Title>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <Text>
          Активация заказанной услуги происходит одновременно со списанием ее стоимости с баланса Заказчика. По окончании
          срока действия активированной услуги, будет произведено автоматическое ее продление с одновременным списанием средств
          с баланса Заказчика. При недостаточности средств на балансе, его необходимо предварительно пополнить. Первичная
          активация или продление услуги при недостаточном количестве средств на балансе невозможно.
        </Text><br /><br />

        <Text>
          В настоящее время пополнение возможно платежным поручением на Р/с Исполнителя. Скоро будет доступно пополнение
          через ЕРИП и банковской картой.
        </Text><br /><br />

        <Text>
          Для пополнения баланса выберите и сохраните для оплаты один из ниже расположенных счетов:
        </Text>
        <div className='balance-links' style={{ marginTop: '1rem' }}>
          <div className='balance-links-item'>
            <Text>Пополнить на 20 BYN</Text>
            <Button
              type='link'
              onClick={() => window.open(pdf20, '_blank')}
            >Скачать счет</Button>
          </div>

          <div className='balance-links-item'>
            <Text>Пополнить на 100 BYN</Text>

            <Button
              type='link'
              onClick={() => window.open(pdf100, '_blank')}
            >
              Скачать счет
            </Button>
          </div>

          <div className='balance-links-item'>
            <Text>Пополнить на 500 BYN</Text>

            <Button
              type='link'
              onClick={() => window.open(pdf500, '_blank')}
            >
              Скачать счет
            </Button>
          </div>

          <div className='balance-links-item'>
            <Text>Пополнить на 1000 BYN</Text>

            <Button
              type='link'
              onClick={() => window.open(pdf1000, '_blank')}
            >
              Скачать счет
            </Button>
          </div>
        </div><br />

        <Text>
          После зачисления платежа на наш расчетный счет служба поддержки проверит его назначение и откорректирует состояние
          баланса Вашей организации.
        </Text><br />

        <Text>
          Благодарим Вас за сотрудничество!
        </Text>
      </div>
    </Fragment>
  )
}

export default CompanyBalance
