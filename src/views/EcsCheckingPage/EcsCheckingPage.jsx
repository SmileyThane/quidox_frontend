import React, { Fragment } from 'react'
import { Typography, Button } from 'antd'

const { Text } = Typography

const avestLink = 'http://dev.avest.by/avjceprovdemoweb/verify_detached_cmx.html'
const quidoxLink = 'https://api.quidox.by/user/avest/verify/'

const EscCheckingPage = () => {
  return (
    <div className='content content_user'>
      <Text>Источники проверки ЭЦП</Text>
      <div>
        <Button onClick={() => window.open(avestLink, '_blank')} type='primary' ghost style={{ margin: '1rem 1rem 0 0' }}>ЗАО Авест</Button>
        <Button onClick={() => window.open(quidoxLink, '_blank')} type='primary' ghost>ООО КвиДокс</Button>
      </div>
    </div>
  )
}

export default EscCheckingPage
