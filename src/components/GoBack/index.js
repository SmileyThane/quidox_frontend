import { connect } from 'react-redux'
import GoBack from './GoBack'

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoBack)