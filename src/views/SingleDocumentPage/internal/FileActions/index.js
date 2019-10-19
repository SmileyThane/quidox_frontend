import { connect } from 'react-redux'
import actions from '../../../../store/actions'
import FileActions from './FileActions'

const mapDispatchToProps = dispatch => ({
  verifyDocument: data => dispatch(actions.document.verifyDocument(data)),
  changeStatus: data => dispatch(actions.document.changeStatus(data))
})
export default connect(
  null,
  mapDispatchToProps
)(FileActions)
