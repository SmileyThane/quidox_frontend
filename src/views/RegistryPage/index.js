import { connect } from 'react-redux'
import actions from '../../store/actions'
import RegistryPage from './RegistryPage'

const mapDispatchToProps = dispatch => ({
    createMessage: data => dispatch(actions.document.createMessage(data)),
    uploadFile: (data, headers) => dispatch(actions.files.uploadFile(data, headers)),
    updateDocumentById: (id, data) => dispatch(actions.document.updateDocumentById(id, data))
})

export default connect(
    null,
    mapDispatchToProps
)(RegistryPage)
