import React, { Fragment, useEffect } from 'react'

 import {
  Spin,
  Typography,
  Tabs,
  Icon
} from 'antd'

import {
  CompanyUsers,
  CompanyDescription
} from './internal'

const { Title, Text } = Typography
const { TabPane } = Tabs

const SingleCompanyPage = props => {
  const {
    match,
    getCompanyById,
    company: { singleCompany, isFetching }
  } = props

  useEffect(() => {
    if (match) {
      getCompanyById(match.params.id)
    }
  }, [match, getCompanyById])

  return (
    <Fragment>
      <Spin spinning={isFetching}>
        <div className='content content_user'>
          <Tabs type="card" defaultActiveKey='1'>
            <TabPane
              key='1'
              tab={
                <Fragment>
                  <Icon type='desktop' />
                  Данные компании
                </Fragment>
              }
            >
              <CompanyDescription />
            </TabPane>

            <TabPane
              key='2'
              tab={
                <Fragment>
                  <Icon type='team' />
                  Пользователи компании
                </Fragment>
              }
            >
              <CompanyUsers users={singleCompany.users}/>
            </TabPane>
          </Tabs>
        </div>
      </Spin>
    </Fragment>
  )
}

export default SingleCompanyPage
