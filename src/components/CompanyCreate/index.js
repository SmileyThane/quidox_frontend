import { connect } from 'react-redux'
import CompanyCreate from './CompanyCreate'
import actions from '../../store/actions'

const mapDispatchToProps = dispatch => ({
  createCompany: data => dispatch(actions.companies.createCompany(data))
})

export default connect(
  null,
  mapDispatchToProps()
)(CompanyCreate)
