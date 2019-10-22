import styled from 'styled-components'
import { Layout } from 'antd'
import { styleguide } from '../../constants'

const { colors } = styleguide
const { Header } = Layout


const HeaderContent = styled(Header)`
  && {
    background: ${colors.white};
    border-bottom: .1rem solid ${colors.alto};
    height: 8rem;
  }
`

HeaderContent.Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`

HeaderContent.LeftAside = styled.aside`
  min-width: 30rem;
  width: 30rem;
  text-align: center;
`

HeaderContent.Logo = styled.img`
  max-width: 20rem;
`

export {
  HeaderContent
}
