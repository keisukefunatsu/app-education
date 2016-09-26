import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native'

import RealmTodo from '../components/realmTodo'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import CustomTabbar from '../components/customTabBar'
import {Actions, Scene, Router} from 'react-native-router-flux'
import Drawer from 'react-native-drawer';
import Button from 'react-native-button';

class TestDrawer extends Component {
  openDrawer = () => {
    this._drawer.open()
  };
  closeDrawer = () => {
    this._drawer.close()
  };
  render() {
    return (
    <Drawer
        ref={(ref) => this._drawer = ref}
        content={<TestPanel closeDrawer={this.closeDrawer}/>}
        tapToClose={true}        
        >
        <View style={{flex: 1,justifyContent: 'center',}}>        
        <Text style={{textAlign: 'center',marginTop: 30,}}>{this.props.text}</Text>  
        <View style={{alignItems: 'center',}}>
          <TouchableHighlight            
            style={styles.button}
            onPress={() => { this.openDrawer() }}
            activeOpacity={75 / 100}
            underlayColor={"rgba(47,56,78,1)"}>
            <Text>Open</Text>
          </TouchableHighlight>
        </View>        
      </View>
      </Drawer>
    )
  }
}
class TestPanel extends Component {
  render(){
    const {closeDrawer} = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.controlText}>Control Panel</Text>
        <Button onPress={Actions.todo}>
          Todo
        </Button>
        <Button onPress={closeDrawer}>
          go back to first page
        </Button>
        <Button onPress={Actions.start}>
          go back to first page(using router)
        </Button>
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
        <Scene key="start" component={TestDrawer} title="Start" text="page1" initial={true} onRight={() => Actions.todo()}  rightTitle="todo"/>
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
  button: {
    width: 100,
   height: 30,
   padding: 10,
   backgroundColor: 'lightgray',
   alignItems: 'center',
   justifyContent: 'center',
   margin: 3
  },
  controlPanel: {
    flex: 1,
    backgroundColor:'transparent',
  },
  controlPanelText: {
    color:'white',
  },
});

