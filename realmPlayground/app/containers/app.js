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
import {Actions, Scene, Router} from 'react-native-router-flux'
import Drawer from 'react-native-drawer';

class TestClass extends Component {
  render(){
    const {title, subTitle,} = this.props
    return(
      <View style={{
          flex: 1,
          justifyContent: 'center',          
        }}>
        <Text style={{textAlign: 'center',}}>{this.props.text}</Text>       
      </View>
    )
  }
} 

class TestDrawer extends Component {
  render() {
    const children = this.props.navigationState.children;
    return(
      <View>
      
      </View>
    )
  }
}
class TodoWithTab extends Component {
  render() {
    return (
      <ScrollableTabView style={{marginTop: 40, borderTopWidth: 2, }} 
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

export default class App extends Component {
  render() {    
    return (      
     <Router>
      <Scene key="root">        
        <Scene key="start" component={TestClass} title="Start" text="page1" initial={true} onRight={() => Actions.todo()}  rightTitle="todo"/>
        <Scene key="todo" component={TodoWithTab} title="Todo" text="page2" hideNavBar={false} />        
        </Scene>
    </Router>
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

