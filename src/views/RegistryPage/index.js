import { connect } from 'react-redux'
import actions from '../../store/actions'
import RegistryPage from './RegistryPage'

const mapDispatchToProps = dispatch => ({
    createMessage: data => dispatch(actions.document.createMessage(data)),
    uploadFile: (data, headers) => dispatch(actions.files.uploadFile(data, headers)),
    changeFileStatus: data => dispatch(actions.files.changeFileStatus(data))
})

export default connect(
    null,
    mapDispatchToProps
)(RegistryPage)
