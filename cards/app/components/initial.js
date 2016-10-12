import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import {Actions, Scene, Router} from 'react-native-router-flux';
import DropDown, {
  Select,
  Option,
  OptionList,
} from 'react-native-selectme';


export default class initialPage extends Component {
    constructor(props) {
    super(props);
    this.state = {
      canada: 'hello',
      completed: false,
      grade: '中１',      
      part:'動詞',    
    };
  }
  _getOptionList() {
    return this.refs['OPTIONLIST'];
  }

  
  _grade(value) {
  this.setState({
      grade: value
    });
  }
  _part(value) {
  this.setState({
      part: value
    });
  }
  _completed(value) {
    if (value == '間違えた問題')
      this.setState({
        completed: false
      });
    else if (value == '未回答の問題') {
      this.setState({
        completed: true
      });
    } 
    else {
      this.setState({
        completed: true
      });
    }
  }

  render(){
    return  (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
        <Text>学年: {this.state.grade}</Text>
         <Select
            width={250}
            ref="SELECT1"
            optionListRef={this._getOptionList.bind(this)}
            defaultValue="学年を選択してください"
            onSelect={this._grade.bind(this)}>
            <Option>中１</Option>
            <Option>中２</Option>
            <Option>中３</Option>
          </Select>               
          <Text>品詞: {this.state.part}</Text>
          <Select
            width={250}
            ref="SELECT2"
            optionListRef={this._getOptionList.bind(this)}
            defaultValue="品詞を選択してください"
            onSelect={this._part.bind(this)}>
            <Option>名詞</Option>
            <Option>動詞</Option>
            <Option>形容詞</Option>
          </Select>   
          <Text>種類: {this.state.completed}</Text>
          <Select
            width={250}
            ref="SELECT3"
            optionListRef={this._getOptionList.bind(this)}
            defaultValue="問題の種類を選択して下さい"
            onSelect={this._completed.bind(this)}>            
            <Option>未回答の問題</Option>
            <Option>間違えた問題</Option>
            <Option>正解した問題</Option>
          </Select>   
          <OptionList ref="OPTIONLIST"/>
        <TouchableHighlight
          style={{marginTop:100}}
          onPress={() => {Actions.questions({grade:this.state.grade, part: this.state.part, completed: this.state.completed })}}
          activeOpacity={75 / 100}
          underlayColor={"rgb(208,2,27)"}>
          <Text>問題へ</Text>
        </TouchableHighlight>
      </View>
    )
  } 
}