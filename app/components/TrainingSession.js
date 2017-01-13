import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
  Animated,
  Easing
} from 'react-native'

import {
  Container,
  Content,
  Button,
  Icon,
  Text,
  List,
  ListItem,
  CheckBox
} from 'native-base'

import { Actions } from 'react-native-router-flux'
import Timer from '../lib/Timer'

import Sound from 'react-native-sound'
const TOUCH_SOUND = new Sound('music_marimba_chord.wav', Sound.MAIN_BUNDLE)
const BREAK_TIME_UP_SOUND = new Sound('chime_bell_ding.wav', Sound.MAIN_BUNDLE)

export default class TrainingSession extends Component {
  constructor() {
    super()
    this.state = {
      fabActive: 'true',
      counter: 0,
      stepIndex: 0,
      duration: '00:00',
      paused: false,
      breakCountDown: '',
      isOnBreak: false
    }
    this.trainingTimer, this.breakTimer = null
    this.scaleValue = new Animated.Value(0)
  }

  scale() {
    this.scaleValue.setValue(0)
    Animated.timing(
      this.scaleValue,
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear
      }
    ).start(() => this.scale())
  }

  componentDidMount() {
    this.trainingTimer = new Timer()
    const breakInterval = 1000 * this.props.breakInterval
    this.breakTimer = new Timer(
      {
        countDownDuration: breakInterval,
        timeoutCallback: () => {
          BREAK_TIME_UP_SOUND.play()
          this.setState({isOnBreak: false})
        }
      }
    )
    this.trainingTimer.start(duration => this.setState({duration}))
    this.scale()
  }

  componentWillUnmount() {
    this.trainingTimer.stop()
    this.breakTimer.stop()
  }

  togglePauseTraining() {
    const isPaused = this.state.paused
    if (isPaused) {
      this.trainingTimer.resume()
    } else {
      this.trainingTimer.pause()
    }
    this.setState({paused: !isPaused})
  }

  skipBreak() {
    this.breakTimer.stop()
    BREAK_TIME_UP_SOUND.play()
    this.setState({isOnBreak: false})
  }

  count() {
    TOUCH_SOUND.play();

    const { stepIndex, counter, paused } = this.state
    const { currentStage } = this.props
    const isLastStep = (stepIndex >= currentStage.length - 1)
    const stageCount = currentStage[stepIndex]
    const currentCount = counter + 1

    this.setState({counter: currentCount})

    if (currentCount == stageCount) {
      if (isLastStep) {
        // complete today's training
        setTimeout(() => {
          Actions.endScreen();
        }, 1000)
      } else { //complete one step
        //delay for 1 sec to allow counter to reach stage count before reset back to 0
        setTimeout(() => {
          this.breakTimer.reset()
          this.breakTimer.start(breakCountDown => this.setState(
            {
              breakCountDown,
              stepIndex: stepIndex + 1,
              counter: 0,
              isOnBreak: true
            }
          ))
        }, 1000)
      }
    }
  }

  render() {
    const { fabActive, counter, stepIndex, duration, paused, breakCountDown, isOnBreak } = this.state
    const { currentStage } = this.props
    const stepDone = (counter >= currentStage[stepIndex])

    const breatheScale = this.scaleValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 1.1, 1]
    })

    const breatheBorder = this.scaleValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [2, 25, 2]
    })

    const breatheOpacity = this.scaleValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.8, 0.1, 0.8]
    })

    return (
      <TouchableOpacity disabled={paused || isOnBreak || stepDone} activeOpacity={0.2} onPress={this.count.bind(this)} style={styles.container}>
        <View style={{flex: 1}}>
          <StatusBar hidden={true} />
          <View style={styles.stepHeader}>
            {currentStage.map((eachCount, index) => (
              <View key={index} style={styles.stepItem}>
                <Icon style={styles.stepIcon} name={index >= stepIndex? "ios-radio-button-off" : "ios-checkmark-circle"} />
                <Text style={styles.stepLabel} >{eachCount}</Text>
              </View>
            ))}
          </View>

          <View style={styles.counterWrapper} >
            <View style={styles.counterFace}>
              {paused? <Text style={styles.counterBreak}>Paused</Text>
                : (isOnBreak? <Text style={styles.counterBreak}>{breakCountDown}</Text>
                             :<Text style={styles.counterText}>{counter}</Text>)
              }
              {isOnBreak? <Icon onPress={this.skipBreak.bind(this)} name="ios-skip-forward-outline" style={styles.skipBreakIcon}/> : null}
              {paused || isOnBreak?
              <Animated.View style={{
                width: 210,
                height: 210,
                borderRadius: 210,
                borderWidth: breatheBorder,
                transform: [{scale: breatheScale}],
                borderColor: 'white',
                position: 'absolute',
                zIndex: -1,
                top: -7,
                left: -7,
                opacity: breatheOpacity
              }}>
              </Animated.View> : null}
            </View>

          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>{duration}</Text>

            <Button disabled={isOnBreak} bordered onPress={this.togglePauseTraining.bind(this)} style={styles.timerControl}>
              <Icon name={paused? "md-play" : "md-pause"} style={styles.timerControlIcon} />
            </Button>
            <Button transparent onPress={Actions.pop} >
              <Icon name="md-home" style={{color: 'white'}} />
            </Button>
          </View>

        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#02a8f3',
    flex: 1,
  },
  counterWrapper: {
    flexGrow: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  counterFace: {
    borderWidth: 2,
    borderRadius: 100,
    width: 200,
    height: 200,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: {
    fontSize: 100,
    fontWeight: '100',
    lineHeight: 100,
    color: 'white',
  },
  counterBreak: {
    fontSize: 40,
    lineHeight: 40,
    color: 'white',
  },
  stepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
  },
  stepItem: {
    flexDirection: 'row',
  },
  stepIcon: {
    color: 'white',
    fontSize: 35,
    marginRight: 10,
  },
  stepLabel: {
    color: 'white',
    fontSize: 20,
    lineHeight: 20,
    alignSelf: 'center'
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-around'
  },
  footerText: {
    color: 'white',
    fontSize: 22,
    alignSelf: 'center'
  },
  timerControl: {
    alignSelf: 'center',
    borderColor: 'white',
  },
  timerControlIcon: {
    color: 'white',
    marginRight: 20,
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10
  },
  breatheCircle: {
    position: 'absolute',
    left: -10,
    top: 150,
    zIndex: -10,
  },
  skipBreakIcon: {
    color: 'white',
    fontSize: 30,
    position: 'absolute',
    top: 130,
    left: 90
  }
})
