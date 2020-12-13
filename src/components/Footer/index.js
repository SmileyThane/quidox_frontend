import { connect } from 'react-redux'
import Footer from './Footer'

const mapStateToProps = state => ({
  config: state.config
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer)
