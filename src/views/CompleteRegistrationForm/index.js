import { connect } from 'react-redux'
import CompleteRegistrationForm from './CompleteRegistrationForm'

const mapStateToProps = state => ({
  config: state.config
})

export default connect(
  mapStateToProps,
  null
)(CompleteRegistrationForm)
