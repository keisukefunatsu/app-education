'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Button from 'react-native-button';
import Realm from 'realm';
import initialData from '../jsondata/grade1.json';
import DisplayCards from './displayCards';
import { ListView } from 'realm/react-native';

const flashCardSchemaBeta3 = {
  name: 'Cards',
  primaryKey: 'id',
  properties: {
    id: 'int',
    english: 'string',
    japanese: 'string',
    part: 'string',
    grade: 'string',
    completed: 'bool',
    created_at: 'date',
  }
}
let realm = new Realm({schema: [flashCardSchemaBeta3]});
let cards = realm.objects('Cards');
export default class Questions extends Component {
  constructor(props) {
    super(props)
    this.state = ({
      card1: '',
      card2: '',
      card3: '',
      card4: '',
    });
    console.log('create db:', realm.path);
  }
  
  initData(data){
    let date = new Date();
    data.map( jsondata => {
      console.log('t')
      let randomId = Math.floor((Math.random() * 10000000) + 1);
       realm.write(()=> {
          realm.create('Cards', {
          id: randomId,
          english: jsondata['単語'],
          japanese: jsondata['和訳'],
          part: jsondata['品詞'],
          grade: jsondata['学年'],
          completed: false,
          created_at: date,
        })
      })
    })          
  }
  
  componentDidMount(){
//     this.initData(initialData)
    if (realm.objects('Cards').length == 0) {
      this.initData(initialData);
    }    
    else {
      console.log('nothing to make');
      this.randamSampling();
    }
  }
  randamSampling(){
    function shuffle(array) {
    var n = array.length, t, i;
    while (n) {
      i = Math.floor(Math.random() * n--);
      t = array[n];
      array[n] = array[i];
      array[i] = t;
    }

      return array;
    }   
    let sample = cards.filtered("completed = false AND grade BEGINSWITH '中１' AND part = '動詞'")
    console.log(sample)   
    this.setState({
      cards: sample,
    })
    console.log(this.state.cards)    
//     shuffle(this.state.cards);
    this.setState({
      card1: sample[0],
      card2: sample[1],
      card3: sample[2],
      card4: sample[3],
    })    
//      realm.write(() => {
//        realm.delete(cards)
//     })
  }
  
  render(){
    return (
      <DisplayCards
        card1={this.state.card1}
        card2={this.state.card2}
        card3={this.state.card3}
        card4={this.state.card4}
        onPressRefresh={this.randamSampling.bind(this)}
        />
    )
  }
}
