import { connect } from 'react-redux'
import CompanyPage from './CompanyPage'
import actions from '../../store/actions'

const mapStateToProps = state => ({
  companies: state.company,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  getCompany: () => dispatch(actions.company.getCompany()),
  changeActiveCompanyById: id => dispatch(actions.company.changeActiveCompanyById(id)),
  createCompany: data => dispatch(actions.company.createCompany(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyPage)
