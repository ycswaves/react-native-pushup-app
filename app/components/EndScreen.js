import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Container, Content, Button, Title, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'
import myTheme from '../theme'

import Sound from 'react-native-sound'
const END_SOUND = new Sound('pad_confirm.wav', Sound.MAIN_BUNDLE)

export default class EndScreen extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    END_SOUND.play()
  }

  render() {
    const cheers = ['Well done', 'Excellent', 'Good job']
    return (
      <Content style={styles.main} justifyContent='center' theme={myTheme}>
        <Title style={styles.mainTitle}>{cheers[Math.floor(Math.random()*10) % cheers.length]}!</Title>
        <Text style={styles.subTitle}>You've done with today's training</Text>

        <Button large block rounded bordered onPress={Actions.startScreen}>
          Home
          <Icon style={{fontSize: 30, marginRight: 10}} name="md-home" />
        </Button>
        <Button style={{marginTop: 10}} large block rounded bordered onPress={Actions.startScreen}>
          View Report
          <Icon style={{fontSize: 30, marginRight: 10}} name="md-stats" />
        </Button>
      </Content>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#02a8f3',
    padding: 40,
  },
  mainTitle: {
    fontSize: 50,
    lineHeight: 50,
    alignSelf: 'flex-start',
    color: 'white',
    fontWeight: '200',
    marginBottom: 10
  },
  subTitle: {
    fontSize: 20,
    color: 'white',
    marginBottom: 200,
  }
})
