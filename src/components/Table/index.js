import { connect } from 'react-redux'
import actions from '../../store/actions'
import Table from './Table'

const mapStateToProps = state => ({
  files: state.files
})

const mapDispatchToProps = dispatch => ({
  sendDocumentToUser: data => dispatch(actions.documents.sendDocumentToUser(data)),
  removeDocumentById: (id, type) => dispatch(actions.document.removeDocumentById(id, type)),
  removeDocumentsByIds: (ids, type) => dispatch(actions.documents.removeDocumentsByIds(ids, type)),
  verifyFile: data => dispatch(actions.files.verifyFile(data)),
  getUser: () => dispatch(actions.user.getUser())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table)
