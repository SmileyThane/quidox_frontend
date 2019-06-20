import { connect } from 'react-redux'
import actions from '../../store/actions'
import NewDocumentPage from './NewDocumentPage'

const mapStateToProps = state => ({
  documents: state.documents
})

const mapDispatchToProps = dispatch => ({
  createDocument: data => dispatch(actions.document.createDocument(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewDocumentPage)
