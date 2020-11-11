import { connect } from 'react-redux'
import DocumentsPage from './DocumentsPage'
import actions from '../../store/actions';

const mapStateToProps = state => ({
  user: state.user,
  documents: state.documents
})

const mapDispatchToProps = dispatch => ({
  verifyFile: data => dispatch(actions.files.verifyFile(data)),
  removeDocumentsByIds: (ids, type) => dispatch(actions.documents.removeDocumentsByIds(ids, type)),
  getDocumentsByActiveCompanyId: (id, params) => dispatch(actions.documents.getDocumentsByActiveCompanyId(id, params))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentsPage)
