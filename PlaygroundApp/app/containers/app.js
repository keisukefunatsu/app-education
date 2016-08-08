import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
 } from 'react-native';

import counter from '../reducers/index';
import Counter from './Counter';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

const store = createStore(counter);

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state } = this.props;
    return (
      <Provider store={store}>
        <Counter
          counter={state}
          increment={() => store.dispatch({ type :'INCREMENT' })}
          decrement={() => store.dispatch({ type :'DECREMENT' })}
          />
      </Provider>
    );
  }
}
export default function mapStateToProps(state) {
  return {state: state.counter}
}
App = connect(
  mapStateToProps
)(App);
