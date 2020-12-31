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

  .ant-tag {
    line-height: 2.2rem !important;

    &.ant-tag-orange {
      border: 0;
      color: ${colors.orange};
    }
  }

  .ui-table-inside {
    .ant-table {
      .ant-table-thead {
        th {
          background: transparent;
          border: 0;
          color: ${colors.gray.dark};
          font-size: 1.2rem;
          padding: 0 1.2rem;

          &:first-child {
            padding-left: 0;
          }

          &:last-child {
            padding-right: 0;
          }
        }
      }

      .ant-table-tbody {
        .ant-table-row {
          &:hover {
            td {
              background-color: ${colors.white};
            }
          }

          td {
            border-color: ${colors.gray.middle};
            padding: 1.6rem 1.2rem;

            &:first-child {
              padding-left: 0;
            }

            &:last-child {
              padding-right: 0;
            }
          }
        }
      }
    }
  }

  .ant-calendar-picker {
    .anticon {
      &.anticon-calendar {
        width: 1.8rem;
        height: 1.8rem;
        color: ${colors.primary};
        font-size: 1.8rem;
        margin-top: -1rem;
      }
    }
  }
`
