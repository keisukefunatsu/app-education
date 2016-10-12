import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native'

import {Actions, Scene, Router} from 'react-native-router-flux'
import Questions from '../components/questions';
import Results from '../components/results';
import initialPage from '../components/initial';

class DisplayQuestions extends Component {
  render(){
   return  <Questions gotoResults={Actions.results} />
  } 
}


export default class Cards extends Component {
  render() {
    return (
      <Router>
      <Scene key="root">        
        <Scene key="initial" component={initialPage} title="問題" text="page1" initial={true} hideNavBar={true} />
        <Scene key="questions" component={Questions} title="結果" text="page2" hideNavBar={true} />
        <Scene key="result" component={Results} title="結果" text="page3" hideNavBar={true} />        
        </Scene>
      </Router>
      
    )
  }
}

