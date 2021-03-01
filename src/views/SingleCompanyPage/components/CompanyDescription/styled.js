import styled, { css } from 'styled-components'
import { styleguide } from '../../../../constants'

const { colors } = styleguide

const Layout = styled.div`
`

Layout.List = styled.div`
  margin-top: 1.2rem;
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

  ${({ primary }) => primary && css`
    color: ${colors.primary};
  `}
`

Layout.Actions = styled.div`
  display: flex;
  align-items: center;
  margin-top: 3.2rem;

  && {
    .ant-btn {
      margin-right: 1.6rem;
    }
  }
`

export {
  Layout
}
