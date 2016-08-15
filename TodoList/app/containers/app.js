import React, { Component, } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../reducers';
import TodoApp from './TodoApp';
import todo from '../reducers/todos'

store = createStore(reducer)
export default class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Provider store={store}>
        <TodoApp/>
      </Provider>
    )
  }
}

