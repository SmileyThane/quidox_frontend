import React from 'react'
import Iframe from 'react-iframe'

const quidoxLink = 'https://api.quidox.by/user/avest/verify/'

const EscCheckingPage = () => {
  return (
    <div className='content content_user' style={{ height: '100%' }}>
      <Iframe
        width='100%'
        height='100%'
        url={quidoxLink}
        frameBorder={1}
      />
    </div>
  )
}

export default EscCheckingPage
