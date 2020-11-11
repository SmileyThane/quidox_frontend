import { connect } from 'react-redux'
import CompanyCreate from './CompanyCreate'
import actions from '../../store/actions'

const mapStateToProps = state => ({
  user: state.user,
  config: state.config
})

const mapDispatchToProps = dispatch => ({
  createCompany: data => dispatch(actions.companies.createCompany(data)),
  getUser: () => dispatch(actions.user.getUser())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyCreate)
