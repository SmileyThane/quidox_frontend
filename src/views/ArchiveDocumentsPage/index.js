import ArchiveDocumentsPage from './ArchiveDocumentsPage'
import { connect } from 'react-redux'
import actions from '../../store/actions';

const mapStateToProps = state => ({
  user: state.user,
  documents: state.documents
})

const mapDispatchToProps = dispatch => ({
  getDocumentsByActiveCompanyId: (id, params) => dispatch(actions.documents.getDocumentsByActiveCompanyId(id, params))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArchiveDocumentsPage)
