import React, { Component, } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from 'react-native'


export default class Todo extends Component {
  render(){
    const { text } = this.props
    return (      
    <View>
      <Text>
        {text}
      </Text>
    </View>
    )
    
  }
}