import { expect } from 'chai'
import sinon from 'sinon'
import Timer, { CountDownTimer } from '~/app/lib/Timer'

describe('Normal timer', () => {
  let normalTimer
  const INTERVAL = 50
  beforeEach(() => {
    normalTimer = new Timer({interval: INTERVAL, timeFormat: 'x'})
  })

  it('should trigger callback in fix interval', (done) => {
    const callback = sinon.spy()
    const testDuration = 349
    const expectedCallCount = Math.floor(testDuration / INTERVAL)
    normalTimer.start(callback)

    setTimeout(() => {
      expect(callback.callCount).to.equal(expectedCallCount)
      done()
    }, testDuration)
  })

  it('should be able to pause', (done) => {
    normalTimer.start();
    setTimeout(() => {
      const mark1 = normalTimer.pause().getDuration()
      setTimeout(() => {
        const mark2 = normalTimer.getDuration()
        expect(mark2).to.equal(mark1)
        done()
      }, 150)
    }, 110)
  })

  it('should be able to resume', (done) => {
    normalTimer.start();
    setTimeout(() => {
      const mark1 = normalTimer.pause().getDuration()
      normalTimer.start()
      setTimeout(() => {
        const mark2 = normalTimer.getDuration()
        expect(mark2).to.above(mark1)
        done()
      }, 50)
    }, 140)
  })

  it('should be able to reset', (done) => {
    normalTimer.start();
    setTimeout(() => {
      expect(normalTimer.reset().getDuration()).to.equal('0')
      done()
    }, 100)
  })
})
