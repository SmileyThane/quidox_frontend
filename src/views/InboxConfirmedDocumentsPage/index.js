import { connect } from 'react-redux'
import actions from '../../store/actions'
import InboxConfirmedDocumentsPage from './InboxConfirmedDocumentsPage'

const mapStateToProps = state => ({
  user: state.user,
  documents: state.documents
})

const mapDispatchToProps = dispatch => ({
  getInboxСonfirmedDocumentsByActiveCompanyId: (id, params) => dispatch(actions.documents.getInboxСonfirmedDocumentsByActiveCompanyId(id, params)),
  removeDocumentById: (id, type) => dispatch(actions.document.removeDocumentById(id, type)),
  removeDocumentsByIds: (ids, type) => dispatch(actions.documents.removeDocumentsByIds(ids, type))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InboxConfirmedDocumentsPage)
