const SET_BREAK_INTERVAL = 'SET_BREAK_INTERVAL'
const SAVE_SETTINGS = 'SAVE_SETTINGS'

import { combineReducers } from 'redux';

/* actions */
const updateSettings = (data) => ({
  type: SAVE_SETTINGS,
  payload: data
})

const actions = {
  updateSettings
}

/* reducers */
const userSettings = (state = {}, {type, payload}) => {
  if (type === SAVE_SETTINGS) {
    return payload
  }
  return state
}

const rootReducer = combineReducers({
  userSettings,
})

export { rootReducer, actions, userSettings, SAVE_SETTINGS }
