import { connect } from 'react-redux'
import actions from '../../store/actions'
import StoredRegistryPage from './StoredRegistryPage'

const mapDispatchToProps = dispatch => ({
    createMessage: data => dispatch(actions.document.createMessage(data)),
    uploadFile: (data, headers) => dispatch(actions.files.uploadFile(data, headers)),
    changeFileStatus: data => dispatch(actions.files.changeFileStatus(data))
})

export default connect(
    null,
    mapDispatchToProps
)(StoredRegistryPage)
