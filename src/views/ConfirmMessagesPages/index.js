import { connect } from 'react-redux'
import actions from '../../store/actions'
import ConfirmMessagesPages from './ConfirmMessagesPages'

const mapStateToProps = state => ({
  user: state.user,
  documents: state.documents
})

const mapDispatchToProps = dispatch => ({
  getInboxСonfirmedDocumentsByActiveCompanyId: id => dispatch(actions.documents.getInboxСonfirmedDocumentsByActiveCompanyId(id)),
  removeDocumentById: (id, type) => dispatch(actions.document.removeDocumentById(id, type)),
  removeDocumentsByIds: (ids, type) => dispatch(actions.documents.removeDocumentsByIds(ids, type))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmMessagesPages)
