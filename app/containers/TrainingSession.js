import { connect } from 'react-redux'

import TrainingSession from '../components/TrainingSession'

const mapStateToProps = (state) => ({
  currentStage: state.userSettings.stageSetting,
  breakInterval: state.userSettings.breakSetting.value
})


export default connect(mapStateToProps)(TrainingSession)
