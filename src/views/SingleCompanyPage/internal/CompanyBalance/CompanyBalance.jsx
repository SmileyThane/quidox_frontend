import React, { Fragment } from 'react'

import { message, notification, Typography } from 'antd'
import { pdf100, pdf1000, pdf20, pdf500 } from '../../../../resources/pdf'

import { Button } from '../../../../components'

import './CompanyBalance.scss'
import axios from 'axios'

const { Title, Text } = Typography

const makeOrder = () => (cost, paymentType, comment, tariffId = null) => {
  try {
    let data = {
      'cost': cost,
      'payment_type_id': paymentType,
      'currency_id': 1,
      'order_data': 'qwertyu',
      'comment': comment,
      'config_id': '1',
      'tarification_id': tariffId
    }
    let auth = window.localStorage.getItem('authToken') || 'Bearer ' + window.sessionStorage.getItem('authToken')
    axios.post(`${process.env.REACT_APP_BASE_URL}/orders`, data, {
      headers: {
        'Authorization': 'Bearer ' + auth
      }
    })
      .then(({}) => {
        message.success('Заказ успешно оформлен.')
        window.location.reload()
      })
      .catch(error => {
        message.error('Ошибка оформления заказа!')
      })
  } catch (error) {
    notification['error']({
      message: error.message
    })
  }
}

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
          Активация заказанной услуги происходит одновременно со списанием ее стоимости с баланса Заказчика. По
          окончании
          срока действия активированной услуги, будет произведено автоматическое ее продление с одновременным списанием
          средств
          с баланса Заказчика. При недостаточности средств на балансе, его необходимо предварительно пополнить.
          Первичная
          активация или продление услуги при недостаточном количестве средств на балансе невозможно.
        </Text><br/><br/>

        <Text>
          В настоящее время пополнение возможно платежным поручением на Р/с Исполнителя. Скоро будет доступно пополнение
          через ЕРИП и банковской картой.
        </Text><br/><br/>

        <Text>
          Для пополнения баланса выберите и сохраните для оплаты один из ниже расположенных счетов:
        </Text>
        <div className='balance-links' style={{ marginTop: '1rem' }}>
          <div className='balance-links-item'>
            <Text>Пополнить на 20 BYN</Text>
            <Button
              type='link'
              onClick={makeOrder(20, 2, 'Пополнить на 20 BYN')}
            >Пополнить счет</Button>

            <Button
              type='link'
              onClick={() => window.open(pdf20, '_blank')}
            >Скачать счет</Button>
          </div>

          <div className='balance-links-item'>
            <Text>Пополнить на 100 BYN</Text>

            <Button
              type='link'
              onClick={makeOrder(100, 2, 'Пополнить на 100 BYN')}
            >Пополнить счет</Button>

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
              onClick={makeOrder(500, 2, 'Пополнить на 500 BYN')}
            >Пополнить счет</Button>

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
              onClick={makeOrder(1000, 2, 'Пополнить на 1000 BYN')}
            >Пополнить счет</Button>

            <Button
              type='link'
              onClick={() => window.open(pdf1000, '_blank')}
            >
              Скачать счет
            </Button>
          </div>
        </div>
        <br/>
        <div>
          <Button
            type='link'
            onClick={makeOrder(0, 2, 'Оплата картой', 2)}
          >Подключить Легкий Старт! (карта)</Button>

          <Button
            type='link'
            onClick={makeOrder(0, 1, 'Оплата балансом', 2)}
          >Подключить Легкий Старт! (баланс)</Button>
        </div>
        <br/>
          <Text>
            После зачисления платежа на наш расчетный счет служба поддержки проверит его назначение и откорректирует
            состояние
            баланса Вашей организации.
          </Text><br/>

          <Text>
            Благодарим Вас за сотрудничество!
          </Text>
      </div>
    </Fragment>
)
}

export default CompanyBalance
