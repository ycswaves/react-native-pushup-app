import React, { Component } from 'react'
import { Router, Scene } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { StatusBar } from 'react-native'

/* containers */
import TrainingSession from './TrainingSession'
import StartScreen from './StartScreen'
import EndScreen from './EndScreen'
import Settings from './Settings'

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <Scene key={'root'}>
          <Scene initial key={'startScreen'} component={StartScreen} hideNavBar />
          <Scene key={'trainingSession'} component={TrainingSession} hideNavBar />
          <Scene key={'endScreen'} component={EndScreen} hideNavBar />
          <Scene key={'settings'} component={Settings} hideNavBar />
        </Scene>
      </Router>
    )
  }
}

export default connect()(AppRouter)
