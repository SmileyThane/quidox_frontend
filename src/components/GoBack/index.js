import { connect } from 'react-redux'
import GoBack from './GoBack'

const mapStateToProps = state => ({
  config: state.config
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoBack)