import React, { Component, } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from 'react-native'
import { connect } from 'react-redux'
export default class TodoApp extends Component {
  static propTypes = {}
  static defaultProps = {}
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    const { todo } = this.props;
      return (
      <View style={styles.container}>
          <Text>{todo}</Text>
          <TouchableHighlight
            onPress={() => {store.dispatch({type:'Do'})}}
            activeOpacity={75 / 100}
            underlayColor={"rgb(210,210,210)"}>
            <Text>Press</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {store.dispatch({type:'Undo'})}}
            activeOpacity={75 / 100}
            underlayColor={"rgb(210,210,210)"}>
            <Text>Press</Text>
          </TouchableHighlight>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    todo: state.todo
  }
}
export default connect(mapStateToProps)(TodoApp)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  }
});