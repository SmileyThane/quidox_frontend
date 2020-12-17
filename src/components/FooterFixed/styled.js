import styled from 'styled-components'

import { styleguide } from '../../constants'

const { colors } = styleguide

const FooterFixed = styled.div`
  height: 8.2rem;
  background-color: ${colors.white};
  border-radius: 0 0 .4rem .4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  position: fixed;
  left: 29.4rem;
  right: 1.2rem;
  bottom: 1.2rem;
  z-index: 10;

  &:after {
    content: '';
    border-top: .1rem solid ${colors.gray.middle};
    position: absolute;
    top: 0;
    left: 2rem;
    right: 2rem;
  }
`

export {
  FooterFixed
}
