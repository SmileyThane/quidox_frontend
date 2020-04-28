import { connect } from 'react-redux'
import Button from './Button'

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Button)
