

import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';


var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#95c13a',
    flexDirection: 'column',
    top: 30 ,
    left: 0,
    bottom: 0,
  },
  base: {
    borderColor:'#000',
    borderWidth: 5,
  },
  topBlock: {
    flexDirection: 'row',
    flex: 1
  },
  leftCol: {
    flex: 2
  },
  bottomBlock: {
    flex: 2,
    flexDirection: 'row',
  },
  bottomLeft: {
    flex: 2,
    flexDirection: 'row',
  },
  bottomRight: {
    flex: 1,
    flexDirection: 'column',
  },
  cellOne: {
    flex: 1,
    borderBottomWidth: 5,
  },
  cellTwo: {
    flex: 3,
  },
  cellThree: {
    backgroundColor: '#ff0000',
    flex: 5,
  },
  cellFour: {
    flex:3,
    backgroundColor: '#0000ff'
  },
  cellFive: {
    flex: 6,
    backgroundColor: '#ff00b8'
  },
  cellSix: {
    flex: 1,
    backgroundColor: '#00ffe8'
  },
  cellSeven: {
    flex:1,
    backgroundColor: '#ffff00',
  }
});

module.exports = styles;
