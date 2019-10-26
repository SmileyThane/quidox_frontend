import styled from 'styled-components'
import { Icon, Tooltip } from 'antd'
import { styleguide } from '../../../../constants'

const { colors } = styleguide

const ActionTooltip = styled(Tooltip)`
  cursor: pointer;
  &:last-of-type {
  margin-right: 0;
  }
`

const ActionIcon = styled(Icon)`
  margin-right: 1rem;
  position: relative;
  &:after {
    display: block;
    content: "";
    position: absolute;
    left: -10px;
    top: 10px;
    width: 10px;
    height: 10px;
    background-color: #fff;
  }
`

export {
  ActionTooltip,
  ActionIcon
}
