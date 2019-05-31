import { connect } from 'react-redux'
import CompanyPage from './CompanyPage'
import actions from '../../store/actions'

const mapStateToProps = state => ({
  companies: state.company
})

const mapDispatchToProps = dispatch => ({
  getCompany: () => dispatch(actions.company.getCompany())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyPage)
