import styled from 'styled-components'
import { rgba } from 'polished'

import { styleguide } from '../../../../constants'

const { colors } = styleguide

const Layout = styled.div`
`

Layout.Inner = styled.div`
  margin: 1.6rem 0;
`

const List = styled.div`
  display: flex;
  align-items: stretch;
  margin: 3.6rem 0;
`

List.Item = styled.div`
  width: 26rem;
  background-color: ${rgba(colors.primary, 0.1)};
  border-radius: .4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.8rem;
  margin-right: 2rem;

  .ant-btn {
    margin-top: 2.4rem;
  }
`

List.Item.Picture = styled.div`
  width: 100%;
  height: 10rem;
  background: url(${({ src }) => src}) no-repeat center / contain;
  margin-bottom: 2rem;
`

List.Item.Name = styled.div`
  width: 100%;
  border-bottom: .1rem solid ${rgba(colors.primary, 0.11)};
  font-size: 2.1rem;
  padding-bottom: 2rem;
  margin-bottom: 2rem;
  text-transform: uppercase;
  text-align: center;
`

List.Item.Amount = styled.div`
  color: ${colors.primary};
  font-size: 2.4rem;
`

List.Item.Count = styled.div`
  color: ${colors.gray.dark};
`

export {
  Layout,
  List
}
