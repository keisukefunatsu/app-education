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
  ScrollView,
} from 'react-native'

import RealmTodo from '../components/realmTodo'
import Realm from 'realm'
import { ListView } from 'realm/react-native'
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';

const myIcon = (<Icon name="rocket" size={30} color="#900" />)

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
    let text = <Text>fjdsifjdsio</Text>
    return (
      <ScrollableTabView style={{marginTop: 20, }} tabBarPosition={'bottom'} >
        <RealmTodo tabLabel="dsds" visibility={'show_active'} iconName={'ion|ios-home-outline'}>
          {myIcon}
        </RealmTodo>
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

