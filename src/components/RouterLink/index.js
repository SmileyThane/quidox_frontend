import { connect } from 'react-redux'
import RouterLink from './RouterLink'

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouterLink)
