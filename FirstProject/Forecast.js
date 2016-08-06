/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Forecast extends Component {
  render() {
    return (
      <View>
        <Text style={styles.bigText}>
          {this.props.city}
        </Text>
      <Text style={styles.bigText}>
        {this.props.main}
      </Text>
      <Text style={styles.mainText}>
        Current conditions: {this.props.description}
      </Text>
      <Text style={styles.bigText}>
        {this.props.temp}℃
      </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bigText: {
    flex: 2,
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#F5FCFF'
  },
  mainText: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    color: '#F5FCFF'
  }
})
