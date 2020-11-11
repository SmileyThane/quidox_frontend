import styled from 'styled-components'
import { rgba } from 'polished'
import { Menu } from 'antd'

const ThemeMenuItem = styled(Menu.Item)`
  && {
    &.ant-menu-item-selected {
      background-color: ${({ brand }) => brand ? rgba(brand.brand_color, 0.4) : '#C9DAFB'} !important;
    }
    
    &:after {
    border-right-color: ${({ brand }) => brand ? brand.brand_color : '#1890ff'} !important;
    }
  }
`

export default ThemeMenuItem