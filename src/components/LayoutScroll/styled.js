import styled, { css } from 'styled-components'

const LayoutScroll = styled.div`
  max-height: calc(100vh - ${({ withFooter }) => withFooter ? '17.6rem' : '9.4rem'});
  overflow-y: auto;

  ${({ withFooter }) => withFooter && css`
    padding-bottom: 8.2rem;
  `}
`

export {
  LayoutScroll
}
