import styled from 'styled-components'

import { styleguide } from '../../constants'

const { colors } = styleguide

const Layout = styled.div`
`

Layout.Inner = styled.div`
  padding: 2rem;
`

Layout.Table = styled.div`
`

Layout.Table.Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3.2rem;

  && {
    .ant-btn {
      height: auto;
      color: ${colors.black};
      padding: 0;

      .anticon {
        color: ${colors.primary};
      }

      &:hover {
        color: ${colors.primary};
      }
    }
  }
`

Layout.Table.Column = styled.div`
  display: flex;
  align-items: center;

  && {
    .ant-btn {
      &:not(:first-child) {
        margin-left: 3.2rem;
      }
    }
  }
`

Layout.Table.Body = styled.div`
`

export {
  Layout
}
