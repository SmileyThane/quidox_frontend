import { connect } from 'react-redux'
import actions from '../../../../store/actions'
import HeaderUser from './HeaderUser'

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  userLogout: () => dispatch(actions.user.userLogout())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderUser)
