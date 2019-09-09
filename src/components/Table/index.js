import { connect } from 'react-redux'
import actions from '../../store/actions'
import Table from './Table'

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  sendDocumentToUser: data => dispatch(actions.documents.sendDocumentToUser(data)),
  getDocumentsByActiveCompanyId: id => dispatch(actions.documents.getDocumentsByActiveCompanyId(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table)
