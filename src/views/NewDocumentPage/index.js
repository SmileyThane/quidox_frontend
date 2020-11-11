import { connect } from 'react-redux'
import actions from '../../store/actions'
import NewDocumentPage from './NewDocumentPage'

const mapStateToProps = state => ({
  documents: state.documents,
  user: state.user,
  files: state.files
})

const mapDispatchToProps = dispatch => ({
  createMessage: data => dispatch(actions.document.createMessage(data)),
  createDocument: data => dispatch(actions.documents.createDocument(data)),
  sendDocumentToUser: data => dispatch(actions.documents.sendDocumentToUser(data)),
  getUser: () => dispatch(actions.user.getUser()),
  uploadFile: (data, headers) => dispatch(actions.files.uploadFile(data, headers)),
  removeFile: id => dispatch(actions.files.removeFile(id)),
  verifyFile: data => dispatch(actions.files.verifyFile(data)),
  changeFileStatus: data => dispatch(actions.files.changeFileStatus(data)),
  updateDocumentById: (id, data) => dispatch(actions.document.updateDocumentById(id, data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewDocumentPage)
