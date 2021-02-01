import styled from 'styled-components'

import { styleguide } from '../../../../constants'

const { colors } = styleguide

const Column = styled.div`
`

Column.Email = styled.div`
  width: 100%;
  max-width: 26rem;
  color: ${colors.black};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

Column.Company = styled.div`
  width: 100%;
  max-width: 26rem;
  color: ${colors.gray.dark};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export {
  Column
}
