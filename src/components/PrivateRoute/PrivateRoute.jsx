import React, { Fragment, useEffect, useState } from 'react'
import { Redirect, Route } from 'react-router-dom'

import { Layout, Modal } from 'antd'
import { getActiveCompany, checkActiveTariff } from '../../utils'
import { LayoutBlock, HeaderBlock, SiderBlock, ContentBlock, FooterBlock } from '../'

const PrivateRoute = ({ component: Component, user: { data }, getUser, ...rest }) => {
  const [availableTariff, setAvailableTariff] = useState(false)
  const [activeCompany, setActiveCompany] = useState(null)
  // eslint-disable-next-line spaced-comment
  const isIE = /*@cc_on!@*/false || !!document.documentMode
  useEffect(() => {
    if (window.localStorage.getItem('authToken')) {
      getUser()
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

  console.log(availableTariff)
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
            >
              Дорогой друг, к сожалению ваш тариф исчерпал себя и ему стало грустно.
              Возможно стоит дать ему денег и тогда станет лучше, пока что, довольствуйтесь ничем!
            </Modal>
          }
        </Fragment>
        : (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />)
    }
  />
}

export default PrivateRoute
