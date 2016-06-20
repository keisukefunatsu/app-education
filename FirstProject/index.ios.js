/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

class FirstProject extends Component {
  constructor() {
    super();
    this.state = {
      zip: ''
    };
    this.onChange = this.onChange.bind(this)
  }
  onChange(event){
    console.log(event.nativeEvent.text);
    this.setState({
      zip:event.nativeEvent.text
    });
  }

  render() {
    return (
      <View style={styles.container}>
      <TextInput
        style={styles.input}
        onSubmitEditing={this._handleTextChange}
      />
      <Text style={styles.welcome}>
        you input {this.state.zip}.
      </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  input: {
    margin: 20,
    fontSize: 20,
    borderWidth: 2,
    borderColor: '#49c13b',
    padding: 10,
    borderRadius: 4,
    height:40
  },
});

AppRegistry.registerComponent('FirstProject', () => FirstProject);
