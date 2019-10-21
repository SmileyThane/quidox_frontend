import { connect } from 'react-redux'
import CompanyCreate from './CompanyCreate'
import actions from '../../store/actions'

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  createCompany: data => dispatch(actions.companies.createCompany(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(CompanyCreate)
