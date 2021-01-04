import styled from 'styled-components'

import {
  Input,
  Icon
} from 'antd'

import { styleguide } from '../../../../constants'

const { colors } = styleguide

const Search = styled.div`
  width: 100%;
  margin-right: 1.2rem;
  position: relative;
`

Search.Icon = styled(Icon)`
  && {
    color: ${colors.gray.dark};
    font-size: 1.8rem;
    position: absolute;
    top: 50%;
    left: 1.6rem;
    transform: translateY(-50%);
    z-index: 2;
  }
`

Search.Input = styled(Input)`
  && {
    height: 5rem;
    line-height: 5rem;
    border: 0 !important;
    padding-left: 4.8rem;
    padding-right: 4.8rem;
  }
`

Search.Config = styled.a`
  line-height: 1;
  color: ${colors.gray.dark};
  position: absolute;
  top: 50%;
  right: 1.6rem;
  transform: translateY(-50%);
  z-index: 2;

  .anticon {
    font-size: 1.8rem;
  }
`

export {
  Search
}
