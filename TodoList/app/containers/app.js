import React, { Component, } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todolist from '../reducers/index.js'
import TodoApp from './TodoApp'


store = createStore(todolist)
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

