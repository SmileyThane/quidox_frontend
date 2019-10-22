import React, { Fragment, useState } from 'react'

import { Skeleton, Button, Modal } from 'antd'
import { HeaderUser, HeaderTariff } from './internal'
import { CompanyCreate } from '../'
import { HeaderContent } from './styled'
import { logo } from '../../resources/img'

const defaultState = {
  isModalVisible: false
}

const HeaderBlock = props => {
  const {
    user: { isFetching }
  } = props

  const [state, setState] = useState({ ...defaultState })

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

  const { isModalVisible } = state
  return (
    <Fragment>
      <HeaderContent>
        <HeaderContent.Row>
          <HeaderContent.LeftAside>
            <HeaderContent.Logo src={logo} alt='Quidox Logo' style={{ maxHeight: '5rem' }} />
          </HeaderContent.LeftAside>
          {window.localStorage.getItem('authToken') &&
          <Fragment>
            <Skeleton loading={isFetching} active paragraph={false}>
              <HeaderTariff />

              <Button type='primary' ghost onClick={handleOpenModal}>Подключить ЭЦП</Button>

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
        <CompanyCreate onCancel={handleCloseModal} />
      </Modal>
      }
    </Fragment>
  )
}

export default HeaderBlock
