import styled from 'styled-components'
import { rgba } from 'polished'
import { styleguide } from '../../../../constants'
import { Icon, Tag, Avatar } from 'antd'

const { colors } = styleguide

const User = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  height: 100%;
  padding: 0 2rem 0 1.5rem;
`

User.Dropdown = styled.ul`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 5;
  padding: 0;
  list-style: none;
  border: .1rem solid ${colors.alto};
  background-color: ${colors.white};
  box-shadow: -0.9rem .9rem .5rem -0.5rem ${rgba('#000', 0.1)};
`

User.DropdownItem = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  border-bottom: .1rem solid ${rgba('#E0E0E0', 0.5)};
  transition: .3s ease-in-out;
  padding: 1rem 1rem 1rem 2rem;
  cursor: pointer;
  
  &:hover {
    background-color: ${rgba('#E0E0E0', 0.3)};
  }
`

User.DropdownIcon = styled(Icon)`
  margin-right: 1rem;
`

User.DropdownTag = styled(Tag)`
  width: 100%;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
`

User.Info = styled.a`
  display: flex;
  width: 100%;
  color: ${colors.alto};
  align-items: center;
  cursor: pointer;
  
  i {
  color: ${rgba('#000', 0.65)};
  }
  
  &:active,
  &:focus,
  &:hover {
    color: ${rgba('#000', 0.65)};
  }
`

User.InfoAvatar = styled(Avatar)`
  && {
    margin-right: 1rem;
  }
`

User.InfoArrow = styled(Icon)`
  margin-left: 1rem;
`

export {
  User
}
