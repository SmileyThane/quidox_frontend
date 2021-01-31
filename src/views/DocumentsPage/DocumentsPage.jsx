import React, { useState } from 'react'

import {
  Icon,
  notification
} from 'antd'

import {
  LayoutScroll,
  Table,
  Button
} from '../../components'

import { api } from '../../services'

import { IconSend } from './images'

import { ModalProcess } from './components'

import { Layout } from './styled'

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

export default ({
  user: { data },
  documents: {
    documents,
    isFetching
  },
  getDocumentsByActiveCompanyId,
  location
}) => {
  const [state, setState] = useState({ ...defaultState })

  const params = new URLSearchParams(location.search)
  const status = params.get('status')

  const showVerifyModal = () => {
    setState({
      ...state,
      buttonsFetching: [true, false, false]
    })

    api.documents.getDocumentsByActiveCompanyId(data.active_company_id, {
      status: +status,
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
      status: +status,
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
      status: +status,
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

  const proccesMessageForVerifyFiles = async messages => {
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

    proccesMessageForVerifyFiles(state.messages).then(() => {
      setState({
        ...state,
        disabledCloseButton: false
      })

      notification.success('Подпись завершена! закройте окно и перезагрузите страницу.')
    })
  }

  const multipleRemove = () => {
    setState({
      ...state,
      disabled: true,
      disabledCloseButton: true
    })

    api.documents.removeDocumentsByIds({
      ids: state.idsForRemove
    }).then(() => window.location.reload())
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

    chain.finally(() => {
      window.location.reload()
    })
  }

  const asyncSend = async id => {
    await api.documents.sendDocumentToUser({
      document_ids: [id],
      user_company_id: JSON.stringify([])
    })
  }

  return (
    <LayoutScroll>
      <Layout>
        <Layout.Inner>
          <Layout.Table>
            {!!(documents.data && documents.data.length > 0) && +status !== 3 && +status !== 4 && (
              <Layout.Table.Header>
                <Layout.Table.Column>
                  <Button
                    type='link'
                    icon={state.buttonsFetching[0] ? 'loading' : 'edit'}
                    onClick={showVerifyModal}
                  >
                    Подписать все
                  </Button>

                  <Button
                    type='link'
                    onClick={showSendModal}
                  >
                    {state.buttonsFetching[0] ? (
                      <Icon type='loading' />
                    ) : (
                      <Icon component={IconSend} />
                    )}

                    Отправить все
                  </Button>
                </Layout.Table.Column>

                <Layout.Table.Column>
                  <Button
                    type='link'
                    icon={state.buttonsFetching[0] ? 'loading' : 'delete'}
                    disabled={+status === 11}
                    onClick={showRemoveModal}
                  >
                    Удалить все
                  </Button>
                </Layout.Table.Column>
              </Layout.Table.Header>)}

            <Layout.Table.Body>
              <Table
                className='ui-table-list'
                tableData={documents}
                loading={isFetching}
                getDocumentsWithParams={getDocumentsByActiveCompanyId}
                activeCompany={data.active_company_id}
                type='document'
                status={+status}
              />
            </Layout.Table.Body>
          </Layout.Table>

          <ModalProcess
            visible={state.isVisible}
            data={state}
            onVerify={multipleVerifyPreparation}
            onRemove={multipleRemove}
            onSend={multipleSend}
            onCancel={() => setState({ ...defaultState })}
          />
        </Layout.Inner>
      </Layout>
    </LayoutScroll>
  )
}
