import styled from 'styled-components'

import { styleguide } from '../../constants'

const { colors } = styleguide

const Layout = styled.div`
  h3.ant-typography {
    margin-bottom: .4rem;
  }
`

Layout.SubTitle = styled.div`
  color: ${colors.gray.dark};
  font-size: 1.6rem;
`

Layout.Inner = styled.div`
  width: 68rem;
  background-color: ${colors.white};
  border-radius: .4rem;
  padding: 3.2rem;

  .ant-row {
    &.ant-form-item {
      margin: 1.2rem 0 0 0;
    }
  }

  && {
    .ant-alert {
      padding: 1.6rem 2.8rem;

      .ant-alert-message {
        display: none;
      }
    }
  }
`

Layout.Steps = styled.div`
`

Layout.Steps.Points = styled.div`
  margin: 2.4rem 0;
`

Layout.Check = styled.div`
  margin: 2.4rem 0;
`

Layout.Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 3.2rem;
`

Layout.Actions.Register = styled.div`
  width: 100%;
  margin-top: 2.4rem;
`

export {
  Layout
}
