import React from 'react'

import { Modal } from 'antd'

import { Button } from '../../../../components'

export default ({
  visible,
  data,
  onCancel,
  onVerify,
  onRemove,
  onSend
}) => (
  <Modal
    visible={visible}
    closable={false}
    footer={null}
  >
    {data.type === 'verify' && (
      <p>Файлов к подписанию: {data.not_applied_attachments_count}</p>)}

    {data.type === 'remove' && (
      <p>Файлов к удалению: {data.not_applied_attachments_count}</p>)}

    {data.type === 'send' && (
      <p>Сообщений к отправке: {data.not_applied_attachments_count}</p>)}

    {data.type === 'verify' && (
      <Button
        type='primary'
        disabled={data.disabled}
        icon={data.disabled ? 'loading' : 'edit'}
        onClick={onVerify}
      >
        {data.disabled
          ? 'Подождите, идет процесс подписания'
          : 'Подписать файлы'}
      </Button>)}

    {data.type === 'remove' && (
      <Button
        type='primary'
        style={{ marginTop: '2rem' }}
        disabled={data.disabled}
        icon={data.disabled ? 'loading' : 'edit'}
        onClick={onRemove}
      >
        {data.disabled
          ? 'Подождите, идет процесс удаления'
          : 'Удалить файлы'}
      </Button>)}

    {data.type === 'send' && (
      <Button
        type='primary'
        style={{ marginTop: '2rem' }}
        disabled={data.disabled}
        icon={data.disabled ? 'loading' : 'edit'}
        onClick={onSend}
      >
        {data.disabled
          ? 'Подождите, идет процесс отправки'
          : 'Отправить сообщения'}
      </Button>)}

    <Button
      disabled={data.disabledCloseButton}
      style={{ marginLeft: '2rem' }}
      onClick={onCancel}
    >
      Закрыть
    </Button>
  </Modal>
)
