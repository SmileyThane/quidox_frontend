import { connect } from 'react-redux'
import UserInfoPage from './UserInfoPage'
import actions from '../../store/actions'

const mapStateToProps = state => ({
  companies: state.company,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  updateUser: data => dispatch(actions.user.updateUser(data)),
  shareUser: data => dispatch(actions.user.shareUser(data)),
  getSharedUser: data => dispatch(actions.user.getSharedUser(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfoPage)
