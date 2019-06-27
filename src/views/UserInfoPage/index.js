import { connect } from 'react-redux'
import UserInfoPage from './UserInfoPage'

const mapStateToProps = state => ({
  user: state.user
})

export default connect(
  mapStateToProps,
  null
)(UserInfoPage)
