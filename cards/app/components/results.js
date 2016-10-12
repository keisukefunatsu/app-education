'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native'
import Button from 'react-native-button';
import {Actions, Scene, Router} from 'react-native-router-flux'

export default class Results extends Component {  
  render(){
    return (
      <View>
        <Text>結果は…</Text>
        <TouchableHighlight
          style={{marginTop:100}}
          onPress={() => {Actions.initial()}}
          activeOpacity={75 / 100}
          underlayColor={"rgb(210,210,210)"}>
          <Text>一覧に戻る</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
