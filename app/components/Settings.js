import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import {
  Container,
  Content,
  Header,
  Title,
  List,
  ListItem,
  Icon,
  Text,
  Picker,
  Button,
} from 'native-base'

import Config from '../config/training.json'

const PickerItem = Picker.Item
export default class Settings extends Component {
  constructor(props) {
    super(props)
    const { stageSetting, breakSetting } = props.userSettings
    this.state = {
      stageSetting, //|| 0,
      breakSetting //|| props.config.breakIntervals[0].value,
    }
  }

  saveSetting() {
    const { stageSetting, breakSetting } = this.state
    this.props.updateSettings({ stageSetting, breakSetting })
    Actions.pop()
  }

  mapBreakInterval(val) {
    return Config.breakIntervals.find(interval => interval.value === val)
  }

  mapStage(val) {
    console.log(val, Config.stages);
    return Config.stages.find(stage => this.formatStage(stage) === val)
  }

  formatStage(stageArr) {
    return stageArr.join(' - ')
  }

  render() {
    const {breakSetting, stageSetting} = this.state

    return (
      <Container>
        <Header>
          <Button transparent onPress={this.saveSetting.bind(this)}>
            <Icon name='ios-arrow-back' />
          </Button>

          <Title>Settings</Title>
        </Header>
        <Content>
          <List>
            <ListItem>
              <Icon style={{marginRight: 10, fontSize: 24}} name='md-podium' />
              <Text style={{alignSelf: 'center'}}>Stage</Text>
              {Config.stages.length > 0 ?
              <Picker
                iosHeader="Stage"
                mode="dropdown"
                selectedValue={this.formatStage(stageSetting)}
                onValueChange={val => this.setState({stageSetting: this.mapStage(val)})}>
                {Config.stages.map((stageArr, index) => {
                  const stageConcat = this.formatStage(stageArr)
                  const niceName = `Level ${index+1} ( ${stageConcat} )`
                  return <PickerItem key={index} label={niceName} value={stageConcat} />
                })}
              </Picker> : null}
            </ListItem>
            <ListItem>
              <Icon style={{marginRight: 10, fontSize: 24}} name='md-stopwatch' />
              <Text style={{alignSelf: 'center'}}>Break Interval</Text>
              {Config.stages.length > 0 ?
              <Picker
                iosHeader="Break Interval"
                mode="dropdown"
                selectedValue={breakSetting.value}
                onValueChange={val => this.setState({breakSetting: this.mapBreakInterval(val)})}>
                {Config.breakIntervals.map(({name, value}, index) => {
                  return <PickerItem key={index} label={name} value={value} />
                })}
              </Picker> : null}
            </ListItem>
          </List>
        </Content>
      </Container>
    )
  }
}
