import { connect } from 'react-redux'
import actions from '../../store/actions'
import NewDocumentPage from './NewDocumentPage'

const mapStateToProps = state => ({
  documents: state.documents
})

const mapDispatchToProps = dispatch => ({
  createDocument: data => dispatch(actions.documents.createDocument(data)),
  sendDocumentToUser: data => dispatch(actions.documents.sendDocumentToUser(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewDocumentPage)
