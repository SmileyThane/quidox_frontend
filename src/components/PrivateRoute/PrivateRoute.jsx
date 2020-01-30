import React, { Fragment, useEffect, useState } from 'react'
import { Redirect, Route } from 'react-router-dom'

import history from '../../history'
import { api } from '../../services'
import { Layout, Modal, Button } from 'antd'
import { getActiveCompany, checkActiveTariff } from '../../utils'
import { LayoutBlock, HeaderBlock, SiderBlock, ContentBlock, FooterBlock } from '../'

const PrivateRoute = ({ component: Component, user: { data }, getUser, getTariffications, ...rest }) => {
  const [availableTariff, setAvailableTariff] = useState(false)
  const [activeCompany, setActiveCompany] = useState(null)
  // eslint-disable-next-line spaced-comment
  const isIE = /*@cc_on!@*/false || !!document.documentMode
  const authToken = window.localStorage.getItem('authToken') || window.sessionStorage.getItem('authToken');
  useEffect(() => {
    if (authToken) {
      getUser()
      getTariffications()
      if (isIE) {
        setTimeout(() => {
          window.pluginLoaded()
        }, 1500)
      }
    }
  }, [getUser, isIE])

  useEffect(() => {
    if (data) {
      setActiveCompany(data.hasOwnProperty('companies') && getActiveCompany(data))
    }
  }, [data])

  useEffect(() => {
    if (activeCompany && Object.keys(activeCompany).length) {
      setAvailableTariff(checkActiveTariff(activeCompany.tarification))
    }
  }, [activeCompany && Object.keys(activeCompany).length])

  const handleChangeTariff = () => {
    history.push(history.push(`/companies/${activeCompany.company_id}`))
    setAvailableTariff(false)
    // api.user.changeTariff({ company_id: activeCompany.company_id, tarification_id: 1 })
    //   .then(({ data }) => {
    //   })
  }

  return <Route {...rest}
    render={props =>
      window.localStorage.getItem('authToken')
        ? <Fragment>
          <LayoutBlock content>
            <HeaderBlock />
            <Layout>
              <SiderBlock />
              <Layout>
                <ContentBlock>
                  <Component {...props} />
                </ContentBlock>
                <FooterBlock />
              </Layout>
            </Layout>
          </LayoutBlock>
          {availableTariff &&
            <Modal
              visible
              footer={null}
              closable={false}
            >
              Внимание! Недостаточно средств на Вашем балансе и
              мы не можем активировать очередной пакет услуг.
              Чтобы продолжить пользование сервисом пополните, пожалуйста, баланс.
              Кнопка - "Пополнить баланс"
              <div style={{ marginTop: '2rem' }}>
                <Button type='primary' onClick={handleChangeTariff}>Пополнить баланс</Button>
              </div>
            </Modal>
          }
        </Fragment>
        : (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />)
    }
  />
}

export default PrivateRoute
