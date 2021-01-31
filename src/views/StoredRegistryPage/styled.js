import styled from 'styled-components'

import { styleguide } from '../../constants'

const { colors } = styleguide

const Layout = styled.div`
  padding: 2rem;

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

export {
  Layout
}
