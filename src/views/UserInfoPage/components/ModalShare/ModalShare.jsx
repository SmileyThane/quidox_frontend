import React from 'react'

import {
  Form,
  Input,
  Modal
} from 'antd'

import { Button } from '../../../../components'

import { sharePicture } from '../../images'

import { Layout } from './styled'

export default ({
  visible,
  onSubmit,
  onCancel,
  getFieldDecorator,
  validateStatus
}) => {
  return (
    <Modal
      width={400}
      title='Предоставить доступ'
      visible={visible}
      onCancel={onCancel}
      footer={
        <>
          <Button
            type='primary'
            onClick={onCancel}
            ghost
          >
            Закрыть
          </Button>

          <Button
            type='primary'
            onClick={onSubmit}
          >
            Создать пароль доступа
          </Button>
        </>
      }
    >
      <Layout>
        <Layout.Picture src={sharePicture} />

        <Form colon={false}>
          <Form.Item
            validateStatus={validateStatus}
            label='Введите электронную почту'
            required={false}
          >
            {getFieldDecorator('email', {
              rules: [{
                required: true,
                message: 'Пожалуйста, введите электронную почту'
              }]
            })(
              <Input placeholder='Введите электронную почту' />
            )}
          </Form.Item>
        </Form>
      </Layout>
    </Modal>
  )
}
