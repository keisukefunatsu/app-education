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
    const { text, completed } = this.props
    return (      
    <View>
      <Text style={ completed ? styles.completed : ''}>
        {text}
      </Text>
    </View>
    )
    
  }
}


const styles = StyleSheet.create({
  completed: {
    textDecorationLine: 'line-through', 
    textDecorationStyle: 'solid',
  }
})