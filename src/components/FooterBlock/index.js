import { connect } from 'react-redux'
import FooterBlock from './FooterBlock'

const mapStateToProps = state => ({
  config: state.config
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FooterBlock)
