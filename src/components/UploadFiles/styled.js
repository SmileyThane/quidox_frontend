import styled from 'styled-components'

import { styleguide } from '../../constants'

const { colors } = styleguide

const Upload = styled.div``

Upload.Button = styled.label`
  font-size: 1.4rem;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  padding: .7rem 1.5rem;
  width: 26.6rem;
  color: ${colors.blue};
  border: .1rem solid ${colors.blue};
  background-color: transparent;
  transition: .3s linear;
  cursor: pointer;
  &:hover {
    color: ${colors.white};
    background-color: ${colors.blue};
  }
`

Upload.Input = styled.input``

export default Upload
