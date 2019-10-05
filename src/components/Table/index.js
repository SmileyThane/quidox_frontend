import { connect } from 'react-redux'
import actions from '../../store/actions'
import Table from './Table'

const mapDispatchToProps = dispatch => ({
  sendDocumentToUser: data => dispatch(actions.documents.sendDocumentToUser(data)),
  removeDocumentById: (id, type) => dispatch(actions.document.removeDocumentById(id, type)),
  removeDocumentsByIds: (ids, type) => dispatch(actions.documents.removeDocumentsByIds(ids, type)),
  getUser: () => dispatch(actions.user.getUser())
})

export default connect(
  null,
  mapDispatchToProps
)(Table)
