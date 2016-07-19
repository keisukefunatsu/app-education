import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableHighlight,
  AsyncStorage,
  PropTypes,
} from 'react-native';

const INCREMENT = {
  type: 'INCREMENT',
  count: 1,
}

const DECREMENT = {
  type: 'DECREMENT',
  count: -1,
}

var counterReducer = (state = {count: 0}, action) => {
  let count = state.count;
  switch (action.type) {
    case 'DECREMENT':
      return {count: count + action.count}
    case 'INCREMENT':
      return {count: count+ action.count}
    default:
      return state;
  }
}

export default class PlaygroundApp extends Component {
  propTypes: {
    count: React.PropTypes.number.isRequired,
    onClickPlus: React.PropTypes.func.isRequired,
  }
  render(){
    const { count, onClickPlus,onClickMinus } = this.props;
    return(
      <View style={styles.container}>
        <TouchableHighlight onPress={onClickPlus} style={styles.button}>
          <Text> +1 </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={onClickMinus} style={styles.button}>
          <Text> -1 </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

var mapStateToPropsContainer = (state) => {
  return{
    count: state.count,
  }
}

var mapDispatchToPropsContainer = (dispatch) => {
  return{
    onClickPlus: () => dispatch(INCREMENT),
    onClickMinus: () => dispatch(DECREMENT),
  }
}

let App = connect(
  mapStateToPropsContainer,
  mapDispatchToPropsContainer
)(PlaygroundApp);
let store = createStore(counterReducer);

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    marginTop: 50,
  },
  button: {
    width: 100,
    padding: 10,
    borderWidth: 2,
    borderColor: '#000',
  }
});
