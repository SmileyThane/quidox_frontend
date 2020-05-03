import styled from 'styled-components'
import { Button } from 'antd'

const ThemeButton = styled(Button)`
  && {
    background-color: ${({ brand }) => brand ? brand.primary_color : '#40a9ff'};
    border-color: ${({ brand }) => brand ? brand.border_color : '#40a9ff'} !important;
    
    &.ant-btn-background-ghost {
      color: ${({ brand }) => brand ? brand.border_color : '#40a9ff'} !important;
    }
    
    &.ant-btn-link {
      color: ${({ brand }) => brand ? brand.link_color : '#40a9ff'} !important;
      background-color: transparent !important;
      border: none !important;
      font-weight: bold;
      
      &:hover {
        color: ${({ brand }) => brand ? brand.brand_color : '#40a9ff'} !important;
      }
    }
    
    &[disabled] {
      border: none;
      background-color: #f5f5f5;
    }
    
    &:hover {
      background-color: ${({ brand }) => brand ? brand.primary_color : '#40a9ff'};
      opacity: 0.8;
    }
  }
`

export default ThemeButton
