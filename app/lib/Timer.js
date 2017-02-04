import Moment from 'moment'

export default class Timer {
  constructor(userOpt) {
    defaultOpt = {timeoutCallback: null, interval: 1000, timeFormat: 'mm:ss'}
    const opt = Object.assign({}, defaultOpt, userOpt)
    this.duration = 0
    this.timeoutCallback = opt.timeoutCallback
    this.timerID
    this.callback
    this.interval = opt.interval
    this.timeFormat = opt.timeFormat
  }

  start(callback) {
    if (!this.callback) {
      this.callback = callback
    }

    this.timerID = setInterval(() => {
      this.duration += this.interval
      if (typeof callback === 'function') {
        callback(this.getDuration())
      }
    }, this.interval)
    return this
  }

  resume() {
    if (typeof this.callback === 'function') {
      this.start(this.callback)
    }
    return this
  }

  getDuration() {
    return Moment.utc(this.duration).format(this.timeFormat)
  }

  pause() {
    clearInterval(this.timerID)
    return this
  }

  reset() {
    this.pause()
    this.duration = 0
    return this
  }

  stop() {
    this.reset()
    clearInterval(this.timerID)
    return this
  }
}

export class CountDownTimer extends Timer {
  constructor(userOpt) {
    defaultOpt = {countDownDuration: 0, delay: 1000}
    const opt = Object.assign({}, defaultOpt, userOpt)
    super(opt)
    this.delay = opt.deplay
    this.countDownDuration = opt.countDownDuration
  }

  getDuration() {
    const timeLeft = this.countDownDuration - this.duration
    if (timeLeft <= 0) {
      setTimeout(() => {
        if (typeof this.timeoutCallback === 'function') {
          this.timeoutCallback()
        }
        this.reset()
      }, this.delay)
    }
    return Moment.utc(timeLeft).format(this.timeFormat)
  }
}
