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
  color: ${({ brand }) => brand ? brand.link_color : '#40a9ff'};
  border: .1rem solid  ${({ brand }) => brand ? brand.border_color : '#40a9ff'};
  background-color: transparent;
  transition: .3s linear;
  cursor: pointer;
  &:hover {
    color: ${colors.white};
    background-color: ${({ brand }) => brand ? brand.primary_color : '#40a9ff'};
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
