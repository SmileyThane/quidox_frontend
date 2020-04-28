import { connect } from 'react-redux'
import MenuItem from './MenuItem'

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuItem)
