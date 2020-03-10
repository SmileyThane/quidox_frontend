import React from 'react'

import { getActiveCompany } from '../../utils'
import { Icon, Typography, Button, message } from 'antd'
import { AvestError } from './styled'

const { Text } = Typography

const AvestErrorHandling = ({ user: { data }, onCancel }) => {
  const activeCompany = getActiveCompany(data)

  const runAvestPlugin = () => {
    try {
      // window.pluginLoaded()
      onCancel()
    } catch (error) {
      message.error(error.message)
    }
  }

  return (
    <AvestError>
      <AvestError.Content>
        <Icon
          type='warning'
          theme='twoTone'
          twoToneColor='orange'
          style={{ fontSize: '7rem', marginBottom: '2rem' }}
        />

        <Text type='warning' style={{ textAlign: 'center' }}>
          Вставьте ключ ЭЦП компании<br />
          {activeCompany.company_data.name}
        </Text>
      </AvestError.Content>

      <AvestError.Footer>
        <Button
          type='primary'
          style={{ marginRight: '2rem' }}
          onClick={runAvestPlugin}
        >
          Продолжить
        </Button>

        <Button
          type='primary'
          onClick={onCancel}
          ghost>
          Отмена
        </Button>
      </AvestError.Footer>
    </AvestError>
  )
}

export default AvestErrorHandling
