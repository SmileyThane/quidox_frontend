import React, { useState, Fragment } from 'react'

import { Button, Modal, Icon, notification, Progress } from 'antd'
import { Table, PageDescription } from '../../components'
import { api } from '../../services'
import { checkBrowser } from '../../utils'

const defaultState = {
  isVisible: false,
  fetching: false,
  messages: [],
  processedFiles: 0,
  disabled: false,
  buttonsFetching: [false, false],
  type: '',
  not_applied_attachments_count: 0,
  idsForRemove: null
}
const DocumentsPage = props => {
  const {
    user: { data },
    documents: { documents, isFetching },
    getDocumentsByActiveCompanyId,
    removeDocumentsByIds
  } = props

  const [state, setState] = useState({ ...defaultState })

  const params = new URLSearchParams(props.location.search)
  const status = params.get('status')

  const showVerifyModal = () => {
    setState({
      ...state,
      buttonsFetching: [true, false]
    })
    api.documents.getDocumentsByActiveCompanyId(data.active_company_id, { status: Number(status), selection_type: 'document', is_minified: true })
      .then(({ data }) => {
        if (data.success) {
          const notApplied = data.data.data.reduce((acc, el) => acc + (el.document.not_applied_attachments_count), 0)
          setState({
            ...state,
            isVisible: true,
            fetching: false,
            type: 'verify',
            messages: data.data.data,
            not_applied_attachments_count: notApplied
          })
        } else {
          throw new Error(data.error)
        }
      })
      .catch(error => console.log(error))
  }

  const showRemoveModal = () => {
    setState({
      ...state,
      buttonsFetching: [false, true]
    })
    api.documents.getDocumentsByActiveCompanyId(data.active_company_id, { status: Number(status), selection_type: 'document', is_minified: true })
      .then(({ data }) => {
        if (data.success) {
          const notApplied = data.data.data.length
          const ids = data.data.data.map(i => i.id)
          setState({
            ...state,
            isVisible: true,
            fetching: false,
            type: 'remove',
            messages: data.data.data,
            idsForRemove: ids,
            not_applied_attachments_count: notApplied
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
    proccesMessageForVerifyFiles(state.messages).then(() => window.location.reload())
  }

  const multipleRemove = () => {
    setState({
      ...state,
      disabled: true
    })
    api.documents.removeDocumentsByIds({ ids: state.idsForRemove }).then(() => window.location.reload())
      // .then(response => {
      //   if (response.success) {
      //     window.location.reload()
      //   }
      // })
  }

  const proccesMessageForVerifyFiles = async (messages) => {
    for (const [index, message] of messages.entries()) {
      await proccesFilesForVerifyFile(message.can_be_signed, message.document.attachments)
    }
  }

  console.log(state)
  // && checkBrowser('ie')
  return (
    <Fragment>
      <div className='content'>
        {!!(documents.data && documents.data.length > 0) && Number(status) !== 3 &&
          <div>
            <Button
              type='primary'
              style={{ margin: '2rem 2rem 0' }}
              onClick={showVerifyModal}
            >
              <Icon type={state.buttonsFetching[0] ? 'loading' : 'edit'} />
              Подписать все
            </Button>
            <Button
              type='primary'
              onClick={showRemoveModal}
            >
              <Icon type={state.buttonsFetching[1] ? 'loading' : 'edit'} />
              Удалить все
            </Button>
          </div>
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
        title='В эту папку Вы сможете сохранить черновик любого сообщения.'
        text={['Вы сможете в любой момент продолжить редактирование сообщения и отправить его адресату.']}
      />
      {state.isVisible &&
      <Modal visible closable={false} footer={null}>
        {state.type === 'verify' &&
          <p>Файлов к подписанию: {state.not_applied_attachments_count}</p>
        }
        {state.type === 'remove' &&
          <p>Файлов к удалению: {state.not_applied_attachments_count}</p>
        }
        {state.type === 'verify'
          ? <Button
            type='primary'
            style={{ marginTop: '2rem' }}
            disabled={state.disabled}
            onClick={multipleVerify}
          >
            <Icon type={state.disabled ? 'loading' : 'edit'} />
            {state.disabled ? 'Подождите, идет процесс подписания' : 'Подписать файлы'}
          </Button>
          : <Button
            type='primary'
            style={{ marginTop: '2rem' }}
            disabled={state.disabled}
            onClick={multipleRemove}
          >
            <Icon type={state.disabled ? 'loading' : 'edit'} />
            {state.disabled ? 'Подождите, идет процесс удаления' : 'Удалить файлы'}
          </Button>
        }

        <Button disabled={state.disabled} style={{ marginLeft: '2rem' }} onClick={() => setState({ ...defaultState })}>Закрыть</Button>
      </Modal>
      }
    </Fragment>
  )
}

export default DocumentsPage
