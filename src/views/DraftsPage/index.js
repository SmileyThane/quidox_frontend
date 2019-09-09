import { connect } from 'react-redux'
import DraftsPage from './DraftsPage'

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(
  mapStateToProps,
  null
)(DraftsPage)
