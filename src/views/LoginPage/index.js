import { connect } from 'react-redux'
import LoginPage from './LoginPage'

const mapStateToProps = state => ({
  config: state.config
})

export default connect(
  mapStateToProps,
  null
)(LoginPage)
