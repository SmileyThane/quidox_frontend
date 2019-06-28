import { connect } from 'react-redux'
import actions from '../../store/actions'
import DraftsPage from './DraftsPage'

const mapStateToProps = state => ({
  user: state.user,
  documents: state.documents
})

const mapDispatchToProps = dispatch => ({
  getDraftDocumentsByActiveCompany: (id, params) => dispatch(actions.documents.getDraftDocumentsByActiveCompany(id, params)),
  removeDocumentById: (id, type) => dispatch(actions.document.removeDocumentById(id, type)),
  removeDocumentsByIds: (ids, type) => dispatch(actions.documents.removeDocumentsByIds(ids, type))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DraftsPage)
