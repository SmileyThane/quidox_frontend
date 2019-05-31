import { connect } from 'react-redux'
import HeaderBlock from './HeaderBlock'

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderBlock)
