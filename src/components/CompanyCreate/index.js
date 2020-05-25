import { connect } from 'react-redux'
import CompanyCreate from './CompanyCreate'
import actions from '../../store/actions'

const mapDispatchToProps = dispatch => ({
  createCompany: data => dispatch(actions.companies.createCompany(data)),
  getUser: () => dispatch(actions.user.getUser())
})
const mapStateToProps = state => ({
  user: state.user
})

export default connect(
  null,
  mapDispatchToProps,
  mapStateToProps
)(CompanyCreate)
