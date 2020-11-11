import styled from 'styled-components'
import { styleguide } from '../../constants'

// const { colors } = styleguide

const AvestError = styled.div`
  padding: 1rem;
`

AvestError.Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`

AvestError.Footer = styled.div`
  text-align: center;
`

export {
  AvestError
}
