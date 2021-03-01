import styled from 'styled-components'

const Layout = styled.div`
`

Layout.Picture = styled.div`
  width: 20rem;
  height: 20rem;
  background: url(${({ src }) => src}) no-repeat center / contain;
  margin: 0 auto 1.6rem auto;
`

export {
  Layout
}
