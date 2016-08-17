import React, { Component, } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ScrollView,
  MapView,
  DatePickerIOS,
  ActivityIndicatorIOS,
  Modal,
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
      const { todos, submitTask, onTodoClick, setVisibilityFilter} = this.props;
      return (
      <View style={styles.container}> 
        <View style={styles.inputarea}>
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
        <View style={{
            flex: 1,
          }}> 
        {todos.map((todo) =>
          <Todo              
            key={todo.id}
            text={todo.text}
            completed={todo.completed}
            {...todo}
            onPress={() => onTodoClick(todo.id)}
          />       
        )}
        </View> 
        <TouchableHighlight
        onPress={() => {
              store.dispatch(setVisibilityFilter('SHOW_COMPLETED'))
              console.log(store.getState())
            }}
        activeOpacity={75 / 100}
        underlayColor={"rgb(210,210,210)"}>
        <Text>press</Text>        
      </TouchableHighlight>       
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
  },
  inputarea: {
    flex: 1,
    justifyContent: 'center',
}
});