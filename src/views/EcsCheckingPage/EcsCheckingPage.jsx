import React from 'react'
import { Typography, Button } from 'antd'

const { Text } = Typography

const avestLink = 'http://dev.avest.by/avjceprovdemoweb/verify_detached_cmx.html'
const quidoxLink = 'https://api.quidox.by/user/avest/verify/'

const EscCheckingPage = () => {
  return (
    <div className='content content_user'>
      <Text>Источники проверки ЭЦП</Text>
      <div>
        <Button
          type='primary'
          ghost
          onClick={() => window.open(avestLink, '_blank')}
          style={{ margin: '1rem 1rem 0 0' }}
        >
          ЗАО Авест
        </Button>

        <Button
          type='primary'
          ghost
          onClick={() => window.open(quidoxLink, '_blank')}
        >
          ООО КвиДокс
        </Button>
      </div>
    </div>
  )
}

export default EscCheckingPage
