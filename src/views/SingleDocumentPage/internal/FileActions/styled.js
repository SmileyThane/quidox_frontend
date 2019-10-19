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
`

export {
  ActionTooltip,
  ActionIcon
}
