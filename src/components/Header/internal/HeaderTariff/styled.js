import styled from 'styled-components'

import { styleguide } from '../../../../constants'

const { colors } = styleguide

const Tariff = styled.div`
  height: 100%;
  line-height: 1.6;
  background-color: ${colors.white};
  border-radius: .4rem;
  display: flex;
  align-items: center;
  padding: 0 1.6rem;
  margin-right: 1.2rem;
`

Tariff.Item = styled.div`
  white-space: nowrap;

  &:not(:first-child) {
    border-left: .1rem solid ${colors.gray.middle};
    padding-left: 1.2rem;
    margin-left: 1.6rem;
  }
`

Tariff.Item.Label = styled.span`
  color: ${colors.gray.dark};
`

Tariff.Item.Value = styled.span`
  margin-left: .4rem;
`

export {
  Tariff
}
