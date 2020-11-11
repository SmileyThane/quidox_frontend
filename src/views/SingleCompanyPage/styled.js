import styled from 'styled-components'
import { Tabs } from 'antd'

const { TabPane } = Tabs

const ThemeTabs = styled(Tabs)`

  .ant-tabs-tab {
    color: ${({ brand }) => brand ? brand.link_color : '#40a9ff'};
    &.ant-tabs-tab-active {
      color: ${({ brand }) => brand ? brand.brand_color : '#40a9ff'};
    }
    &:hover {
      color: ${({ brand }) => brand ? brand.brand_color : '#40a9ff'} !important;
    }
  }
  .ant-tabs-ink-bar {
    background-color: ${({ brand }) => brand ? brand.brand_color : '#40a9ff'};
  }
`

ThemeTabs.Pane = styled(TabPane)``

export default ThemeTabs
