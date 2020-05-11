import React, { Fragment, useEffect, useState } from 'react'

import { message, Modal, notification, Skeleton } from 'antd'
import { Button } from '../'
import { HeaderTariff, HeaderUser } from './internal'
import { CompanyCreate } from '../'
import { HeaderContent } from './styled'
import { logo } from '../../resources/img'
import { getActiveCompany } from '../../utils'
import axios from 'axios'

import fileDownload from 'js-file-download'
import { api } from '../../services'

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

  const isIE = /*@cc_on!@*/false || !!document.documentMode

  const importCerts = () => {

    if (isIE) {
      window.pluginLoaded()
      setTimeout(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/ruc/get`, {
          'responseType': 'arraybuffer',
          headers: {
            'Access-Control-Expose-Headers': 'Content-Disposition,X-Suggested-Filename'
          }
        }).then(({ data }) => {
          fileDownload(data, `ruc.cer`)
          window.importCerts(data)
          notification.success({
            message: 'Сертификаты обновлены!'
          })
        }).catch(error => console.log(error))

      }, 3000)
    }

  }

  const { isModalVisible, activeCompany } = state
  const coBrandLogo = data.co_brand_config ? data.co_brand_config.logo : logo
  return (
    <Fragment>
      <HeaderContent>
        <HeaderContent.Row>
          <HeaderContent.LeftAside>
            {!isFetching &&
              <a href={'https://quidox.by'}>
                <HeaderContent.Logo src={coBrandLogo} alt='Quidox Logo' style={{ maxHeight: '5rem' }}/>
              </a>
            }
          </HeaderContent.LeftAside>
          {(window.localStorage.getItem('authToken') || window.sessionStorage.getItem('authToken')) &&
          <Fragment>
            <Skeleton loading={isFetching} active paragraph={false}>
              <HeaderTariff/>
              <Button ghost type='primary' onClick={handleOpenModal}>Подключить ЭЦП</Button>
              <HeaderUser/>
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
        <CompanyCreate onCancel={handleCloseModal} redirect/>
      </Modal>
      }
    </Fragment>
  )
}

export default HeaderBlock
