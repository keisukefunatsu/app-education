'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Button from 'react-native-button';
export default class DisplayCards extends Component {
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.wordTitle}>
          {this.props.card1.english}
        </Text>
        <Button style={[styles.card,styles.cardRed]}>
          {this.props.card1.english}
          {this.props.card1.japanese}
        </Button>
        <Button style={[styles.card,styles.cardBlue]}>
          {this.props.card2.english}
          {this.props.card2.japanese}
        </Button>
        <Button style={[styles.card,styles.cardYellow]}>
          {this.props.card3.english}
          {this.props.card3.japanese}
        </Button>
        <Button style={[styles.card,styles.cardGreen]}>
          {this.props.card4.english}
          {this.props.card4.japanese}        
        </Button>
        <Button style={[styles.card,styles.cardRefresh]} onPress={this.props.onPressRefresh}>
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
    color: '#fff',   
    marginBottom: 20,
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
    backgroundColor: '#000',
  }   
});

