import { connect } from 'react-redux'
import HeaderTariff from './HeaderTariff'

const mapStateToProps = state => ({
  user: state.user
})

export default connect(
  mapStateToProps,
  null
)(HeaderTariff)
