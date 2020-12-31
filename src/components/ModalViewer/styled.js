import styled from 'styled-components'
import { rgba } from 'polished'

import { close } from '../../resources/img'

import { styleguide } from '../../constants'

const { colors } = styleguide

const ModalViewer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${rgba(colors.black, 0.6)};
  padding: 4rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
`

ModalViewer.Close = styled.a`
  width: 3.6rem;
  height: 3.6rem;
  background: url(${close}) no-repeat center / 2.4rem;
  position: absolute;
  left: 0;
  top: 0;
`

ModalViewer.Picture = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

ModalViewer.Picture.Cotent = styled.img`
  width: 50%;
  height: auto;
  margin: 0 auto;
`

export {
  ModalViewer
}
