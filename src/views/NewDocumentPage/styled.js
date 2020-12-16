import styled from 'styled-components'

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
    border: .1rem solid ${colors.gray.middle};
    border-radius: .4rem;
    position: absolute;
    bottom: 4.2rem;
    right: 0;
    padding: 1.2rem;
    z-index: 999;

    ul {
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        &:not(:last-child) {
          border-bottom: .1rem solid ${colors.gray.middle};
        }

        a {
          color: ${colors.gray.dark};
          display: block;
          padding: .8rem 1.2rem;

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
