import React, { useState, Fragment } from 'react'

import {Button, Modal, Icon, notification} from 'antd'
import { Table, PageDescription } from '../../components'
import { api } from '../../services'
import {importRegistry} from "../../services/api/registry";

  const defaultState = {
    isVisible: false,
    fetching: false,
    messages: [],
    filesWasVerified: 0
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

    const asyncVerify = async (file, bool) => {
      if (bool || file.status.status_data.id === 3) {
        const base64 = await api.files.getBase64File(file.id)
        console.log('base64:', base64)
        try {
          const sertificationObject = window.sign(base64.data.data.encoded_base64_file, file.hash_for_sign)
          const verifiedData = {
            id: file.id,
            hash: sertificationObject.signedData,
            data: sertificationObject.verifiedData,
            hash_for_sign: sertificationObject.hex,
            status: bool ? null : 5
          }

          const confirm = await api.documents.attachmentSignCanConfirm({ key: sertificationObject.verifiedData.key, attachment_id: file.id })
          console.log('Can confirm:', confirm)
          if (confirm.data.success) {
            const verify = await  verifyFile(verifiedData)
            console.log('Was verify:', verify)
          }
        } catch (error) {
          notification['error']({
            message: error.message
          })
        }
      }
    }

    const multipleVerify = () => {
    state.messages.forEach(message => {
      setState({
        ...state,
        isVisible: false
      })
      let chain = Promise.resolve()
      const canBeSigned = message.can_be_signed
      console.log(canBeSigned)
      message.document.attachments.forEach((file) => {
        chain = chain.then(() => asyncVerify(file, canBeSigned))
      })
    })
    }

    console.log(state)
  return (
    <Fragment>
      <div className='content'>
        {!!(documents.data && documents.data.length > 0) &&
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
        <p>Подписать все файлы в {state.messages.length} сообщениях</p>
        <Button type='primary' style={{ marginTop: '2rem' }} onClick={multipleVerify}>Подписать</Button>
        <Button style={{ margin: '2rem 0 0 2rem' }} onClick={() => setState({ ...defaultState })}>Закрыть</Button>
      </Modal>
      }
    </Fragment>
  )
}

export default DocumentsPage
