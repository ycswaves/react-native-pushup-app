import Moment from 'moment'

export default class Timer {
  constructor(opt = {countDownDuration: 0, timeoutCallback: null}) {
    this.duration = 0
    this.countDownDuration = (opt.countDownDuration > 0)? opt.countDownDuration : 0
    this.timeoutCallback = (opt.timeoutCallback)? opt.timeoutCallback : null
    this.countDownMode = opt.countDownMode
    this.timerID
    this.callback
  }

  start(callback) {
    if (!this.callback) {
      this.callback = callback
    }

    const INTERVAL = 1000 //ms
    this.timerID = setInterval(() => {
      this.duration += INTERVAL
      if (typeof callback === 'function') {
        callback(this.getDuration())
      }
    }, INTERVAL)
  }

  resume() {
    if (typeof this.callback === 'function') {
      this.start(this.callback)
    }
  }

  getDuration() {
    const DELAY = 1000 //ms
    if (this.countDownDuration > 0) {
      const timeLeft = this.countDownDuration - this.duration
      if (timeLeft <= 0) {
        setTimeout(() => {
          if (typeof this.timeoutCallback === 'function') {
            this.timeoutCallback()
          }
          this.reset()
        }, DELAY)
      }
      return Moment.utc(timeLeft).format('mm:ss')
    }
    return Moment.utc(this.duration).format('mm:ss')
  }

  pause() {
    clearInterval(this.timerID)
  }

  reset() {
    this.pause()
    this.duration = 0
  }

  stop() {
    clearInterval(this.timerID)
  }
}
