import React, { useEffect, useState } from 'react'
import axios from 'axios'
import history from '../../history'

import {
  LayoutScroll,
  Button,
  RouterLink
} from '../../components'

import {
  Table,
  Tag,
  Popconfirm,
  message
} from 'antd'

import {
  ModalNewUser,
  ModalConnect
} from './components'

import {
  Layout,
  Explorer
} from './styled'

import { explorer } from './images'

import { styleguide } from '../../constants'

const { colors } = styleguide

// eslint-disable-next-line spaced-comment
const isIE = /*@cc_on!@*/!!document.documentMode

const defaultCompanyState = {
  newCompany: {},
  isModalNewUserVisible: false,
  isModalConnectVisible: false
}

export default ({
  getCompanies,
  changeActiveCompanyById,
  companies: {
    isFetching,
    list
  },
  user: { data }
}) => {
  const [companyState, setCompanyState] = useState({ ...defaultCompanyState })

  useEffect(() => {
    getCompanies()
  }, [])

  useEffect(() => {
    let search = window.location.search
    let params = new URLSearchParams(search)
    let hash = params.get('hash')

    if (hash) {
      try {
        axios.get(`${process.env.REACT_APP_BASE_URL}/attachment/sim-sign/check/new_company?hash=${hash}`, {
          headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem('authToken') || 'Bearer ' + window.sessionStorage.getItem('authToken'),
          }
        })
          .then(response => {
            const {
              data: { success }
            } = response

            if (success) {
              message.success('Совершено успешное обновление данных!')

              getCompanies()
            }
          })
          .catch(error => {
            message.error('Извините, что-то пошло не так. Перезагрузите страницу и попробуйте еще раз.')
            // setTimeout(() => {
            //   window.location.reload();
            // }, 2000)
          })
      } catch (error) {
      }
    }
  }, [])

  const changeActiveCompany = company => {
    if (company.company_data.id === data.active_company_id) {
      message.error('Компания является активной')

      return null
    } else {
      changeActiveCompanyById(company.company_data.id)
        .then(() => {
          message.success('Активная компания изменена успешно')

          const inputVerifiedDataArray = Array.from(document.getElementsByClassName('verifiedData'))

          inputVerifiedDataArray.forEach(i => {
            i.parentNode.removeChild(i)
          })

          setTimeout(() => {
            try {
              window.pluginLoaded()
            } catch (error) {
            }
          }, 1000)
        })
        .catch(error => {
          message.error(error.message)
        })
    }
  }

  const handleModalVisible = modal => {
    setCompanyState({
      ...companyState,
      [modal]: !companyState[modal]
    })
  }

  const columns = [
    {
      title: 'Наименование',
      key: 'name',
      render: record => (
        <RouterLink to={{ pathname: `/companies/${+record.company_id}`, state: { from: history.location.pathname } }}>
          {record.company_data.name}
        </RouterLink>
      )
    },
    {
      title: 'УНП',
      key: 'number',
      dataIndex: 'company_data.company_number'
    },
    {
      title: 'Данные компании',
      key: 'description',
      dataIndex: 'company_data.description'
    },
    {
      title: 'Статус',
      render: record => (
        <>
          {data.active_company_id && (
            <Popconfirm
              title='Вы хотите активировать компанию?'
              okText='Активировать'
              cancelText='Отмена'
              placement='bottomLeft'
              onConfirm={() => changeActiveCompany(record)}
            >
              <Tag color={(record.company_data.id === data.active_company_id) ? colors.green : colors.red}>
                {(record.company_data.id === data.active_company_id)
                  ? 'Активная'
                  : 'Не активная'}
              </Tag>
            </Popconfirm>)}
        </>
      )
    }
  ]

  return (
    <LayoutScroll>
      <Layout>
        <Layout.Inner>
          <ModalNewUser
            visible={companyState.isModalNewUserVisible}
            onCancel={() => handleModalVisible('isModalNewUserVisible')}
          />

          <ModalConnect
            visible={companyState.isModalConnectVisible}
            onCancel={() => handleModalVisible('isModalConnectVisible')}
          />

          <Layout.Table>
            <Layout.Table.Header>
              <Button
                type='link'
                icon='select'
                onClick={() => handleModalVisible('isModalConnectVisible')}
              >
                Подключить ЭЦП
              </Button>

              <Button
                type='link'
                icon='usergroup-add'
                onClick={() => handleModalVisible('isModalNewUserVisible')}
              >
                Добавить пользователя
              </Button>
            </Layout.Table.Header>

            {!isIE && (
              <Explorer>
                <Explorer.Picture src={explorer} />

                <Explorer.Inner>
                  <Explorer.Title>Обратите внимание</Explorer.Title>
                  <Explorer.Details>Создание компании возможно только в браузере Internet Explorer</Explorer.Details>
                </Explorer.Inner>
              </Explorer>)}

            <Layout.Table.Body>
              <Table
                className='ui-table-inside'
                rowKey='id'
                columns={columns}
                dataSource={list}
                loading={isFetching}
                locale={{ emptyText: 'Нет созданных компаний' }}
                pagination
              />
            </Layout.Table.Body>
          </Layout.Table>
        </Layout.Inner>
      </Layout>
    </LayoutScroll>
  )
}
