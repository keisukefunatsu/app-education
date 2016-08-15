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
    const { todo, id, completed } = this.props;
      return (
        <TodoList
          todo={todo}
          id={id}
          completed={completed}
        />
    )
  }
}

function mapStateToProps(state) {
  return {
    todo: state.todo.todo,
    id: state.todo.id,
    completed: state.todo.completed
  }
}
 export default connect(mapStateToProps)(TodoApp)

