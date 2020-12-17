import styled from 'styled-components'

import { Layout } from 'antd'

import { styleguide } from '../../constants'

const { colors } = styleguide

const LayoutContent = styled(Layout.Content)`
  background-color: ${colors.white};
  border-radius: .4rem;
  position: relative;
`

export {
  LayoutContent
}
