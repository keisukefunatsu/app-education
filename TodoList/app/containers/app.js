import React, { Component, } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoList from '../reducers/todos.js'
import TodoApp from './TodoApp'


let store = createStore(todoList)
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

