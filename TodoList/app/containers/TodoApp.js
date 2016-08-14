import React, { Component, } from 'react';
import { connect } from 'react-redux';
import TodoList from '../components/TodoList'
import { todo, todos } from '../reducers/todos'
export default class TodoApp extends Component {
  static propTypes = {}
  static defaultProps = {}
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    const { todo, id } = this.props;
      return (
        <TodoList
          todo={todo}
          id={id}
        />
    )
  }
}

function mapStateToProps(state) {
  return {
    todo: state.todo,
    id: state.id,
  }
}
export default connect(mapStateToProps)(TodoApp)

