import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Settings from '../components/Settings'
import { rootReducer, actions } from '../actions'


const mapStateToProps = (state) => ({
  userSettings: state.userSettings
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
