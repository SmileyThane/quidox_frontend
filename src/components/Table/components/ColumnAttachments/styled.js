import styled from 'styled-components'

import { styleguide } from '../../../../constants'

const { colors } = styleguide

const Column = styled.div`
`

Column.Empty = styled.div`
  color: ${colors.gray.dark};
`

Column.Count = styled.span`
  border-radius: .4rem;
  background-color: ${colors.gray.light};
  color: ${colors.black};
  font-size: 1.2rem;
  font-weight: 500;
  padding: .6rem .8rem;
`

export {
  Column
}
