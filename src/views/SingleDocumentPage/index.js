import { connect } from 'react-redux'
import actions from '../../store/actions'
import SingleDocumentPage from './SingleDocumentPage'

const mapStateToProps = state => ({
  document: state.document
})

const mapDispatchToProps = dispatch => ({
  getDocumentById: id => dispatch(actions.document.getDocumentById(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleDocumentPage)
