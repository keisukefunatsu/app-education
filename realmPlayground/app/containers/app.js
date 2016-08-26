import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Switch,
  RefreshControl,
} from 'react-native'

import RealmTodo from '../components/realmTodo'
import Realm from 'realm'
import { ListView } from 'realm/react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'


const TodoSchema = {
  name: 'Task',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    completed: 'bool',
    created_at: 'date',
  }
}

let realm = new Realm({schema: [TodoSchema]})

export default class App extends Component {
  render() {
    return (
      <ScrollableTabView style={{marginTop: 20, }} tabBarPosition={'bottom'}>        
        <RealmTodo tabLabel="Active"
          visibility={'show_active'}
          />
        <RealmTodo tabLabel="Completed"
          visibility={'show_completed'}
          />
        <RealmTodo tabLabel="All"
          visibility={'show_all'}
          />
      </ScrollableTabView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flex: 4,
    justifyContent: 'center',
  },
  completed: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
});

