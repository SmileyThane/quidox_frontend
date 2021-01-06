import styled from 'styled-components'

import { styleguide } from '../../../../constants'

const { colors } = styleguide

const Connect = styled.a`
  height: 100%;
  line-height: 5rem;
  background-color: ${colors.white};
  border-radius: .4rem;
  display: block;
  padding: 0 1.6rem;
  margin-right: 1.2rem;
  transition: .3s;
  white-space: nowrap;
`

export {
  Connect
}
