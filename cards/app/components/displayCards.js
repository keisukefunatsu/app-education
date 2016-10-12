'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Button from 'react-native-button';
export default class DisplayCards extends Component { 
  
  constructor(props) {
  super(props);
  this.onPressCard = this.onPressCard.bind(this);
  }
  returnCard(num){
    const { card1, card2, card3, card4 } = this.props;
    switch(num) {
    case 1 :
      return { english: card1.english, japanese: card1.japanese, id: card1.id  }
    case 2 : 
      return { english:card2.english, japanese: card2.japanese, id: card2.id }
    case 3 :
      return { english:card3.english, japanese: card3.japanese, id: card3.id }
    case 4 : 
      return { english:card4.english, japanese: card4.japanese, id: card4.id }
    }
  }
  onPressCard(id){      
    const { card1, cards, realm } = this.props;
    if (card1.id == id) {
      let item = cards.filtered(`id=${id}`)[0];
      realm.write(() => {                  
        item.completed = !item.completed
      })
      this.props.refreshDisplay();
    }      
  }
    
    
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.wordTitle}>
          {this.props.restLength + "/" + this.props.maxLength}
        </Text>
        <Text style={styles.wordTitle}>
          {this.props.question.english}
        </Text>
        {this.props.shuffledNumber.map((i) => {        
        return (<Button key={i} style={[ styles.card, this.returnCard(i)['style'] ]} onPress={() => {this.onPressCard(this.returnCard(i)['id'])}}>   
          {this.returnCard(i)['id']} 
          {this.returnCard(i)[ 'english' ]}  
          {this.returnCard(i)[ 'japanese' ]}  
        </Button>  );
        })}
        <Button style={[styles.card,styles.cardRefresh]} onPress={this.props.refreshDisplay}>
          問題更新
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  wordTitle: {
    fontSize: 20,
    color: '#0f0f0f',
    padding: 20,
  },
  card: {
    width: 100,
    color: '#000',   
    marginBottom: 20,
    borderBottomColor:'#000',
    borderBottomWidth: 1,
  },
  cardRed: {
    backgroundColor: '#FF5252',
  },
  cardBlue: {
    backgroundColor: '#2962FF',
  },
  cardYellow: {
    backgroundColor: '#FFEB3B',
  },
  cardGreen: {
    backgroundColor: '#009688',
  },
  cardRefresh: {
    backgroundColor: '#888888',
  }   
});

