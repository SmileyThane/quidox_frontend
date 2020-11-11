import { connect } from 'react-redux'
import PrivateRoute from './PrivateRoute'
import actions from '../../store/actions'

const mapStateToProps = state => ({
  user: state.user,
  config: state.config
})

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(actions.user.getUser()),
  getTariffications: () => dispatch(actions.user.getTariffications())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRoute)
