import { connect } from 'react-redux'
import Header from './Header'

const mapStateToProps = state => ({
  user: state.user,
  brand: state.config.data.co_brand_config
})

export default connect(
  mapStateToProps,
  null
)(Header)
