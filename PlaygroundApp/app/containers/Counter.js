import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
 } from 'react-native';

import { connect } from 'react-redux';

export default class Counter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { count, increment, decrement } = this.props;
    return (
      <View style={styles.main}>
        <Text style={styles.counter}>
          Counter: {count}
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

function mapStateToProps(state) {
  return { count: state.count }
}
function mapDispatchToProps(dispatch) {
  return {
  };
}
export default connect(
  mapStateToProps
)(Counter);


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
