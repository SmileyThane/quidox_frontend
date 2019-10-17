import { connect } from 'react-redux'
import AvestErrorHandling from './AvestErrorHandling'

const mapStateToProps = state => ({
  user: state.user
})

export default connect(
  mapStateToProps,
  null
)(AvestErrorHandling)
