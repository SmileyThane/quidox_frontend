import React, { Fragment, useEffect, useState } from 'react'

import axios from '../../services/api/http'

import { Button } from '../../components'
import { Table, Tag, Popconfirm, message, Modal } from 'antd'

import './CompanyPage.scss'

const defaultCompanyState = {
  activeCompanyId: null,
  newCompanyDate: '',
  newCompanyNumber: '',
  newCompanyName: '',
  newCompanyCity: '',
  newCompanyFullName: '',
  showModal: false
}

// eslint-disable-next-line spaced-comment
const isIE = /*@cc_on!@*/false || !!document.documentMode

const CopmanyPage = props => {
  const {
    getCompany,
    companies: { isFetching, list },
    user: { data }
  } = props

  useEffect(() => {
    getCompany()
    if (data) {
      setCompanyState({
        activeCompanyId: +data.active_company_id
      })
    }
  }, [data, getCompany])

  const [companyState, setCompanyState] = useState({ ...defaultCompanyState })

  const getCompanyArray = () => {
    const companyArray = []
    if (list.data) {
      list.data.forEach(element => {
        companyArray.push(element.company_data)
      })
    }
    return companyArray
  }

  const companyArray = getCompanyArray()

  const onClick = () => {
    setCompanyState({
      ...companyState,
      showModal: true
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
              console.log(response)
              const res = JSON.parse(JSON.stringify(response.data))
              setCompanyState({
                ...companyState,
                showModal: true,
                newCompanyDate: res.data[0].DC,
                newCompanyNumber: result,
                newCompanyName: res.data[0].VFN,
                newCompanyCity: address,
                newCompanyFullName: res.data[0].VNM

              })
            })
            .catch(error => {
              console.log(error.message)
            })
        }
      })
    }, 1000)
  }

  const changeActiveCompany = company => {
    if (company.id === companyState.activeCompanyId) {
      message.error('Компания является активной!')
      return null
    }
    console.log(company.id)
  }

  const columns = [{
    title: 'Имя',
    dataIndex: 'name'
  },
  {
    title: 'УНП',
    dataIndex: 'company_number'
  },
  {
    title: 'Данные компании',
    dataIndex: 'description'
  },
  {
    title: 'Статус',
    render: record => (
      <Fragment>
        {companyState.activeCompanyId &&
          <Popconfirm
            title='Сделать компанию активной?'
            onConfirm={() => changeActiveCompany(record)}
            okText='Сделать активной'
            cancelText='Закрыть'
          >
            <Tag style={{ cursor: 'pointer' }} color={(record.id === companyState.activeCompanyId) ? '#87d068' : '#FF7D1D'}>
              {(record.id === companyState.activeCompanyId) ? 'Активная' : 'Не активная'}
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
          pagination={false}
          rowKey='id'
          columns={columns}
          dataSource={companyArray}
          loading={isFetching}
        />
      </div>
      {!isIE &&
        <p>Создание компании возможно только в браузере Internet Explorer</p>
      }
      {isIE &&
        <Button type='primary' onClick={onClick}>Add new company</Button>
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
      >
        <div>{companyState.newCompanyDate}</div>
        <div>{companyState.newCompanyNumber}</div>
        <div>{companyState.newCompanyName}</div>
        <div>{companyState.newCompanyCity}</div>
        <div>{companyState.newCompanyFullName}</div>
      </Modal>
    </Fragment>
  )
}

export default CopmanyPage
