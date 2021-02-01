import styled, { css } from 'styled-components'

import { styleguide } from '../../../../constants'

const { colors } = styleguide

const Column = styled.div`
  border-radius: .4rem;
  border: .1rem solid ${colors.primary};
  display: inline-flex;
  font-weight: 500;
  font-size: 1.2rem;
  padding: .2rem 1.2rem;
  text-align: center;

  ${({ status }) => status === 'signed' && css`
    background-color: ${colors.primary};
    color: ${colors.white};
  `}

  ${({ status }) => status === 'notSigned' && css`
    color: ${colors.primary};
  `}
`

export {
  Column
}
