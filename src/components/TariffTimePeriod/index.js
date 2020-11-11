import { connect } from 'react-redux'
import TariffTimePeriod from './TariffTimePeriod'

const mapStateToProps = state => ({
  user: state.user,
  config: state.config
})

export default connect(
  mapStateToProps,
  null
)(TariffTimePeriod)
