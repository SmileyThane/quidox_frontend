import React, { Fragment, useState } from 'react'

import { Icon, Modal, notification } from 'antd'
import { PageDescription, Table, Button } from '../../components'
import { api } from '../../services'

const defaultState = {
  isVisible: false,
  fetching: false,
  messages: [],
  processedFiles: 0,
  disabled: false,
  disabledCloseButton: false,
  buttonsFetching: [false, false, false],
  type: '',
  not_applied_attachments_count: 0,
  idsForRemove: null,
  idsForSend: null
}
const DocumentsPage = props => {
  const {
    user: { data },
    documents: { documents, isFetching },
    getDocumentsByActiveCompanyId
  } = props

  const [state, setState] = useState({ ...defaultState })

  const params = new URLSearchParams(props.location.search)
  const status = params.get('status')

  const showVerifyModal = () => {
    setState({
      ...state,
      buttonsFetching: [true, false, false]
    })
    api.documents.getDocumentsByActiveCompanyId(data.active_company_id, {
      status: Number(status),
      selection_type: 'document',
      is_minified: true
    })
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
        }
      })
      .catch(error => console.error(error))
  }

  const showRemoveModal = () => {
    setState({
      ...state,
      buttonsFetching: [false, true, false]
    })
    api.documents.getDocumentsByActiveCompanyId(data.active_company_id, {
      status: Number(status),
      selection_type: 'document',
      is_minified: true
    })
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
        }
      })
      .catch(error => console.error(error))
  }

  const showSendModal = () => {
    setState({
      ...state,
      buttonsFetching: [false, false, true]
    })
    api.documents.getDocumentsByActiveCompanyId(data.active_company_id, {
      status: Number(status),
      selection_type: 'document',
      is_minified: true
    })
      .then(({ data }) => {
        if (data.success) {
          const notApplied = data.data.data.length
          const ids = [...new Set(data.data.data.map(i => i.document_id))]
          setState({
            ...state,
            isVisible: true,
            fetching: false,
            type: 'send',
            messages: data.data.data,
            idsForSend: ids,
            not_applied_attachments_count: notApplied
          })
        }
      })
      .catch(error => console.error(error))
  }

  const proccesFilesForVerifyFile = async (bool, files) => {
    for (const file of files) {
      if (bool || file.status.status_data.id === 3) {
        const base64 = await api.files.getBase64File(file.id)
        try {
          const sertificationObject = await window.signProcess(base64.data.data.encoded_base64_file, file.hash_for_sign, true)
          const verifiedData = {
            id: file.id,
            hash: sertificationObject.signedData,
            data: sertificationObject.verifiedData,
            hash_for_sign: sertificationObject.hex,
            status: bool ? null : 5
          }
          const confirm = await api.documents.attachmentSignCanConfirm({
            key: sertificationObject.verifiedData.key,
            attachment_id: file.id
          })
          if (confirm.data.success) {
            api.files.verifyFile(verifiedData)
          }
        } catch (error) {
          break
        }
      }
    }
  }

  const proccesMessageForVerifyFiles = async (messages) => {

    for (const [index, message] of messages.entries()) {
      await proccesFilesForVerifyFile(message.can_be_signed, message.document.attachments)
    }
  }

  const multipleVerifyPreparation = () => {
    window.pluginLoaded()
    // setTimeout(() => {
      multipleVerify()
    // }, 3000)

  }

  const multipleVerify = async () => {
    setState({
      ...state,
      disabled: true,
      disabledCloseButton: true
    })
    proccesMessageForVerifyFiles(state.messages).then(() =>
        {
        setState({
          ...state,
          disabledCloseButton: false
        })
        notification.success({
          message: 'Подпись завершена! закройте окно и перезагрузите страницу.'
        })
      }
    )

  }

  const multipleRemove = () => {
    setState({
      ...state,
      disabled: true,
      disabledCloseButton: true
    })
    api.documents.removeDocumentsByIds({ ids: state.idsForRemove }).then(() => window.location.reload())
  }

  const multipleSend = () => {
    setState({
      ...state,
      disabled: true,
      disabledCloseButton: true
    })
    let chain = Promise.resolve()
    state.idsForSend.forEach(id => {
      chain = chain.then(() => asyncSend(id))
    })
    chain.finally(() => { window.location.reload() })
  }

  const asyncSend = async (id) => {
    await api.documents.sendDocumentToUser({ document_ids: [id], user_company_id: JSON.stringify([]) })
  }

  return (
    <Fragment>
      <div className='content'>
        {!!(documents.data && documents.data.length > 0) && Number(status) !== 3 &&
        <div style={{ margin: '2rem' }}>
          <Button
            type='primary'
            style={{ marginLeft: '1.4rem' }}
            onClick={showVerifyModal}
          >
            <Icon type={state.buttonsFetching[0] ? 'loading' : 'edit'}/>
            Подписать все
          </Button>
          <Button
            type='primary'
            disabled={Number(status) === 11}
            style={{ marginLeft: '1rem' }}
            onClick={showRemoveModal}
          >
            <Icon type={state.buttonsFetching[1] ? 'loading' : 'delete'}/>
            Удалить все
          </Button>
          <Button
            type='primary'
            style={{ marginLeft: '1rem' }}
            onClick={showSendModal}
          >
            <Icon type={state.buttonsFetching[2] ? 'loading' : 'upload'}/>
            Отправить все
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
        {state.type === 'send' &&
        <p>Сообщений к отправке: {state.not_applied_attachments_count}</p>
        }
        {state.type === 'verify' &&
        <Button
          type='primary'
          style={{ marginTop: '2rem' }}
          disabled={state.disabled}
          onClick={multipleVerifyPreparation}
        >
          <Icon type={state.disabled ? 'loading' : 'edit'}/>
          {state.disabled ? 'Подождите, идет процесс подписания' : 'Подписать файлы'}
        </Button>
        }
        {state.type === 'remove' &&
        <Button
          type='primary'
          style={{ marginTop: '2rem' }}
          disabled={state.disabled}
          onClick={multipleRemove}
        >
          <Icon type={state.disabled ? 'loading' : 'edit'}/>
          {state.disabled ? 'Подождите, идет процесс удаления' : 'Удалить файлы'}
        </Button>
        }
        {state.type === 'send' &&
        <Button
          type='primary'
          style={{ marginTop: '2rem' }}
          disabled={state.disabled}
          onClick={multipleSend}
        >
          <Icon type={state.disabled ? 'loading' : 'edit'}/>
          {state.disabled ? 'Подождите, идет процесс отправки' : 'Отправить сообщения'}
        </Button>
        }

        <Button disabled={state.disabledCloseButton} style={{ marginLeft: '2rem' }}
                onClick={() => setState({ ...defaultState })}>Закрыть</Button>
      </Modal>
      }
    </Fragment>
  )
}

export default DocumentsPage
