import styled from 'styled-components'
import { rgba } from 'polished'

import { styleguide } from '../../constants'

const { colors } = styleguide

const MainMenu = styled.div`
  width: 27rem;
  min-width: 27rem;
  background-color: ${colors.gray.light};
  margin-right: 1.2rem;
`

MainMenu.CreateMessage = styled.div`
  margin-bottom: 1.2rem;

  .ant-btn {
    & > .anticon {
      font-size: 1.8rem;
      vertical-align: -0.4rem;

      & + span {
        margin-left: 1.4rem;
      }
    }
  }
`

MainMenu.Inner = styled.div`
  .ant-menu {
    border: 0;
    background-color: transparent;

    .ant-menu-item {
      border-radius: .4rem;
      padding: 0 1.2rem !important;

      a {
        display: flex;
        align-items: center;

        .anticon {
          margin-right: 1.4rem;
        }
      }
    }

    .ant-menu-submenu {
      .ant-menu-submenu-title {
        padding-left: 1.2rem !important;
        margin-bottom: .8rem;
      }

      .ant-menu-sub {
        width: calc(100% - 2rem);
        background-color: transparent;
        border-left: .1rem solid ${rgba(colors.primary, 0.6)};
        margin: 0 0 .8rem 2rem;

        .ant-menu-item {
          height: 3.2rem;
          line-height: 3.2rem;
          border-radius: 0 .4rem .4rem 0;
          display: flex;
          align-items: center;

          &.menu-item-status {
            padding-left: 2.2rem !important;

            &:before {
              content: '';
              width: .8rem;
              height: .8rem;
              border: .2rem solid ${colors.gray.middle};
              border-radius: 50%;
            }

            &.status-1 {
              &:before {
                background-color: ${colors.gray.middle};
              }
            }

            &.status-2 {
              &:before {
                background-color: ${colors.orange};
                border-color: ${colors.orange};
              }
            }

            &.status-3 {
              &:before {
                background-color: ${colors.green};
                border-color: ${colors.green};
              }
            }

            &.status-4 {
              &:before {
                background-color: ${colors.white};
                border-color: ${colors.orange};
              }
            }

            &.status-5 {
              &:before {
                background-color: ${colors.white};
                border-color: ${colors.green};
              }
            }

            &.status-6 {
              &:before {
                background-color: ${colors.red};
                border-color: ${colors.red};
              }
            }
          }

          a {
            padding-left: 1.2rem;
          }
        }
      }
    }
  }
`

MainMenu.SubTitle = styled.div`
`

export {
  MainMenu
}
