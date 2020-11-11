import { connect } from 'react-redux'
import SiderBlock from './SiderBlock'

const mapStateToProps = state => ({
  config: state.config
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiderBlock)
