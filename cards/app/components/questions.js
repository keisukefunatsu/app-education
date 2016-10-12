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
import Results from './results';
import { ListView } from 'realm/react-native';
import {Actions, Scene, Router} from 'react-native-router-flux'
const flashCardSchemaBeta4 = {
  name: 'Cards',
  primaryKey: 'id',
  properties: {
    id: 'int',
    english: 'string',
    japanese: 'string',
    part: 'string',
    grade: 'string',
    completed: 'bool',
    wrong: 'bool',
    created_at: 'date',
  }
}
let content = null;
let realm = new Realm({schema: [flashCardSchemaBeta4]});
let cards = realm.objects('Cards');
export default class Questions extends Component {
    propTypes:{    
    shuffledNumber: React.PropTypes.array,
    }
  constructor(props) {
    super(props)
    this.state = ({
      shuffledNumber: [],
      question: '',
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
      console.log('making...')
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
      console.log('made!!!');
    }    
    else {
      console.log('nothing to make');
      this.randamSampling();
    }
  }
  randamSampling(){
    const { part, grade, completed } = this.props;
     function extractAnswer(answers){
      let i = answers.length;       
      var j = Math.floor(Math.random() * i);
      return answers[j]
    }
    function extractThreeQuestions(questions){
      var i = questions.length;
      var j = Math.floor(Math.random() * i);
      while(j + 4 > i){
        var j = Math.floor(Math.random() * i + 1);
      }
        return questions.slice(j, j+3);        
    }
    function shuffle(a) {      
      for (var i=a.length-1;i>=0;i--) {
        var r=Math.floor(i*Math.random());
        var tmp=a[i];
        a[i]=a[r];
        a[r]=tmp;
      }
      return a;          
    }

    let shuffledNumber = shuffle([1,2,3,4]);    
    let queryForA = `completed = ${completed} AND grade BEGINSWITH '${grade}' AND part = '${part}'`
    let queryForQ = `grade BEGINSWITH '${grade}' AND part = '${part}'`
    let answers = cards.filtered(queryForA);
    let questions = cards.filtered(queryForQ);        
    let extractedAnswer = extractAnswer(answers);
    var extractedQuestions = extractThreeQuestions(questions);
    if(answers.length !== 0){
      // check word's repetition 
      for(let q of extractedQuestions){
        if(q.id == extractedAnswer.id){
          extractedQuestions = extractThreeQuestions(questions);
        }
      }
    }
    
    let restLength = answers.length;
    this.setState({  
      maxLength: questions.length,
      restLength: restLength,
      shuffledNumber: shuffledNumber,
      question:extractedAnswer,
      card1: extractedAnswer,
      card2: extractedQuestions[0],
      card3: extractedQuestions[1],
      card4: extractedQuestions[2],
    })    
//      realm.write(() => {
//        realm.delete(cards)
//     })
   
  }
      

  render(){
    if (this.state.restLength !== 0) {
      content =  <DisplayCards
        title={`${this.state.grade}:${this.state.part}`}           
        realm={realm}
        cards={cards}
        maxLength={this.state.maxLength}
        restLength={this.state.restLength}
        shuffledNumber={this.state.shuffledNumber}
        question={this.state.question}
        card1={this.state.card1}
        card2={this.state.card2}
        card3={this.state.card3}
        card4={this.state.card4}
        refreshDisplay={this.randamSampling.bind(this)}
        />;        
    }
    else if(this.state.restLength == 0) {
      content = <Results/>;
    }
  
    return (
      <View>
        {content}
      </View>
    )
  }
}
