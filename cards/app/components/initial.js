import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native'

import {Actions, Scene, Router} from 'react-native-router-flux'

export default class initialPage extends Component {
  render(){
    return  (
      <View>
        <TouchableHighlight
          style={{marginTop:100}}
          onPress={() => {Actions.questions()}}
          activeOpacity={75 / 100}
          underlayColor={"rgb(208,2,27)"}>
          <Text>問題へ</Text>
        </TouchableHighlight>
      </View>
    )
  } 
}