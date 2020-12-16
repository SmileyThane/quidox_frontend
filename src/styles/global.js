import { createGlobalStyle } from 'styled-components'
import { rgba } from 'polished'

import { styleguide } from '../constants'

const { colors } = styleguide

export default createGlobalStyle`
  html {
    font-size: 62.5%;
  }

  body {
    text-rendering: optimizeLegibility;
  }

  a,
  button {
    &.ant-btn {
      display: inline-flex;
      justify-content: center;
      align-items: center;

      & > i {
        &.anticon {
          line-height: 1.2rem;
          font-size: 1.8rem;
        }
      }

      & .anticon + span {
        margin-left: 1.4rem;
      }

      &.ant-btn-primary {
        &.ant-btn-background-ghost {
          &:hover {
            background-color: ${rgba(colors.primary, 0.1)} !important;
          }
        }
      }
    }
  }
`
