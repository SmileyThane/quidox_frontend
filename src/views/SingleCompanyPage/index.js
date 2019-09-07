import { connect } from 'react-redux'
import actions from '../../store/actions'
import SingleCompanyPage from './SingleCompanyPage'

const mapStateToProps = state => ({
  company: state.company
})

const mapDispatchToProps = dispatch => ({
  getCompanyById: id => dispatch(actions.company.getCompanyById(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleCompanyPage)
