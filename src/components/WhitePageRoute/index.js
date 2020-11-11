import { connect } from 'react-redux'
import actions from '../../store/actions'
import WhitePageRoute from './WhitePageRoute'

const mapStateToProps = state => ({
  config: state.config
})

const mapDispatchToProps = dispatch => ({
  getConfig: () => dispatch(actions.config.getConfig())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WhitePageRoute)
