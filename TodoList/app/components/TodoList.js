import React, { Component, } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from 'react-native'
import Todo from './Todo';

export default class TodoList extends Component {
  static propTypes = {}
  static defaultProps = {}
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  render() {
      const { todos, submitTask } = this.props;
      return (
      <View style={styles.container}>                
        <View>          
          {todos.map((todo, index) =>
            <Todo
              {...todo}
              key={todo.id}
              text={todo.text}
              completed={todo.completed}                        
            />       
          )}
          <TextInput
          style={styles.input}
          placeholder={ 'tasks?' }
          placeholderTextColor={"rgba(198,198,204,1)"}
          onChangeText={(text) => {this.setState({text})}}
          onSubmitEditing={() => {
              submitTask(this.state.text)
              console.log(todos)
              this.setState({text: ''})              
            }}
          value={(this.state && this.state.text) || ''}
        />
        </View>        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  input: {
    height: 30, 
    width: 100,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.5)",
    borderRadius: 5,
    textAlign: 'center',
  }
});