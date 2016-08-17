import React, { Component, } from 'react';
import { connect } from 'react-redux';
import TodoList from '../components/TodoList'
import { addTodo } from '../actions/index';
import { toggleTodo } from '../actions/index';
import { setVisibilityFilter } from '../actions/index'
export default class TodoApp extends Component {
  static propTypes = {}
  static defaultProps = {}
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    const { todos, submitTask, onTodoClick } = this.props;
      return (
        <TodoList
          todos={todos}
          submitTask={submitTask}
          onTodoClick={onTodoClick}
          setVisibilityFilter={setVisibilityFilter}
        />
    )
  }
}

function getVisibleTodos(todos, filter) {
  switch(filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':  
      return todos.filter((t) => t.completed)
    case 'SHOW_ACTIVE':  
     return todos.filter((t) => !t.completed)
  }
}
function mapStateToProps(state) {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submitTask: (text) => {
      dispatch(addTodo(text))
    },
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    },
  }
}
 export default connect(
   mapStateToProps,
   mapDispatchToProps,
 )(TodoApp)

