import React from 'react'

import {
  Form,
  Input,
  Modal
} from 'antd'

import { Button } from '../../../../components'

import { passwordPicture } from '../../images'

import { Layout } from './styled'

export default ({
  visible,
  onSubmit,
  onCancel,
  getFieldDecorator,
  validateTo,
  compareTo
}) => {
  return (
    <Modal
      width={400}
      title='Сменить пароль'
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
            Сохранить
          </Button>
        </>
      }
    >
      <Layout>
        <Layout.Picture src={passwordPicture} />

        <Form colon={false}>
          <Form.Item
            label='Новый пароль'
            required={false}
            hasFeedback
          >
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Минимум восемь символов.',
                  pattern: /^.{8,128}$/
                },
                {
                  validator: validateTo
                }
              ]
            })(
              <Input.Password placeholder='Новый пароль' />
            )}
          </Form.Item>

          <Form.Item
            label='Подтвердите новый пароль'
            required={false}
            hasFeedback
          >
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Минимум восемь символов.',
                  pattern: /^.{8,128}$/
                },
                {
                  validator: compareTo
                }
              ]
            })(
              <Input.Password placeholder='Подтвердите новый пароль' />
            )}
          </Form.Item>
        </Form>
      </Layout>
    </Modal>
  )
}
