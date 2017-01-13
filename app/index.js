import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import {persistStore, autoRehydrate} from 'redux-persist'
import {AsyncStorage} from 'react-native'

import Router from './containers/Router'
import { rootReducer } from './actions'
import Config from './config/training.json'

const initialState = {
  userSettings: {
    stageSetting: Config.stages[0],
    breakSetting: Config.breakIntervals[0],
  }
}

const store = createStore(rootReducer, initialState, autoRehydrate())
persistStore(store, {storage: AsyncStorage})

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}
