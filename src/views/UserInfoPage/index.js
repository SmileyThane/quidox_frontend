import { connect } from 'react-redux'
import UserInfoPage from './UserInfoPage'
import actions from '../../store/actions'

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  updateUser: data => dispatch(actions.user.updateUser(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfoPage)
