import React, { Fragment, useEffect, useState } from 'react'

import axios from '../../services/api/http'

import { Button } from '../../components'
import { Table, Tag, Popconfirm, message, Modal, Typography, Spin } from 'antd'

import './CompanyPage.scss'

const defaultCompanyState = {
  selectedCompanyId: null,
  newCompanyDate: '',
  newCompanyNumber: '',
  newCompanyName: '',
  newCompanyCity: '',
  newCompanyFullName: '',
  showModal: false,
  modalFetching: false
}

const { Text } = Typography

// eslint-disable-next-line spaced-comment
const isIE = /*@cc_on!@*/false || !!document.documentMode

const CopmanyPage = props => {
  const {
    getCompany,
    createCompany,
    changeActiveCompanyById,
    companies: { isFetching, list },
    user: { data }
  } = props

  useEffect(() => {
    getCompany()
  }, [])

  const [companyState, setCompanyState] = useState({ ...defaultCompanyState })

  const onClick = () => {
    setCompanyState({
      ...companyState,
      showModal: true,
      modalFetching: true
    })

    window.sign('NewCompany')
    setTimeout(function () {
      const companyData = document.getElementById('verifiedDataNewCompany').value
      const companyDataArr = companyData.split(';')
      let address = ''
      companyDataArr.forEach(function (element) {
        if (element.indexOf('2.5.4.7') > -1) {
          address = address + ' ' + element.substring(element.indexOf('<') + 1, element.indexOf('>'))
        }
        if (element.indexOf('2.5.4.9') > -1) {
          address = address + ' ' + element.substring(element.indexOf('<') + 1, element.indexOf('>'))
        }
        if (element.indexOf('1.2.112.1.2.1.1.1.1.2') > -1) {
          const result = element.substring(element.indexOf('<') + 1, element.indexOf('>'))
          axios.get(`/company/find/data/${result}`)
            .then(response => {
              const res = JSON.parse(JSON.stringify(response.data))
              setCompanyState({
                ...companyState,
                showModal: true,
                newCompanyDate: res.data[0].DC,
                newCompanyNumber: result,
                newCompanyName: res.data[0].VFN,
                newCompanyCity: address,
                newCompanyFullName: res.data[0].VNM,
                modalFetching: !res.data[0].VFN
              })
            })
            .catch(error => {
              message.error(error.message)
            })
        }
      })
    }, 1000)
  }

  const changeActiveCompany = company => {
    if (company.id === data.active_company_id) {
      message.error('Компания является активной!')
      return null
    } else {
      changeActiveCompanyById(company.id)
        .then(() => {
          message.success('Активная компания изменена успешно!')
          setCompanyState({
            ...companyState,
            showModal: !companyState.showModal
          })
        })
        .catch(error => {
          message.error(error.message)
          setCompanyState({
            ...companyState,
            showModal: !companyState.showModal
          })
        })
    }
  }

  const handleCreateCompany = () => {
    const newCompanyData = {
      name: companyState.newCompanyFullName,
      company_number: +companyState.newCompanyNumber,
      description: companyState.newCompanyCity
    }
    createCompany(newCompanyData)
      .then(() => {
        setCompanyState({ ...defaultCompanyState })
        message.success('Компания создана успешно!!')
      })
      .catch(error => {
        message.error(error.message)
      })
  }

  const columns = [{
    title: 'Имя',
    dataIndex: 'company_data.name'
  },
  {
    title: 'УНП',
    dataIndex: 'company_data.company_number'
  },
  {
    title: 'Данные компании',
    dataIndex: 'company_data.description'
  },
  {
    title: 'Статус',
    render: record => (
      <Fragment>
        {data.active_company_id &&
          <Popconfirm
            title='Сделать компанию активной?'
            onConfirm={() => changeActiveCompany(record)}
            okText='Сделать активной'
            cancelText='Закрыть'
          >
            <Tag style={{ cursor: 'pointer' }} color={(record.id === data.active_company_id) ? '#87d068' : '#FF7D1D'}>
              {(record.id === data.active_company_id) ? 'Активная' : 'Не активная'}
            </Tag>
          </Popconfirm>
        }
      </Fragment>
    )
  }]

  return (
    <Fragment>
      <div className='content content_small-margin'>
        <Table
          pagination
          rowKey='id'
          columns={columns}
          dataSource={list}
          loading={isFetching}
          locale={{ emptyText: 'Нет созданных компаний' }}
        />
      </div>
      {!isIE &&
        <Text type='secondary'>Создание компании возможно только в браузере Internet Explorer</Text>
      }
      {isIE &&
        <Button type='primary' onClick={onClick}>Создать компанию</Button>
      }
      <input type='hidden' id='dataNewCompany' value={data.email} />
      <input type='hidden' id='attr' size='80' value='1.2.112.1.2.1.1.1.1.2' />
      <div id='attrCertSelectContainer' style={{ display: 'none' }}>
        <span id='certExtAbsent' />
        <select style={{ visibility: 'hidden' }} id='attrCertSelect' />
      </div>
      <input type='hidden' id='attrValue' size='80' disabled='disabled' />
      <Modal
        visible={companyState.showModal}
        title='Данные компании'
        closable={false}
        onOk={handleCreateCompany}
        onCancel={() => setCompanyState({ ...companyState, showModal: !companyState.showModal })}
      >
        <div className='document document_modal'>
          <Spin spinning={companyState.modalFetching}>
            <div className='info'>
              <div className='info__item'>
                <div className='info__title'>Дата создания</div>
                <div className='info__content'>{companyState.newCompanyDate}</div>
              </div>
              <div className='info__item'>
                <div className='info__title'>УНП</div>
                <div className='info__content'>{companyState.newCompanyNumber}</div>
              </div>
              <div className='info__item'>
                <div className='info__title'>Имя компании</div>
                <div className='info__content'>{companyState.newCompanyName}</div>
              </div>
              <div className='info__item'>
                <div className='info__title'>Место нахождения компании</div>
                <div className='info__content'>{companyState.newCompanyCity}</div>
              </div>
              <div className='info__item'>
                <div className='info__title'>Полное имя компании</div>
                <div className='info__content'>{companyState.newCompanyFullName}</div>
              </div>
            </div>
          </Spin>
        </div>

      </Modal>
    </Fragment>
  )
}

export default CopmanyPage
