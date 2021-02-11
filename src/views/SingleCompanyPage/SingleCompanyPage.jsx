import React, { Fragment, useEffect } from 'react'

import history from '../../history'
import {
  Spin,
  Icon
} from 'antd'

import {
  CompanyUsers,
  CompanyDescription,
  CompanyBalance
} from './internal'

import ThemeTabs from './styled'

const SingleCompanyPage = props => {
  const {
    user: { data },
    match,
    location,
    getCompanyById,
    companies: { singleCompany, isFetching }
  } = props

  useEffect(() => {
    if (match) {
      getCompanyById(match.params.id)
    }
  }, [match, getCompanyById])

  const coBrand = data.co_brand_config && data.co_brand_config

  return (
    <Fragment>
      <Spin spinning={isFetching}>
        <div className='content content_user'>
          <div style={{ marginBottom: '2rem' }} className='back' onClick={() => history.goBack()} >
            <Icon type='left' />
          </div>
          <ThemeTabs
            brand={coBrand}
            defaultActiveKey={'1'}
          >
            <ThemeTabs.Pane
              key='1'
              tab={
                <Fragment>
                  <Icon type='desktop' />
                  Данные компании
                </Fragment>
              }
            >
              <CompanyDescription data={singleCompany} />
            </ThemeTabs.Pane>

            <ThemeTabs.Pane
              key='2'
              tab={
                <Fragment>
                  <Icon type='team' />
                  Пользователи компании
                </Fragment>
              }
            >
              <CompanyUsers users={singleCompany.users} />
            </ThemeTabs.Pane>
            {
              coBrand === null &&
              <ThemeTabs.Pane
                key='3'
                tab={
                  <Fragment>
                    <Icon type='wallet' />
                    Заказать пакет услуг
                  </Fragment>
                }
              >
                <CompanyBalance />
              </ThemeTabs.Pane>

            }
            <ThemeTabs.Pane
              key='4'
              tab={
                <Fragment>
                  <Icon type='wallet' />
                  Документы
                </Fragment>
              }
              disabled
            />
          </ThemeTabs>
        </div>
      </Spin>
    </Fragment>
  )
}

export default SingleCompanyPage
