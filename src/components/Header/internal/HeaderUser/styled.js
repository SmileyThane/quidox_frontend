import styled from 'styled-components'
import { rgba } from 'polished'

import { styleguide } from '../../../../constants'

const { colors } = styleguide

const User = styled.div`
  height: 100%;
  background-color: ${colors.white};
  border-radius: .4rem;
  display: flex;
  align-items: center;
  padding: 0 1.6rem;
  position: relative;
`

User.Menu = styled.ul`
  background-color: ${colors.white};
  border-radius: .4rem;
  box-shadow: 0 0 1.2rem .4rem ${rgba(colors.black, 0.1)};
  padding: 1.8rem;
  margin: -.6rem -1.6rem 0 0;
  list-style: none;
`

User.Menu.Item = styled.li`
  color: ${colors.gray.dark};

  &:hover {
    color: ${colors.primary};
  }

  .ant-tag {
    width: 100%;
    margin-bottom: 1.2rem;
    text-align: center;
  }
`

User.Menu.Link = styled.a`
  width: 100%;
  color: ${colors.gray.dark};
  display: flex;
  align-items: center;
  padding: .8rem 0;

  &:hover {
    color: ${colors.primary};
  }

  .anticon {
    font-size: 1.8rem;
    margin-right: 1.2rem;
  }
`

User.Toggle = styled.a`
  width: 100%;
  display: flex;
  align-items: center;
  color: ${colors.black};
  cursor: pointer;

  .anticon {
    color: ${colors.primary};
  }
`

User.Toggle.Email = styled.div`
  margin-right: 1.2rem;
`

export {
  User
}
