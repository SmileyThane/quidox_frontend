import styled from 'styled-components'
import { rgba } from 'polished'

import { styleguide } from '../../constants'

const { colors } = styleguide

const Layout = styled.div`
  padding: 2rem;
`

Layout.Inner = styled.div`
`

Layout.Table = styled.div`
  a {
    color: ${colors.black};
  }
`

Layout.Table.Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3.2rem;

  && {
    .ant-btn {
      height: auto;
      color: ${colors.black};
      padding: 0;

      &:not(:first-child) {
        margin-left: 3.2rem;
      }

      .anticon {
        color: ${colors.primary};
      }

      &:hover {
        color: ${colors.primary};
      }
    }
  }
`

Layout.Table.Body = styled.div`
`

Layout.Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Explorer = styled.div`
  background-color: ${rgba(colors.primary, 0.1)};
  border-radius: .4rem;
  display: flex;
  align-items: center;
  padding: 2rem;
  margin-bottom: 2rem;
`

Explorer.Picture = styled.div`
  width: 6.4rem;
  height: 6.4rem;
  background: url(${({ src }) => src}) no-repeat center / contain;
  margin-right: 2rem;
`

Explorer.Inner = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`

Explorer.Title = styled.div`
  font-size: 2rem;
`

Explorer.Details = styled.div`
`

export {
  Layout,
  Explorer
}
