import styled from 'styled-components'

import { styleguide } from '../../constants'

const { colors } = styleguide

const Upload = styled.div`
  width: 100%;

  .ant-list-empty-text {
    display: none;
  }
`

Upload.Button = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  transition: .3s;

  .anticon {
    font-size: 1.8rem;
    margin-right: .8rem;
  }

  &:hover {
    color: ${colors.primary};
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
