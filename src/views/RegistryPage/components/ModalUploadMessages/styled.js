import styled from 'styled-components'

import { Icon } from 'antd'

import { styleguide } from '../../../../constants'

const { colors } = styleguide

const Layout = styled.div`
  padding: 1.6rem;
`

Layout.Icon = styled(Icon)`
  margin-bottom: 2rem;

  && {
    font-size: 3.6rem;
  }
`

Layout.Progress = styled.div`
  margin-bottom: 2.4rem;
`

Layout.Progress.Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: .8rem;
`

Layout.Progress.Count = styled.div`
  color: ${colors.gray.dark};
  display: flex;
  align-items: center;
`

Layout.Progress.Value = styled.div`
  color: ${colors.black};
  margin-left: 1.2rem;
`

export {
  Layout
}
