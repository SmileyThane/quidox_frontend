import { connect } from 'react-redux'
import CompaniesPage from './CompaniesPage'
import actions from '../../store/actions'

const mapStateToProps = state => ({
  companies: state.companies,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  getCompanies: () => dispatch(actions.companies.getCompanies()),
  changeActiveCompanyById: id => dispatch(actions.companies.changeActiveCompanyById(id)),
  createCompany: data => dispatch(actions.companies.createCompany(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompaniesPage)
