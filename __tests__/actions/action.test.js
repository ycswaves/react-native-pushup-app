import { expect } from 'chai'
import { actions, userSettings, SAVE_SETTINGS } from '~/app/actions'

describe('#userSettings', () => {
  it('should return original state with invalid action type', () => {
    const originalState = {test: 123}
    const action = {
      type:'invalid',
      payload: 456
    }
    expect(userSettings(originalState, action)).to.equal(originalState)
  })

  it('should return new state with valid action type', () => {
    const originalState = {test: 123}
    const action = {
      type: SAVE_SETTINGS,
      payload: 456
    }
    expect(userSettings(originalState, action)).to.equal(action.payload)
  })
})
