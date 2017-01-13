import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Container, Content, Button, Icon, Title } from 'native-base'
import { Actions } from 'react-native-router-flux'
import myTheme from '../theme'

export default class StartScreen extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Container style={styles.main}>
          <Content justifyContent='center'>
            <Title style={styles.mainTitle}>Ready for training today?</Title>
          </Content>
          <Content justifyContent='center' theme={myTheme}>
            <Button bordered large block rounded onPress={Actions.trainingSession}>
              Start
              <Icon style={{fontSize: 30, marginRight: 10}} name="md-stopwatch"/>
            </Button>

            <Button bordered style={{ marginTop: 30}} large block rounded onPress={Actions.settings}>
              Settings
              <Icon style={{fontSize: 30, marginRight: 10}} name="ios-settings"/>
            </Button>
          </Content>
        </Container>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
  main: {
    backgroundColor: '#02a8f3',
    padding: 40,
  },
  mainTitle: {
    fontSize: 25,
    lineHeight: 25,
    alignSelf: 'flex-start',
    color: 'white',
    fontWeight: '300',
    marginBottom: 10
  },
});
