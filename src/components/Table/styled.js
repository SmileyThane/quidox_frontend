import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

import { styleguide } from '../../constants'

const { colors } = styleguide

const Layout = styled.div`
`

Layout.Column = styled.div`
`

Layout.Column.Theme = styled(Link)`
  color: ${colors.black};

  &:hover {
    color: ${colors.primary};
  }
`

Layout.Pagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

Layout.Pagination.Label = styled.div`
  margin-right: .8rem;
`

Layout.Pagination.List = styled.div`
  display: flex;
  align-items: center;
`

Layout.Pagination.Item = styled.a`
  background-color: ${colors.gray.light};
  border-radius: .4rem;
  color: ${colors.black};
  display: block;
  padding: .4rem .8rem;
  margin-left: .8rem;

  ${({ active }) => active && css`
    background-color: ${colors.primary};
    color: ${colors.white};

    &:hover {
      color: ${colors.white};
    }
  `}
`

Layout.Selected = styled.div`
  display: flex;
  align-items: center;
`

Layout.Selected.Count = styled.div`
  color: ${colors.gray.dark};
  margin-left: .8rem;
`

Layout.Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

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

Layout.Actions.Item = styled.div`
  &:not(:first-child) {
    border-left: .1rem solid ${colors.gray.middle};
    padding-left: 1.6rem;
    margin-left: 1.6rem;
  }
`

export {
  Layout
}
