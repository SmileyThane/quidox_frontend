import React, { useState } from 'react'
import useForm from 'rc-form-hooks'

import { api } from '../../../../services'

import {
  Form,
  Input,
  Modal,
  message
} from 'antd'

import { Button } from '../../../../components'

import { newUserPicture } from '../../images'

import { Layout } from './styled'

export default ({
  visible,
  onCancel
}) => {
  const [fieldEmail, setFieldEmail] = useState('')

  const {
    getFieldDecorator,
    validateFields
  } = useForm()

  const handleSubmit = () => {
    validateFields()
      .then(() => {
        api.companies.attachUnregisteredUserToCompany({ email: fieldEmail })
          .then(({ data }) => {
            if (data.success) {
              message.success('Приглашение отправлено')

              setFieldEmail('')
              onCancel()
            } else {
              throw new Error(data.error)
            }
          })
          .catch(error => {
            message.error(error.message)
          })
      })
  }

  const handleClose = () => {
    setFieldEmail('')
    onCancel()
  }

  return (
    <Modal
      width={400}
      title='Новый пользователь'
      visible={visible}
      onCancel={handleClose}
      footer={
        <>
          <Button
            type='primary'
            onClick={handleClose}
            ghost
          >
            Отмена
          </Button>

          <Button
            type='primary'
            onClick={handleSubmit}
          >
            Отправить приглашение
          </Button>
        </>
      }
    >
      <Layout>
        <Layout.Picture src={newUserPicture} />

        <Form colon={false}>
          <Form.Item
            label='Электронная почта'
            required={false}
          >
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'Не правильный адрес электронной почты!'
                },
                {
                  required: true,
                  message: 'Введите адрес электроной почты'
                }
              ]
            })(
              <Input
                type='email'
                placeholder='Введите адрес электронной почты'
                onChange={e => setFieldEmail(e.target.value)}
              />
            )}
          </Form.Item>
        </Form>
      </Layout>
    </Modal>
  )
}
