import React, { Fragment, useEffect, useState } from 'react'

import { Skeleton, Button, Modal } from 'antd'
import { HeaderUser, HeaderTariff } from './internal'
import { CompanyCreate } from '../'
import { HeaderContent } from './styled'
import { logo } from '../../resources/img'
import { getActiveCompany } from '../../utils'

const defaultState = {
  isModalVisible: false,
  activeCompany: null
}

const HeaderBlock = props => {
  const {
    user: { data, isFetching }
  } = props

  const [state, setState] = useState({ ...defaultState })

  useEffect(() => {
    if (data) {
      setState({
        ...state,
        activeCompany: data.hasOwnProperty('companies') && getActiveCompany(data)
      })
    }
  }, [data])

  const handleOpenModal = () => {
    setState({
      ...state,
      isModalVisible: true
    })
  }

  const handleCloseModal = () => {
    setState({
      ...defaultState
    })
  }

  const { isModalVisible, activeCompany } = state
  return (
    <Fragment>
      <HeaderContent>
        <HeaderContent.Row>
          <HeaderContent.LeftAside>
            <a href={'https://quidox.by'}>
              <HeaderContent.Logo src={logo} alt='Quidox Logo' style={{ maxHeight: '5rem' }} />
            </a>
          </HeaderContent.LeftAside>
          {(window.localStorage.getItem('authToken') || 'Bearer ' + window.sessionStorage.getItem('authToken')) &&
          <Fragment>
            <Skeleton loading={isFetching} active paragraph={false}>
              <HeaderTariff />
              {activeCompany && +activeCompany.company_number === 0 &&
                <Button type='primary' ghost onClick={handleOpenModal}>Подключить ЭЦП</Button>
              }

              <HeaderUser />
            </Skeleton>
          </Fragment>
          }
        </HeaderContent.Row>
      </HeaderContent>

      {isModalVisible &&
      <Modal
        title='Подключение ЭЦП'
        visible
        width={600}
        closable={false}
        footer={null}
      >
        <CompanyCreate onCancel={handleCloseModal} redirect />
      </Modal>
      }
    </Fragment>
  )
}

export default HeaderBlock
