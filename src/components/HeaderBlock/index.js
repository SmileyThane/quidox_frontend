import { connect } from 'react-redux'
import HeaderBlock from './HeaderBlock'

const mapStateToProps = state => ({
  user: state.user,
  config: state.config
})

export default connect(
  mapStateToProps,
  null
)(HeaderBlock)
