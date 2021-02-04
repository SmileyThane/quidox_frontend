import React, { Fragment, useEffect, useState } from 'react'
import { Redirect, Route } from 'react-router-dom'

import history from '../../history'
import { Layout, Modal } from 'antd'
import { Button, ContentBlock, FooterBlock, HeaderBlock, LayoutBlock, SiderBlock, TariffTimePeriod } from '../'
import { checkActiveTariff, getActiveCompany } from '../../utils'
import { useResponseStatus } from '../../hooks'
import { faviconIcon } from '../../resources/img'

const favicon = document.querySelector(('[rel=icon]'))

const PrivateRoute = ({ component: Component, config, user: { data, isFetching }, getUser, getTariffications, ...rest }) => {
  const [availableTariff, setAvailableTariff] = useState(false)
  const [activeCompany, setActiveCompany] = useState(null)
  // eslint-disable-next-line spaced-comment
  const isIE = /*@cc_on!@*/false || !!document.documentMode
  const authToken = window.localStorage.getItem('authToken') || window.sessionStorage.getItem('authToken')
  useEffect(() => {
    if (authToken) {
      getUser()
      getTariffications()
      if (isIE) {
        // setTimeout(() => {
        //   if (window.conn === null || window.conn === undefined) {
        //     window.pluginLoaded()
        //   }
        // }, 1500)
      }
    }
  }, [getUser, isIE])

  useEffect(() => {
    if (config.data.co_brand_config) {
      document.title = 'MTC SmartDoc'
      favicon.href = faviconIcon
    } else {
      document.title = 'Quidox'
      favicon.href = `${process.env.REACT_APP_URL}/favicon.ico`
    }
  }, [config.data.co_brand_config])

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
  }

  const handleStayOnPage = () => {
    setAvailableTariff(false)
  }

  const { status } = useResponseStatus()

  if (isFetching) {
    return 'Loading...'
  }

  return <Route {...rest}
                render={props =>
                  (window.localStorage.getItem('authToken') || window.sessionStorage.getItem('authToken'))
                    ? <Fragment>
                      <LayoutBlock content>
                        <HeaderBlock/>
                        <Layout>
                          <SiderBlock/>
                          <Layout>
                            <ContentBlock>
                              <Component {...props} />
                            </ContentBlock>
                            <TariffTimePeriod/>
                            <FooterBlock/>
                          </Layout>
                        </Layout>
                      </LayoutBlock>
                      {availableTariff &&
                      <Modal
                        visible
                        footer={null}
                        closable={false}
                      >
                        {
                          config.data.co_brand_config ?
                            activeCompany.company_data.is_blocked === true ?
                              'Внимание! Для продолжения пользования сервисом подключите услугу линейки "МТС SmartDoc".' :
                              // 'Внимание! Предоставление сервиса" МТС SmartDoc" на тарификационном номере ' +
                              // activeCompany.company_data.owner_phone_number +
                              // ' и всех пользователей Компании заблокировано!' :
                              activeCompany.company_data.is_owner === true ?
                              'Внимание! Вы израсходовали ваш пакет услуг. ' +
                              'Чтобы продолжить пользование сервисом, пожалуйста, ' +
                              'подключите новый пакет услуг на следующие 30 дней. ' +
                              'При нажатии на кнопку "Перейти к продлению тарифа" ' +
                              'стоимость пакета с учетом НДС спишется с лицевого счета вашего абонентского номера.' :
                              'Внимание! Вы израсходовали ваш пакет услуг. Чтобы продолжить пользоваться сервисом, пожалуйста, ' +
                              'подключите новый пакет услуг на следующие 30 дней на номере ' + activeCompany.company_data.owner_phone_number
                            :
                            <div dangerouslySetInnerHTML={{
                              __html:
                                'Уважаемый пользователь!\n' +
                                '\n' +
                                'Поскольку по окончании демо-периода Вами не активирован ни один из постоянных пакетов услуг, ' +
                                'возможность создания и отправки (перенаправления) сообщений и документов отключена.\n' +
                                ' \n' +
                                'РАБОТА С ВХОДЯЩИМИ ПО-ПРЕЖНЕМУ БЕСПЛАТНА\n' +
                                '\n' +
                                'Работа со ВХОДЯЩИМИ документами – их получение/сохранение, подписание и согласование ' +
                                'по прежнему доступна и для Вас абсолютно бесплатна.\n' +
                                '\n' +
                                'По вопросам подбора оптимального ' +
                                '<a href="https://quidox.by/wp-content/uploads/2020/12/price_14_12_2020-3.xlsx">тарифа</a>  ' +
                                'Вы можете связаться с нами по указанным ' +
                                '<a href="https://quidox.by/#callback"> контактам. </a>'
                            }} />
                        }
                        <div style={{ marginTop: '2rem' }}>
                          {
                            config.data.co_brand_config !== null && activeCompany.company_data.is_owner === true &&
                            <Button type='primary' onClick={handleChangeTariff}>
                              Перейти к продлению тарифа
                            </Button>
                          }
                          {/*{*/}
                          {/*  config.data.co_brand_config === null &&*/}
                          {/*  <Button type='primary' onClick={handleChangeTariff}>*/}
                          {/*    Перейти к пополнению баланса*/}
                          {/*  </Button>*/}

                          {/*}*/}
                          <Button type='link' onClick={handleStayOnPage}>
                            {config.data.co_brand_config ? 'Отмена' : 'Продолжить бесплатно'}
                          </Button>
                        </div>
                      </Modal>
                      }
                    </Fragment>
                    : (<Redirect to={{ pathname: '/login', state: { from: props.location } }}/>)
                }
  />
}

export default PrivateRoute
