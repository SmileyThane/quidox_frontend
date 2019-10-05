import { connect } from 'react-redux'
import actions from '../../store/actions'
import NewDocumentPage from './NewDocumentPage'

const mapStateToProps = state => ({
  documents: state.documents,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  createDocument: data => dispatch(actions.documents.createDocument(data)),
  sendDocumentToUser: data => dispatch(actions.documents.sendDocumentToUser(data)),
  getUser: () => dispatch(actions.user.getUser())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewDocumentPage)
