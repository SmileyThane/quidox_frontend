import { connect } from 'react-redux'
import actions from '../../store/actions'
import UploadFiles from './UploadFiles'

const mapStateToProps = state => ({
  user: state.user,
  documents: state.documents,
  files: state.files
})

const mapDispatchToProps = dispatch => ({
  uploadFile: (data, headers) => dispatch(actions.files.uploadFile(data, headers)),
  changeFileStatus: data => dispatch(actions.files.changeFileStatus(data)),
  removeFile: id => dispatch(actions.files.removeFile(id)),
  verifyFile: data => dispatch(actions.files.verifyFile(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadFiles)
