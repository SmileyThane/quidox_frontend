import { connect } from 'react-redux'
import actions from '../../store/actions'
import DraftsPage from './DraftsPage'

const mapStateToProps = state => ({
  user: state.user,
  documents: state.documents
})

const mapDispatchToProps = dispatch => ({
  getDraftDocumentsByActiveCompany: id => dispatch(actions.documents.getDraftDocumentsByActiveCompany(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DraftsPage)
