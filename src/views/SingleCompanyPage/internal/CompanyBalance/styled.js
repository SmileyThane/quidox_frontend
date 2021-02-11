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
  border: .1rem solid ${rgba(colors.gray, 0.15)};
  border-radius: .4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  margin-right: 2rem;

  .ant-btn {
    margin-top: 1.2rem;
  }
`

List.Item.Name = styled.div`
  width: 100%;
  color: ${colors.blue};
  border-bottom: .1rem solid ${rgba(colors.gray, 0.15)};
  font-size: 2.4rem;
  font-weight: 600;
  padding-bottom: 2rem;
  margin-bottom: 1.6rem;
  text-transform: uppercase;
  text-align: center;
`

List.Item.Amount = styled.div`
  color: ${colors.black};
  font-size: 2.8rem;
  font-weight: 600;

  span {
    color: ${colors.gray};
    font-weight: 400;
  }
`

List.Item.Count = styled.div`
  color: ${colors.black};
  font-weight: 600;

  span {
    color: ${colors.gray};
    font-weight: 400;
  }
`

export {
  Layout,
  List
}
