import React from 'react'
import PDFJSBACKEND from '../../backends/pdfjs'

import { PDFViewer } from '../'

import { ModalViewer } from './styled'

export default ({
  document,
  onClose
}) => (
  <ModalViewer>
    <ModalViewer.Close onClick={onClose} />

    {['jpg', 'png', 'jpeg'].includes(document.fileType.split('.').pop()) ? (
      <ModalViewer.Picture>
        <ModalViewer.Picture.Content src={document.fileLink} alt='document' />
      </ModalViewer.Picture>
    ) : (
      <PDFViewer
        backend={PDFJSBACKEND}
        src={document.fileLink}
      />
    )}
  </ModalViewer>
)
