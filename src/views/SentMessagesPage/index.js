import { connect } from 'react-redux'
import actions from '../../store/actions'
import SentMessagesPage from './SentMessagesPage'

const mapStateToProps = state => ({
  user: state.user,
  documents: state.documents
})

const mapDispatchToProps = dispatch => ({
  getOutDocumentsByActiveCompanyId: id => dispatch(actions.document.getOutDocumentsByActiveCompanyId(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SentMessagesPage)
