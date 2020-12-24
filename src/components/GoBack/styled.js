import styled from 'styled-components'
import { rgba } from 'polished'

import { styleguide } from '../../constants'

const { colors } = styleguide

const Button = styled.div`
  width: 4.2rem;
  height: 4.2rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: .1rem solid ${rgba(colors.primary, 0.5)};
  border-radius: .4rem;
  font-size: 2.1rem;
  color: ${colors.primary};
  transition: .3s linear;
  margin-right: 2.8rem;

  &:hover {
    border-color: ${colors.primary};
  }
`

export {
  Button
}
