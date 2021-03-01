import styled from 'styled-components'
import { rgba } from 'polished'

import { styleguide } from '../../constants'

const { colors } = styleguide

const Layout = styled.div`
  padding: 2rem;
`

Layout.Inner = styled.div`
  .ant-row {
    &.ant-form-item {
      margin-bottom: 1.2rem;
    }
  }
`

Layout.Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;

  .ant-avatar {
    background: ${colors.gray.middle};
  }
`

Profile.Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 2rem;
`

Profile.Email = styled.div`
  font-size: 1.8rem;
  margin-bottom: 1.2rem;
`

Profile.Code = styled.div`
  background-color: ${colors.green};
  border-radius: .4rem;
  color: ${colors.white};
  font-size: 1.6rem;
  padding: .4rem 1.8rem;
`

export {
  Layout,
  Profile
}
