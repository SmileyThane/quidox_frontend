import styled, { css } from 'styled-components'
import { rgba } from 'polished'

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
  border-bottom: .1rem solid ${colors.gray.middle};
  padding-bottom: 1.6rem;
  margin-bottom: 1.6rem;
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

Upload.Input = styled.input`
`

const File = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2.1rem;
`

File.Controls = styled.div`
  display: flex;
  flex-direction: column;
`

File.Controls.List = styled.div`
  display: flex;
  align-items: center;
`

File.Controls.Item = styled.a`
  border-radius: .4rem;
  display: inline-block;
  font-size: 1.2rem;
  font-weight: 500;
  margin-right: .8rem;
  padding: .2rem 1.2rem;
  white-space: nowrap;
  transition: .3s;

  ${({ type }) => type === 'blue' && css`
    background-color: ${rgba(colors.primary, 0.1)};
    color: ${colors.primary};

    &:hover {
      background-color: ${rgba(colors.primary, 0.2)};
      color: ${colors.primary};
    }

    ${({ selected }) => selected && css`
      background-color: ${colors.primary} !important;
    `}
  `}

  ${({ type }) => type === 'gray' && css`
    background-color: ${colors.gray.light};
    color: ${colors.black};

    &:hover {
      background-color: ${colors.gray.middle};
      color: ${colors.black};
    }

    ${({ selected }) => selected && css`
      background-color: ${colors.black} !important;
    `}
  `}

  ${({ type }) => type === 'green' && css`
    background-color: ${rgba(colors.green, 0.1)};
    color: ${colors.green};

    &:hover {
      background-color: ${rgba(colors.green, 0.2)};
      color: ${colors.green};
    }

    ${({ selected }) => selected && css`
      background-color: ${colors.green} !important;
    `}
  `}

  ${({ type }) => type === 'orange' && css`
    background-color: ${rgba(colors.orange, 0.1)};
    color: ${colors.orange};

    &:hover {
      background-color: ${rgba(colors.orange, 0.2)};
      color: ${colors.orange};
    }

    ${({ selected }) => selected && css`
      background-color: ${colors.orange} !important;
    `}
  `}

  ${({ selected }) => selected && css`
    color: ${colors.white} !important;
  `}
`

File.Controls.Label = styled.div`
  margin-bottom: .8rem;
`

export {
  Upload,
  File
}
