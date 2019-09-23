import { connect } from 'react-redux'
import actions from '../../store/actions'
import SingleDocumentPage from './SingleDocumentPage'

const mapStateToProps = state => ({
  documents: state.documents
})

const mapDispatchToProps = dispatch => ({
  getDocumentById: id => dispatch(actions.document.getDocumentById(id)),
  sendDocumentToUser: data => dispatch(actions.documents.sendDocumentToUser(data)),
  verifyDocument: data => dispatch(actions.document.verifyDocument(data)),
  agreeFile: data => dispatch(actions.document.agreeFile(data)),
  updateDocumentById: (id, data) => dispatch(actions.document.updateDocumentById(id, data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleDocumentPage)
