import { connect } from 'react-redux'
import actions from '../../store/actions'
import Table from './Table'

const mapDispatchToProps = dispatch => ({
  sendDocumentToUser: data => dispatch(actions.documents.sendDocumentToUser(data)),
  removeDocument: id => dispatch(actions.document.removeDocumentById(id))
})

export default connect(
  null,
  mapDispatchToProps
)(Table)
