import styled from 'styled-components'

import { Typography } from 'antd'

import { styleguide } from '../../constants'

const { Paragraph } = Typography

const { colors } = styleguide

const Layout = styled.div`
  padding: 2rem;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3.2rem;
`

Header.Inner = styled.div`
`

Header.Title = styled(Paragraph)`
  && {
    line-height: 1.2;
    font-size: 2.4rem;
    margin-bottom: 0;
  }
`

Header.Secondary = styled.span`
  color: ${colors.gray.dark};
  font-size: 1.2rem;
`

export {
  Layout,
  Header
}
