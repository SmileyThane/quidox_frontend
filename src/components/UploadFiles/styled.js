import styled from 'styled-components'

import { styleguide } from '../../constants'

const { colors } = styleguide

const Upload = styled.div`
  width: 100%;
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

Upload.List = styled.div`
  margin-top: 2rem;
`

Upload.Item = styled.div`
`

Upload.Label = styled.span`
`

Upload.Inner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

Upload.Control = styled.div`
  width: 100%;

  &:not(:last-child) {
    margin-bottom: 1.2rem;
  }

  label {
    display: block;
    margin-bottom: .8rem;
  }

  .ant-calendar-picker,
  .ant-select {
    width: 100%;
  }
`

Upload.Control.Group = styled.div`
  position: relative;

  .ant-input {
    padding-right: 8.4rem;
  }

  .ant-select {
    width: 8.4rem;
    position: absolute;
    top: .1rem;
    right: .1rem;

    .ant-select-selection {
      border: 0 !important;
      box-shadow: none !important;

      &--single {
        height: 4rem;
      }
    }
  }
`

const File = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

Upload.Input = styled.input`
`

export {
  Upload,
  File
}
