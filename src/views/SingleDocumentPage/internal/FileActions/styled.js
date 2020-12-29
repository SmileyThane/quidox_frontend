import styled, { css } from 'styled-components'
import { Icon, Tooltip } from 'antd'

import { styleguide } from '../../../../constants'

const { colors } = styleguide

const Action = styled(Tooltip)`
  cursor: pointer;

  &:last-of-type {
    margin-right: 0;
  }
`

Action.Icon = styled(Icon)`
  margin-right: 1rem;
  position: relative;

  &:after {
    content: '';
    width: 1rem;
    height: 1rem;
    background-color: ${colors.white};
    display: block;
    position: absolute;
    left: -1rem;
    top: 1rem;
  }
`

const List = styled.div`
  display: flex;
  align-items: center;
`

List.Item = styled.div`
  padding: 0 1.6rem;

  &:not(:first-child) {
    border-left: .1rem solid ${colors.gray.middle};
  }

  ${({ type }) => type === 'danger' && css`
    ${List.Item.Link} {
      color: ${colors.red};
    }
  `}
`

List.Item.Link = styled.a`
  display: inline-flex;
  align-items: center;

  .anticon {
    font-size: 1.8rem;
    margin-right: .8rem;
  }
`

export {
  Action,
  List
}
