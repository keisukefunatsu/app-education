import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,

 } from 'react-native';

import counter from '../reducers/index';

export default class Counter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { counter, increment, decrement, state } = this.props;
    return (
      <View style={styles.main}>
        <Text style={styles.counter}>
          Counter: {state}
        </Text>
        <TouchableOpacity onPress={increment} style={styles.button}>
          <Text style={styles.counter}>
            +
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={decrement} style={styles.button}>
          <Text style={styles.counter}>
            -
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counter: {
    fontSize: 16,
  },
  button: {
   width: 100,
   height: 30,
   padding: 10,
   backgroundColor: 'lightgray',
   alignItems: 'center',
   justifyContent: 'center',
   margin: 3
  }

});
