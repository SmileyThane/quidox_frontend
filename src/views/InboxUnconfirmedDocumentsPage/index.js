import { connect } from 'react-redux'
import actions from '../../store/actions'
import InboxUnconfirmedDocumentsPage from './InboxUnconfirmedDocumentsPage'

const mapStateToProps = state => ({
  user: state.user,
  documents: state.documents
})

const mapDispatchToProps = dispatch => ({
  getInboxUnconfirmedDocumentsByActiveCompanyId: (id, params) => dispatch(actions.documents.getInboxUnconfirmedDocumentsByActiveCompanyId(id, params)),
  removeDocumentById: (id, type) => dispatch(actions.document.removeDocumentById(id, type)),
  removeDocumentsByIds: (ids, type) => dispatch(actions.documents.removeDocumentsByIds(ids, type))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InboxUnconfirmedDocumentsPage)
