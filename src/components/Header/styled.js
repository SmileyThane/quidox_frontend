import styled from 'styled-components'

import { Layout } from 'antd'

const Header = styled(Layout.Header)`
  width: 100%;
`

Header.Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`

Header.Brand = styled.div`
  width: 24.6rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

Header.Brand.Logo = styled.a`
  width: 14.6rem;
  height: 4rem;
  background: url(${({ src }) => src}) no-repeat center / contain;
  display: block;
`

Header.Params = styled.div`
  width: calc(100% - 28.2rem);
  height: 5rem;
  display: flex;
  align-items: center;
`

export {
  Header
}
