import styled from 'styled-components'

import { styleguide } from '../../constants'

const { colors } = styleguide

const Layout = styled.div`
`

Layout.Inner = styled.div`
  display: flex;
  align-items: stretch;
`

Layout.Form = styled.div`
  width: 38rem;
  background-color: ${colors.white};
  border-radius: .4rem 0 0 .4rem;
  padding: 3.2rem;

  .ant-row {
    &.ant-form-item {
      margin: 1.2rem 0 0 0;
    }
  }
`

Layout.Actions = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 2rem;
  text-align: center;

  && {
    .ant-btn {
      margin-top: 1.2rem;
    }
  }

  a {
    width: 100%;
  }
`

Layout.Actions.Register = styled.div`
  width: 100%;
  margin-top: 2.4rem;
`

Layout.Carousel = styled.div`
  width: 64rem;
  border-radius: 0 .4rem .4rem 0;
  overflow: hidden;

  .ant-carousel {
    height: 100%;

    .slick-slider {
      margin-bottom: -.5rem;
    }
  }
`

Layout.Carousel.Item = styled.div`
  width: 100%;
  height: 63.5rem;
  background: url(${({ src }) => src}) no-repeat center / cover;
`

export {
  Layout
}
