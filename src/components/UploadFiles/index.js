import { connect } from 'react-redux'
import actions from '../../store/actions'
import UploadFiles from './UploadFiles'

const mapStateToProps = state => ({
  documents: state.documents,
  files: state.files
})

const mapDispatchToProps = dispatch => ({
  uploadFile: (data, headers) => dispatch(actions.files.uploadFile(data, headers)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadFiles)
