import { connect } from 'react-redux'
import actions from '../../store/actions'
import UnconfirmedMessagesPage from './UnconfirmedMessagesPage'

const mapStateToProps = state => ({
  user: state.user,
  documents: state.documents
})

const mapDispatchToProps = dispatch => ({
  getInboxUnconfirmedDocumentsByActiveCompanyId: id => dispatch(actions.documents.getInboxUnconfirmedDocumentsByActiveCompanyId(id)),
  removeDocumentById: (id, type) => dispatch(actions.document.removeDocumentById(id, type)),
  removeDocumentsByIds: (ids, type) => dispatch(actions.documents.removeDocumentsByIds(ids, type))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconfirmedMessagesPage)
