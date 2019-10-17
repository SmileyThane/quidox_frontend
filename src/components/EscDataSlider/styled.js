import styled from 'styled-components'
import { styleguide } from '../../constants'

const { colors } = styleguide

const EscData = styled.div`
  padding: 1rem;
`

EscData.Head = styled.div`
  display: flex;
  align-content: center;
  justify-content: flex-start;
  padding-bottom: 2rem;
  margin-bottom: 2rem;
  border-bottom: .1rem solid ${colors.alto};
`

EscData.Arrow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: .4rem;
  cursor: pointer;
  transition: .3s ease-in-out;
  &:first-of-type {
    margin-left: 1rem;
    margin-right: .5rem;
  }
  &:hover {
    background: rgba(${colors.dodgerBlue}, 0.2);
  }
`

EscData.Body = styled.div`
`
EscData.BodyItem = styled.div`
  display: flex;
  margin-bottom: 1rem;
`

EscData.BodyItemLeft = styled.div`
  flex-basis: 30%;
  padding-right: .5rem;
  text-align: right;
`

EscData.BodyItemRight = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 70%;
  text-align: left;
  padding-left: .5rem;
  border-left: .1rem solid ${colors.alto};
`

EscData.BodyItemRightCert = styled.div`
  margin-bottom: .5rem;
`

EscData.Footer = styled.div`
  margin-bottom: 2rem;
`

export {
  EscData
}
