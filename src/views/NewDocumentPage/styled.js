import styled from 'styled-components'
import { rgba } from 'polished'

import { styleguide } from '../../constants'

const { colors } = styleguide

const Layout = styled.div`
  padding: 2rem;
`

Layout.Inner = styled.div`
`

Layout.Control = styled.div`
  &:not(:last-child) {
    margin-bottom: 1.2rem;
  }

  label {
    display: block;
    margin-bottom: .8rem;
  }

  .control-comment {
    height: 12.4rem !important;
  }
`

Layout.Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

Layout.Actions.Calendar = styled.div`
  margin-left: 1.2rem;
  position: relative;

  .react-add-to-calendar__dropdown {
    width: 100%;
    background-color: ${colors.white};
    box-shadow: 0 0 1.2rem .4rem ${rgba(colors.black, 0.1)};
    border-radius: .4rem;
    position: absolute;
    bottom: 4.8rem;
    right: 0;
    padding: 1.8rem;
    z-index: 999;

    ul {
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        a {
          color: ${colors.gray.dark};
          display: block;
          padding: .8rem 0;

          &:hover {
            color: ${colors.primary};
          }
        }
      }
    }
  }
`

export {
  Layout
}
