import styled, { css } from 'styled-components'

import { Button } from 'antd'

import { styleguide } from '../../constants'

const { colors } = styleguide

const Layout = styled.div`
`

Layout.Centering = styled.div`
  height: calc(100vh - 9.4rem);
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ withSteps }) => withSteps && css`
    height: calc(100vh - 15.6rem);
  `}
`

Layout.Inner = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  text-align: center;
`

Layout.Picture = styled.div`
  width: 11.2rem;
  height: 8rem;
  background: url(${({ src }) => src}) no-repeat center / contain;
  margin-bottom: 4rem;
`

Layout.Secondary = styled.div`
  color: ${colors.gray.dark};
`

Layout.Upload = styled.div`
`

Layout.Upload.Inner = styled.div`
  padding: 2rem;
`

Layout.Action = styled.div`
  margin-top: 2.4rem;
`

Layout.Column = styled.div`
`

Layout.Column.Email = styled.div`
`

Layout.Column.Number = styled.div`
  display: flex;
  align-items: center;
`

Layout.Column.Label = styled.div`
  color: ${colors.gray.dark};
  margin-right: .8rem;
`

Layout.Column.Status = styled.div`
  ${({ status }) => status === 'completed' && css`
    color: ${colors.green};
  `}

  ${({ status }) => status === 'process' && css`
    color: ${colors.orange};
  `}

  ${({ status }) => status === 'error' && css`
    color: ${colors.red};
  `}
`

Layout.Table = styled.div`
  margin-top: 4.8rem;
`

const Upload = styled(Button)`
  && {
    padding: 0;
  }
`

Upload.Field = styled.input`
`

Upload.Label = styled.label`
  height: 4.2rem;
  line-height: 4.2rem;
  display: block;
  cursor: pointer;
  padding: 0 4.8rem;

  .anticon {
    font-size: 1.8rem;
    margin-right: 1.4rem;
  }
`

const Steps = styled.ul`
  border-bottom: .1rem solid ${colors.gray.middle};
  display: flex;
  align-items: center;
  padding: 2rem;
  margin: 0;
`

Steps.Item = styled.li`
  color: ${colors.gray.dark};
  display: flex;
  align-items: center;
  margin-right: 3.2rem;

  ${({ status }) => status === 'completed' && css`
    color: ${colors.green};
  `}

  ${({ status }) => status === 'process' && css`
    color: ${colors.black};
  `}

  .anticon {
    margin-left: .8rem;
  }
`

export {
  Layout,
  Upload,
  Steps
}
