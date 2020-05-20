import { connect } from 'react-redux'
import TariffTimePeriod from './TariffTimePeriod'

const mapStateToProps = state => ({
  user: state.user
})

export default connect(
  mapStateToProps,
  null
)(TariffTimePeriod)
