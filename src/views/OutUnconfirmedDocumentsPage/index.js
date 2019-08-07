import { connect } from 'react-redux'
import actions from '../../store/actions'
import OutUnconfirmedDocumentsPage from './OutUnconfirmedDocumentsPage'

const mapStateToProps = state => ({
  user: state.user,
  documents: state.documents
})

const mapDispatchToProps = dispatch => ({
  getOutUnconfirmedDocumentsByActiveCompanyId: (id, params) => dispatch(actions.documents.getOutUnconfirmedDocumentsByActiveCompanyId(id, params)),
  removeDocumentById: (id, type) => dispatch(actions.document.removeDocumentById(id, type)),
  removeDocumentsByIds: (ids, type) => dispatch(actions.documents.removeDocumentsByIds(ids, type))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OutUnconfirmedDocumentsPage)
