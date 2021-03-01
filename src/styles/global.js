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

  .ui-table-list {
    .ant-table {
      .ant-table-thead {
        th {
          background: transparent;
          border-bottom: .1rem solid ${colors.gray.middle};
          color: ${colors.gray.dark};
          padding: 1.4rem 1.2rem;

          &:first-child {
            padding-right: 0;
            padding-left: 0;
            text-align: left;
          }

          &:last-child {
            padding-right: 0;
            text-align: right;
          }

          &.ant-table-column-sort {
            background: ${colors.white};

            &:hover {
              background: ${colors.white};
            }
          }
        }
      }

      .ant-table-tbody {
        .ant-table-row {
          &.ant-table-row-selected,
          &:hover {
            td {
              background-color: ${colors.white};
            }
          }

          td {
            border-color: ${colors.gray.middle};
            padding: 2rem 1.2rem;

            &:first-child {
              padding-right: 0;
              padding-left: 0;
              text-align: left;
            }

            &:last-child {
              padding-right: 0;
              text-align: right;
            }

            &.ant-table-column-sort {
              background-color: ${colors.white};
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

  .ant-modal {
    .ant-modal-content {
      .ant-row {
        &.ant-form-item {
          margin-bottom: 1.2rem;
        }
      }

      .ant-modal-header {
        border: 0;
        padding-top: 2.4rem;

        .ant-modal-title {
          line-height: 2.8rem;
          font-size: 2.1rem;
        }
      }

      .ant-modal-footer {
        border: 0;
        padding: 2.4rem;

        button {
          & + button {
            margin-left: 1.6rem;
          }
        }
      }
    }

    &.ui-modal-connect {
      .ant-modal-body {
        padding-top: 0;
      }
    }
  }
`
