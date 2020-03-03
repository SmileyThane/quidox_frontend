import styled from 'styled-components'
import { styleguide } from '../../constants'

const { colors } = styleguide

const Upload = styled.div`

`

Upload.Button = styled.label`
  display: inline-block;
  padding: .5rem 1rem;
  text-align: center;
  border: 1px solid ${colors.dodgerBlue};
  cursor: pointer;
`

export {
  Upload
}
