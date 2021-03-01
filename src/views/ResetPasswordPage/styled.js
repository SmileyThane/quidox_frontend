import styled from 'styled-components'

import { styleguide } from '../../constants'

const { colors } = styleguide

const Layout = styled.div`
`

Layout.Inner = styled.div`
  width: 38rem;
  background-color: ${colors.white};
  border-radius: .4rem;
  padding: 3.2rem;

  .ant-row {
    &.ant-form-item {
      margin: 1.2rem 0 0 0;
    }
  }
`

export {
  Layout
}
