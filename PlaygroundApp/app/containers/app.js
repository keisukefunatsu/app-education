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
import { Provider } from 'react-redux';

const store = createStore(counter);

export default class App extends Component {
  render() {
    const { counter, count } = this.props;
    return (
      <Provider store={store}>
        {<Counter
        increment={() => store.dispatch({ type :'INCREMENT' })}
        decrement={() => store.dispatch({ type :'DECREMENT' })}
        />}
      </Provider>
    );
  }
}
