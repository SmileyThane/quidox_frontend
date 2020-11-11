import styled from 'styled-components'
import { Tag } from 'antd'

const Tariff = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

Tariff.Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: 100%;
  font-size: 1.5rem;
`

Tariff.TagSpan = styled.span`
  border-radius: 2px;
  font-size: 13px;
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  font-weight: normal;
  line-height: 22px;
  padding: 0 8px;
  max-width: 100%;
  overflow: hidden;
  background-color: ${({ brand }) => brand ? brand.brand_color : '#40a9ff'};
  margin: 0.5rem;
  color: #fff;
`

Tariff.Tag = styled(Tag)`
  max-width: 20rem;
  overflow: hidden;
  text-overflow: ellipsis;
`

export {
  Tariff
}
