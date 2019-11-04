import React, { Fragment } from 'react'

import { Typography } from 'antd'
import { Upload } from './styled'

const { Text } = Typography

const RegistryPage = () => {
  return (
    <div className='content' style={{ padding: '1rem' }}>
      <Text>
        <strong>Работа с Реестром документов</strong> - это простой встроенный сервис для работы с большим количеством
        сообщений и документов, который позволит Вам принимать решение об интеграции Ваших систем (1С, CRM и др.)
        Работа с Реестром документов более детально описана <a href='#'>тут</a>.
      </Text>
      <Upload>
        <Upload.Button htmlFor='upload'>
          Загрузить
          <input
            hidden
            type='file'
            id='upload'
            accept='application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          />
        </Upload.Button>
      </Upload>
    </div>
  )
}

export default RegistryPage
