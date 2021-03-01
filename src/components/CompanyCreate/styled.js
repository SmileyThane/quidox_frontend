import styled from 'styled-components'
import { styleguide } from '../../constants'

const { colors } = styleguide

const Layout = styled.div`
`

Layout.Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 2rem;

  && {
    .ant-btn {
      margin-left: 1.6rem;
    }
  }
`

Layout.Instruction = styled.div`
  .ant-steps {
    margin-top: 2rem;
  }
`

Layout.List = styled.div`
`

Layout.Item = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: baseline;

  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`

Layout.Item.Title = styled.div`
  width: 24rem;
  min-width: 20rem;
  color: ${colors.gray.dark};
  padding-right: 2rem;
`

Layout.Item.Value = styled.div`
  border-left: .1rem solid ${colors.gray.light};
  padding-right: 2rem;
  overflow: hidden;
`

Layout.Mobile = styled.div`
  .ant-alert {
    margin-bottom: 2rem;
  }
`

export {
  Layout
}
