import { connect } from 'react-redux'
import actions from '../../store/actions'
import DraftsPage from './DraftsPage'

const mapStateToProps = state => ({
  user: state.user,
  drafts: state.drafts
})

const mapDispatchToProps = dispatch => ({
  getDraftsByActiveCompany: id => dispatch(actions.drafts.getDraftsByActiveCompany(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DraftsPage)
