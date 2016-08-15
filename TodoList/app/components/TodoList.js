import React, { Component, } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from 'react-native'
import { addTodo } from '../actions/index';

export default class TodoList extends Component {
  static propTypes = {}
  static defaultProps = {}
  constructor(props) {
    super(props)
    this.state = {
      text: null,
    }
  }
  render() {
    const { todo, id } = this.props;
      return (
      <View style={styles.container}>
        <Text>
          {id}:{todo}
        </Text>
        <View>
          <TextInput
          style={{
            height: 30, 
            width: 100,
            borderWidth: 1,
            borderColor: "rgba(0,0,0,0.5)",
            borderRadius: 5,
            textAlign: 'center',
          }}
          placeholder={ 'tasks?' }
          placeholderTextColor={"rgba(198,198,204,1)"}
          onChangeText={(text) => {this.setState({text})}}
          onSubmitEditing={() => {
              store.dispatch(addTodo(this.state.text))
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
  }
});