import React, { Component, } from 'react';
import { connect } from 'react-redux';
import TodoList from '../components/TodoList'
export default class TodoApp extends Component {
  static propTypes = {}
  static defaultProps = {}
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    const { todos } = this.props;
      return (
        <TodoList
          todos={todos}
        />
    )
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todos
  }
}
 export default connect(mapStateToProps)(TodoApp)

