import styled from 'styled-components'

import { styleguide } from '../../constants'

const { colors } = styleguide

const Upload = styled.div`
  width: 100%;
`

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

const File = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

Upload.Input = styled.input``

Upload.List = styled.div`
  margin-top: 2rem;
`

export {
  Upload,
  File
}
