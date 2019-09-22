import { connect } from 'react-redux'
import actions from '../../store/actions'
import HeaderBlock from './HeaderBlock'

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  userLogout: () => dispatch(actions.user.userLogout())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderBlock)
