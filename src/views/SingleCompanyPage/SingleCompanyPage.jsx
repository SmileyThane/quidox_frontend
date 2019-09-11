import React, { Fragment, useEffect } from 'react'

import {
  Spin,
  Tabs,
  Icon
} from 'antd'

import {
  CompanyUsers,
  CompanyDescription
} from './internal'
import history from '../../history'

const { TabPane } = Tabs

const SingleCompanyPage = props => {
  const {
    match,
    getCompanyById,
    companies: { singleCompany, isFetching }
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
          <div style={{ marginBottom: '2rem' }} className='back' onClick={() => history.goBack()} >
            <Icon type='left' />
          </div>
          <Tabs defaultActiveKey='1'>
            <TabPane
              key='1'
              tab={
                <Fragment>
                  <Icon type='desktop' />
                  Данные компании
                </Fragment>
              }
            >
              <CompanyDescription data={singleCompany} />
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
              <CompanyUsers users={singleCompany.users} />
            </TabPane>

            <TabPane
              key='3'
              tab={
                <Fragment>
                  <Icon type='wallet' />
                   Баланс
                </Fragment>
              }
              disabled
            />

            <TabPane
              key='4'
              tab={
                <Fragment>
                  <Icon type='wallet' />
                  Документы
                </Fragment>
              }
              disabled
            />
          </Tabs>
        </div>
      </Spin>
    </Fragment>
  )
}

export default SingleCompanyPage
