import { connect } from 'react-redux'
import actions from '../../../../store/actions'
import FileActions from './FileActions'

const mapDispatchToProps = dispatch => ({
  verifyFile: data => dispatch(actions.files.verifyFile(data)),
  changeStatus: data => dispatch(actions.document.changeStatus(data))
})

const mapStateToProps = state => ({
  user: state.user,
  config: state.config
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileActions)
