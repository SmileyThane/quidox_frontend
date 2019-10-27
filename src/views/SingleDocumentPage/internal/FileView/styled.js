import styled from 'styled-components'
import { rgba } from 'polished'
import { styleguide } from '../../../../constants'
import { close } from '../../../../resources/img'

const { colors } = styleguide

const PDF = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: ${rgba(colors.black, 0.6)};
`

PDF.Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 4rem;
`

PDF.HeaderClose = styled.div`
  width: 4rem;
  height: 4rem;
  max-width: 4rem;
  background: url(${close}) center no-repeat;
`

export {
  PDF
}
