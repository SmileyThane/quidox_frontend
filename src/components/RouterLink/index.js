import { connect } from 'react-redux'
import RouterLink from './RouterLink'

const mapStateToProps = state => ({
  config: state.config
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouterLink)
