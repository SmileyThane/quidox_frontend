import { connect } from 'react-redux'
import MenuItem from './MenuItem'

const mapStateToProps = state => ({
  config: state.config
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuItem)
