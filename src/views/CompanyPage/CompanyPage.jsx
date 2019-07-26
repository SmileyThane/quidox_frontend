import React, { Fragment, useEffect, useState } from 'react'

import moment from 'moment'

import axios from '../../services/api/http'
import { Button } from '../../components'
import { Table, Tag, Popconfirm, message, Modal, Typography, Spin } from 'antd'

import './CompanyPage.scss'

const defaultCompanyState = {
  selectedCompanyId: null,
  newCompanyDate: '',
  newCompanyNumber: '',
  newIpNumber: '',
  newCompanyName: '',
  newCompanyCity: '',
  newCompanyFullName: '',
  yourPosition: '',
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

    window.sign('NewCompany', 'createNewCompany')
    setTimeout(function () {
      const companyData = document.getElementById('verifiedDataNewCompany').value
      const ipData = document.getElementById('companyNumberGlobal').value
      const companyDataArr = companyData.split(';')
      let address = ''
      let name = ''
      let position = ''
      let result = ''
      companyDataArr.forEach(function (element) {
        if (element.indexOf('2.5.4.7') > -1) {
          address = address + ' ' + element.substring(element.indexOf('<') + 1, element.indexOf('>'))
          // console.log('address', address)
        }
        if (element.indexOf('2.5.4.9') > -1) {
          address = address + ' ' + element.substring(element.indexOf('<') + 1, element.indexOf('>'))
          // console.log('address', address)
        }
        if (element.indexOf('2.5.4.10') > -1) {
          name = element.substring(element.indexOf('<') + 1, element.indexOf('>'))
          // console.log('name', name)
        }
        if (element.indexOf('2.5.4.12') > -1) {
          position = element.substring(element.indexOf('<') + 1, element.indexOf('>'))
          // console.log('position', position)
        }
        if (element.indexOf('1.2.112.1.2.1.1.1.1.2') > -1) {
          result = element.substring(element.indexOf('<') + 1, element.indexOf('>'))
          // console.log('result', result)
        }
      })
      if (result) {
        console.log('GET FORM JACKET')
        setCompanyState({
          ...companyState,
          showModal: true,
          newCompanyDate: moment().format('DD MM YYYY, HH:mm'),
          newCompanyNumber: result,
          newCompanyName: name,
          newCompanyCity: address,
          yourPosition: position
        })
      } else {
        console.log('GET FORM GOV.BY')
        console.log('SENDED IP NUMBER:', ipData)
        axios.get(`/company/find/data/${ipData}`)
          .then(response => {
            const res = JSON.parse(JSON.stringify(response.data))
            setCompanyState({
              ...companyState,
              showModal: true,
              newCompanyDate: moment().format('DD MM YYYY, HH:mm'),
              newCompanyNumber: ipData,
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
    }, 1000)
  }

  const changeActiveCompany = company => {
    if (company.company_data.id === data.active_company_id) {
      message.error('Компания является активной!')
      return null
    } else {
      changeActiveCompanyById(company.company_data.id)
        .then(() => {
          message.success('Активная компания изменена успешно!')
        })
        .catch(error => {
          message.error(error.message)
        })
    }
  }

  const handleCreateCompany = () => {
    const newCompanyData = {
      name: companyState.newCompanyName,
      company_number: companyState.newCompanyNumber ? companyState.newCompanyNumber : document.getElementById('companyNumberGlobal').value,
      description: companyState.newCompanyCity,
      data: companyState.newCompanyDate,
      your_position: companyState.yourPosition
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
            <Tag style={{ cursor: 'pointer' }} color={(record.company_data.id === data.active_company_id) ? '#87d068' : '#FF7D1D'}>
              {(record.company_data.id === data.active_company_id) ? 'Активная' : 'Не активная'}
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
      <input type='hidden' id='companyNumberGlobal' />
      <div id='attrCertSelectContainer' style={{ display: 'none' }}>
        <span id='certExtAbsent' />
        <select style={{ visibility: 'hidden' }} id='attrCertSelect' />
      </div>
      <input type='hidden' id='attrValue' size='80' disabled='disabled' />
      <Modal
        visible={companyState.showModal}
        title={companyState.newCompanyNumber ? 'Данные компании' : 'Данные ИП'}
        closable={false}
        footer={null}
        onCancel={() => setCompanyState({ ...companyState, showModal: !companyState.showModal })}
      >
        <div className='document document_modal'>
          <Spin spinning={companyState.modalFetching}>
            <div className='info'>
              <div className='info__item'>
                <div className='info__title'>Дата создания</div>
                <div className='info__content'>{companyState.newCompanyDate}</div>
              </div>
              {companyState.newCompanyNumber &&
              <div className='info__item'>
                <div className='info__title'>УНП</div>
                <div className='info__content'>{companyState.newCompanyNumber}</div>
              </div>
              }
              {companyState.newCompanyName &&
                <div className='info__item'>
                  <div className='info__title'>Имя компании</div>
                  <div className='info__content'>{companyState.newCompanyName}</div>
                </div>
              }
              {companyState.newCompanyCity &&
                <div className='info__item'>
                  <div className='info__title'>Место нахождения компании</div>
                  <div className='info__content'>{companyState.newCompanyCity}</div>
                </div>
              }
              {companyState.yourPosition &&
                <div className='info__item'>
                  <div className='info__title'>Должность сотруднка</div>
                  <div className='info__content'>{companyState.yourPosition}</div>
                </div>
              }
            </div>
            <Button style={{ margin: '20px 0 0 20px' }} onClick={handleCreateCompany} type='primary'>Создать</Button>
          </Spin>
        </div>

      </Modal>
    </Fragment>
  )
}

export default CopmanyPage
