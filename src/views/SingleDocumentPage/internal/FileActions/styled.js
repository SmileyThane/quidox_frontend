import styled from 'styled-components'
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

export {
  Action
}
