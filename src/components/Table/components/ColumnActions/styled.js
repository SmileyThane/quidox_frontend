import styled from 'styled-components'

import { styleguide } from '../../../../constants'

const { colors } = styleguide

const Column = styled.div`
  display: flex;
  justify-content: flex-end;
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

Column.Item = styled.div`
  &:not(:first-child) {
    border-left: .1rem solid ${colors.gray.middle};
    padding-left: .8rem;
    margin-left: .8rem;
  }
`

Column.Download = styled.a`
`

export {
  Column
}
