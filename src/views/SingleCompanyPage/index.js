import { connect } from 'react-redux'
import actions from '../../store/actions'
import SingleCompanyPage from './SingleCompanyPage'

const mapStateToProps = state => ({
  companies: state.companies
})

const mapDispatchToProps = dispatch => ({
  getCompanyById: id => dispatch(actions.companies.getCompanyById(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleCompanyPage)
