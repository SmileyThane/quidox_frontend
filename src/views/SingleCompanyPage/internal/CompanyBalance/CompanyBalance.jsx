import React from 'react'
import axios from 'axios'

import {
  message,
  notification,
  Typography
} from 'antd'

import { Button } from '../../../../components'

import {
  Layout,
  List
} from './styled'

const {
  Paragraph,
  Title
} = Typography

const monthlyPlans = [
  {
    tarificationId: 4,
    name: 'Лайт',
    amount: 20,
    count: 100,
    link: 'https://drive.google.com/file/d/1FhMcgVpoyr-ZJUWmSKvPC0r_Lqtj1Lkb/view?usp=sharing'
  },
  {
    tarificationId: 5,
    name: 'Стандарт',
    amount: 150,
    count: 1000,
    link: 'https://drive.google.com/file/d/1Y3mPGOfUTW6L07gSnkX03dIuiem4M9tl/view?usp=sharing'
  },
  {
    tarificationId: 3,
    name: 'Про',
    amount: 750,
    count: 10000,
    link: 'https://drive.google.com/file/d/1cDj6qA4gnOD2Bt6qO8ewr2tf6zFUWj1Z/view?usp=sharing'
  }
]

const yearPlans = [
  {
    tarificationId: 15,
    name: 'Год.600',
    amount: 120,
    count: 600,
    link: 'https://drive.google.com/file/d/1MY9Jex1oa-bMzpdcmL5BWdV7PeoZjzUP/view?usp=sharing'
  },
  {
    tarificationId: 16,
    name: 'Год.1200',
    amount: 180,
    count: 1200,
    link: 'https://drive.google.com/file/d/1NicPdGqc08gsK25TsY-4-OeKCPtB4mFJ/view?usp=sharing'
  },
  {
    tarificationId: 17,
    name: 'Год.Стандарт',
    amount: 1350,
    count: 12000,
    link: 'https://drive.google.com/file/d/1qhiEGsB62CjIDGyokJZmCJflGjwskiUM/view?usp=sharing'
  }
]

export default () => {
  const handleMakeOrder = (cost, paymentType, comment, tariffId = null) => {
    try {
      const data = {
        payment_type_id: paymentType,
        currency_id: 1,
        order_data: 'qwertyu',
        config_id: '1',
        tarification_id: tariffId,
        comment,
        cost
      }

      const auth = window.localStorage.getItem('authToken') || 'Bearer ' + window.sessionStorage.getItem('authToken')

      axios.post(`${process.env.REACT_APP_BASE_URL}/orders`, data, {
        headers: {
          'Authorization': 'Bearer ' + auth
        }
      })
        .then(() => {
          message.success('Заказ успешно оформлен.')

          setTimeout(window.location.reload(), 2000)
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

  return (
    <Layout>
      <Layout.Inner>
        <Title level={3}>Пакеты услуг со сроком действия календарный месяц</Title>
        <Paragraph>Пример: оплачено 02 января 2021 года – действует до 31 января 2021 года или до расходования доступного лимита отправок/перенаправлений (что наступит ранее). Остаток неиспользованных действий на следующий календарный месяц не переносится.</Paragraph>

        <List>
          {monthlyPlans.map((item, i) => (
            <List.Item key={i}>
              <List.Item.Name>{item.name}</List.Item.Name>

              <List.Item.Amount>
                {item.amount} <span>BYN</span>
              </List.Item.Amount>

              <List.Item.Count>
                {item.count} <span>отправок</span>
              </List.Item.Count>

              <Button
                type='primary'
                onClick={() => handleMakeOrder(item.amount, 1, `Пополнить на ${item.amount} BYN`, item.tarificationId)}
              >
                Пополнить счет
              </Button>

              <Button
                type='link'
                href={item.link}
                target='_blank'
              >
                Скачать счет
              </Button>
            </List.Item>
          ))}
        </List>
      </Layout.Inner>

      <Layout.Inner>
        <Title level={3}>Пакеты услуг со сроком действия до 31.12.2021г.</Title>
        <Paragraph>Пример: оплачено 02 января 2021 года – действует в течение 12 календарных месяцев, включая месяц активации года или до расходования доступного лимита отправок/перенаправлений (что наступит ранее). Гибкое расходование на ежемесячные отправки в пределах доступного общего лимита и срока действия пакета услуг.</Paragraph>

        <List>
          {yearPlans.map((item, i) => (
            <List.Item key={i}>
              <List.Item.Name>{item.name}</List.Item.Name>

              <List.Item.Amount>
                {item.amount} <span>BYN</span>
              </List.Item.Amount>

              <List.Item.Count>
                {item.count} <span>отправок</span>
              </List.Item.Count>

              <Button
                type='primary'
                onClick={() => handleMakeOrder(item.amount, 1, `Пополнить на ${item.amount} BYN`, item.tarificationId)}
              >
                Пополнить счет
              </Button>

              <Button
                type='link'
                href={item.link}
                target='_blank'
              >
                Скачать счет
              </Button>
            </List.Item>
          ))}
        </List>
      </Layout.Inner>

      <Paragraph>Консультации по выбору оптимального пакета услуг с учетом Ваших потребностей: +375 29 647-25-25, +375 33 647-25-25, ask@quidox.by</Paragraph>
    </Layout>
  )
}
