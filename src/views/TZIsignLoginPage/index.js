import { connect } from 'react-redux'
import TZIsignLoginPage from './TZIsignLoginPage'

const mapStateToProps = state => ({
  config: state.config
})

export default connect(
  mapStateToProps,
  null
)(TZIsignLoginPage)
