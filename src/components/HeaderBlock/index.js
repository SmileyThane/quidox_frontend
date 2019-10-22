import { connect } from 'react-redux'
import HeaderBlock from './HeaderBlock'

const mapStateToProps = state => ({
  user: state.user
})

export default connect(
  mapStateToProps,
  null
)(HeaderBlock)
