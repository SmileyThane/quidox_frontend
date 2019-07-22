import { connect } from 'react-redux'
import UserInfoPage from './UserInfoPage'
import actions from '../../store/actions'

const mapStateToProps = state => ({
  companies: state.company,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  updateUser: data => dispatch(actions.user.updateUser(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfoPage)
