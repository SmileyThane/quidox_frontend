import React from 'react'

import { Modal } from 'antd'

import { CompanyCreate } from '../../../../components'

export default ({
  visible,
  onCancel
}) => (
  <Modal
    className='ui-modal-connect'
    width={740}
    title='Подключение ЭЦП'
    visible={visible}
    onCancel={onCancel}
    footer={null}
  >
    <CompanyCreate onCancel={onCancel} />
  </Modal>
)
