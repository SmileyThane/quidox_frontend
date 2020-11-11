import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ThemeRouterLink = styled(Link)`
  color: ${({ brand }) => brand ? brand.link_color : '#40a9ff'};
  
  &:hover {
    color: ${({ brand }) => brand ? brand.brand_color : '#1890ff'};
  }
`

export default ThemeRouterLink
