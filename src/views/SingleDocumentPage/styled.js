import styled, { css } from 'styled-components'

import { Typography } from 'antd'

import { styleguide } from '../../constants'

const { Paragraph } = Typography

const { colors } = styleguide

const Layout = styled.div`
  padding: 2rem;
`

Layout.Inner = styled.div`
`

Layout.Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .ant-btn {
    margin-right: 1.2rem;
  }
`

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3.2rem;
`

Header.Inner = styled.div`
`

Header.Title = styled(Paragraph)`
  && {
    line-height: 1.2;
    font-size: 2.4rem;
    margin-bottom: 0;
  }
`

Header.Secondary = styled.span`
  color: ${colors.gray.dark};
  font-size: 1.2rem;
`

const Details = styled.div`
  border-bottom: .1rem solid ${colors.gray.middle};
  display: flex;
  padding-bottom: 2rem;
  margin-bottom: 2.8rem;

  ${({ noStyle }) => noStyle && css`
    border: 0;
    padding-bottom: 0;
    margin-bottom: 0;

    ${Details.Inner} {
      flex: initial;
      padding-left: 0;

      &:not(:first-child) {
        border: 0;
        margin-left: 6.4rem;
      }
    }
  `}
`

Details.Inner = styled.div`
  flex: 1;

  &:not(:first-child) {
    border-left: .1rem solid ${colors.gray.middle};
    padding-left: 1.2rem;
  }
`

Details.Item = styled.div`
  display: flex;

  &:not(:last-child) {
    margin-bottom: 2rem;
  }

  ${({ align }) => align === 'vertical' && css`
    flex-direction: column;
  `}
`

Details.Label = styled.div`
  width: 14rem;
  min-width: 14rem;
  color: ${colors.gray.dark};
`

Details.Info = styled.div`
`

Details.Text = styled(Paragraph)`
  && {
    margin-bottom: 0;
  }
`

Details.Secondary = styled.span`
  color: ${colors.gray.dark};
`

const Attached = styled.div`
  .ant-tag {
    &:last-child {
      margin-right: 0;
    }
  }
`

Attached.Name = styled.div`
  border-right: .1rem solid ${colors.gray.middle};
  display: inline-flex;
  align-items: center;
  padding-right: 1.6rem;
`

Attached.Name.Text = styled.div`
  width: 21rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

Attached.Name.Type = styled.div`
  line-height: 1;
  border: .1rem solid ${colors.gray.middle};
  border-radius: .4rem;
  font-size: 1.2rem;
  font-weight: 500;
  padding: .4rem .8rem;
  margin-left: .8rem;
  text-transform: uppercase;
`

Attached.Action = styled.a`
  color: ${colors.primary};
  font-size: 1.8rem;
  margin: 0 1.6rem;
`

Attached.Header = styled.div`
  border-bottom: .1rem solid ${colors.gray.middle};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.4rem 0;
`

Attached.Body = styled.div`
  padding: 1.4rem 0;
`

Attached.Tag = styled.div`
  margin: 0 1.6rem;
`

Attached.Inner = styled.div`
  display: flex;
  align-items: center;
`

export {
  Layout,
  Header,
  Details,
  Attached
}
