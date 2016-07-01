import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';

var BookList = require('./BookList')
AppRegistry.registerComponent('BookList', () => BookList);
