import styled from 'styled-components'
import { styleguide } from '../../constants'

const { colors } = styleguide

const CompanyData = styled.ul`
  margin: 0;
  padding: 1rem;
  list-style: none;
`
CompanyData.Item = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  margin-bottom: 1.5rem;
  &:last-of-type {
    margin-bottom: 0;
  }
`

CompanyData.ItemTitle = styled.div`
  width: 14.2rem;
  min-width: 14.2rem;
  padding-right: 1.5rem;
  text-align: right;
  color: ${colors.gray};
`

CompanyData.ItemContent = styled.div`
  padding-left: 1.5rem;
  font-size: 1.5rem;
  border-left: .1rem solid ${colors.alto};
  overflow:hidden;
`

export {
  CompanyData
}
