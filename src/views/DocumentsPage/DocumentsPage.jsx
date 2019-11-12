import React, { useState, Fragment } from 'react'

import {Button, Modal, Icon, notification, Progress} from 'antd'
import { Table, PageDescription } from '../../components'
import { api } from '../../services'
import { checkBrowser } from '../../utils'

  const defaultState = {
    isVisible: false,
    fetching: false,
    messages: [],
    processedMessage: 0,
    disabled: false
  }
const DocumentsPage = props => {
  const {
    user: { data },
    documents: { documents, isFetching },
    getDocumentsByActiveCompanyId,
    verifyFile
  } = props

  const [state, setState] = useState({ ...defaultState })

  const params = new URLSearchParams(props.location.search)
  const status = params.get('status')

    const showVerifyModal = () => {
    setState({
      ...state,
      fetching: true
    })
      api.documents.getDocumentsByActiveCompanyId(data.active_company_id, { status: Number(status), selection_type: 'document', is_minified: true })
        .then(({ data }) => {
          if (data.success) {
            setState({
              ...state,
              isVisible: true,
              fetching: false,
              messages: data.data.data
            })
          } else {
            throw new Error(data.error)
          }
        })
        .catch(error => console.log(error))
    }

  const proccesFilesForVerifyFile = async (bool, files) => {
    for (const file of files) {
      if (bool || file.status.status_data.id === 3) {
        const base64 = await api.files.getBase64File(file.id)
        try {
          const sertificationObject = await window.sign(base64.data.data.encoded_base64_file, file.hash_for_sign)
          const verifiedData = {
            id: file.id,
            hash: sertificationObject.signedData,
            data: sertificationObject.verifiedData,
            hash_for_sign: sertificationObject.hex,
            status: bool ? null : 5
          }
          const confirm = await api.documents.attachmentSignCanConfirm({ key: sertificationObject.verifiedData.key, attachment_id: file.id })
          if (confirm.data.success) {
            api.files.verifyFile(verifiedData)
          }
        } catch (error) {
          break
        }
      }
    }
  }

    const multipleVerify = async () => {
    setState({
      ...state,
      disabled: true
    })
      proccesMessageForVerifyFiles(state.messages).then(() => {
        setState({ ...state, disabled: false })
      })
    }

    const proccesMessageForVerifyFiles = async (messages) => {
      for (const [index, message] of messages.entries()) {
        await proccesFilesForVerifyFile(message.can_be_signed, message.document.attachments)
        setState({
          ...state,
          processedMessage: index + 1
        })
      }
    }

  return (
    <Fragment>
      <div className='content'>
        {!!(documents.data && documents.data.length > 0) && checkBrowser('ie') &&
          <Button
            type='primary'
            style={{ margin: '2rem' }}
            onClick={showVerifyModal}
          >
            <Icon type={state.fetching ? 'loading' : 'edit'} />
            Подписать все</Button>
        }
        <Table
          className='document-table'
          tableData={documents}
          loading={isFetching}
          getDocumentsWithParams={getDocumentsByActiveCompanyId}
          activeCompany={data.active_company_id}
          type='document'
          status={Number(status)}
        />
      </div>

      <PageDescription
        // isVisible={(draftDocuments.data && !draftDocuments.data.length)}
        title='В эту папку Вы сможете сохранить черновик любого сообщения.'
        text={['Вы сможете в любой момент продолжить редактирование сообщения и отправить его адресату.']}
      />
      {state.isVisible &&
      <Modal visible closable={false} footer={null}>
        <p>Файлов подписано: {state.processedMessage}</p>
        <Progress percent={Math.floor((state.processedMessage / state.messages.length) * 100)} />
        <Button type='primary' style={{ marginTop: '2rem' }} disabled={state.disabled} onClick={multipleVerify}>Подписать</Button>
        <Button style={{ margin: '2rem 0 0 2rem' }} onClick={() => setState({ ...defaultState })}>Закрыть</Button>
      </Modal>
      }
    </Fragment>
  )
}

export default DocumentsPage
