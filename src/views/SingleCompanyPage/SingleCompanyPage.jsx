import React, { useEffect } from 'react'
import moment from 'moment'

import {
  Tabs,
  Spin
} from 'antd'

import {
  LayoutScroll,
  GoBack
} from '../../components'

import {
  CompanyUsers,
  CompanyDescription,
  CompanyBalance
} from './components'

import {
  Layout,
  Header
} from './styled'

const { TabPane } = Tabs

export default ({
  user: { data },
  match,
  getCompanyById,
  companies: {
    singleCompany,
    isFetching
  }
}) => {
  useEffect(() => {
    if (match) {
      getCompanyById(match.params.id)
    }
  }, [match, getCompanyById])

  const coBrand = data.co_brand_config && data.co_brand_config

  return (
    <LayoutScroll>
      <Layout>
        <Spin spinning={isFetching}>
          <Header>
            <GoBack />

            <Header.Inner>
              <Header.Title level={3}>{singleCompany.name}</Header.Title>
              <Header.Secondary>{moment.utc(singleCompany.registration_date, 'YYYY-MM-DD').local().format('DD MMM YYYY')}</Header.Secondary>
            </Header.Inner>
          </Header>

          <Tabs defaultActiveKey='1'>
            <TabPane
              key='1'
              tab='Данные компании'
            >
              <CompanyDescription data={singleCompany} />
            </TabPane>

            <TabPane
              key='2'
              tab='Пользователи компании'
            >
              <CompanyUsers users={singleCompany.users} />
            </TabPane>

            {coBrand === null && (
              <TabPane
                key='3'
                tab='Заказать пакет услуг'
              >
                <CompanyBalance balance={singleCompany.balance} />
              </TabPane>
            )}

            <TabPane
              key='4'
              tab='Документы'
              disabled
            />
          </Tabs>
        </Spin>
      </Layout>
    </LayoutScroll>
  )
}
