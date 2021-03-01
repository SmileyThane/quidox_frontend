import React from 'react'

import {
  Form,
  Input,
  Modal
} from 'antd'

import { Button } from '../../../../components'

import { getSharedPicture } from '../../images'

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
      title='Перейти к активному расшареному пользователю'
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
            Подтвердить
          </Button>
        </>
      }
    >
      <Layout>
        <Layout.Picture src={getSharedPicture} />

        <Form colon={false}>
          <Form.Item
            validateStatus={validateStatus}
            label='Введите код'
            required={false}
          >
            {getFieldDecorator('value', {
              rules: [{
                required: true,
                message: 'Пожалуйста, введите секретный код'
              }]
            })(
              <Input placeholder='Код' />
            )}
          </Form.Item>
        </Form>
      </Layout>
    </Modal>
  )
}
