import React, { Component } from 'react'
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
import { ListView } from 'realm/react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import CustomTabbar from '../components/customTabBar'

export default class App extends Component {
  render() {
    return (
      <ScrollableTabView style={{marginTop: 20, }} 
        tabBarPosition='bottom'
        initialPage={0}
        renderTabBar={() => <CustomTabbar tabList={['Active', 'Completed', 'All']}/>}
        >
        <RealmTodo tabLabel={'navicon'} 
          visibility={'show_active'} 
        />
        <RealmTodo tabLabel='check-square-o'
          visibility={'show_completed'}
          />
        <RealmTodo tabLabel="list-alt"
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

