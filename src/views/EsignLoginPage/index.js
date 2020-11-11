import { connect } from 'react-redux'
import EsignLoginPage from './EsignLoginPage'

const mapStateToProps = state => ({
  config: state.config
})

export default connect(
  mapStateToProps,
  null
)(EsignLoginPage)
