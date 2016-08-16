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
    const { text, key, completed } = this.props
    
    return (      
    <View>        
      <TouchableHighlight
        onPress={() => {}}
        activeOpacity={75 / 100}
        underlayColor={"rgb(210,210,210)"}>
        <Text style={ completed ? styles.completed : ''}>{text}</Text>        
      </TouchableHighlight>
        <Text style={ completed ? styles.completed : ''}>{key}</Text>
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