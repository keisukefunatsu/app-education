/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image
} from 'react-native';

var Forecast = require('./Forecast');
var content = null;

class FirstProject extends Component {
  constructor() {
    super();
    this.state = {
      zip: '',
      forecast: null
    };
    this.onChange = this.onChange.bind(this);
    if (this.state.forecast !== null) {
      content = <Forecast
      main={this.state.forecast.main}
      description={this.state.forecast.description}
      temp={this.state.forecast.temp}/>;
    }
  }

  onChange(event){
    var zip = event.nativeEvent.text;
    this.setState({
      zip:zip
    });
    fetch('http://api.openweathermap.org/data/2.5/weather?q=' +
    zip + '&APPID=226963277f0b5995ea950fcdbee01008')
      .then((response) => response.json())
      .then((responseJSON) => {
        console.log(responseJSON);
        this.setState({
          forecast: {
            main: responseJSON.weather[0].main,
            description: responseJSON.weather[0].description,
            temp: Math.floor(responseJSON.main.temp - 273)
          }
        });
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  render() {
    if (this.state.forecast !== null) {
      content = <Forecast
      main={this.state.forecast.main}
      description={this.state.forecast.description}
      temp={this.state.forecast.temp}/>;
    }
    return (
      <View style={styles.container}>
        <Image
          source={{uri: 'https://d19vfv6p26udb5.cloudfront.net/wp-content/uploads/2016/06/21145923/RIMG0202-450x600.jpg'}}
          resizeMode='cover'
          style={styles.backdrop}>
          <View style={styles.overlay}>
            <View style={styles.row}>
              <Text style={styles.mainText}>
                Current Weather For
              </Text>
              <View style={styles.zipContainer}>
                <TextInput
                  placeholder="Please input city name or zip code"
                  style={[styles.zipCode, styles.mainText]}
                  returnKeyType="go"
                  onSubmitEditing={this.onChange}/>
              </View>
            </View>
            {content}
          </View>
        </Image>
      </View>
    );
  }
}

var baseFontSize = 16;
var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
  },
  backdrop: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch',
  },
  overlay : {
    paddingTop: 5 ,
    backgroundColor: '#000000',
    opacity: 0.5 ,
    flexDirection: 'column',
    alignItems: 'center',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    padding: 30,
  },
  mainText: {
    fontSize: baseFontSize,
    color: '#fff',
    alignItems: 'center',
  },
  zipContainer: {
    flex: 1,
    borderColor:'#ade248',
    borderWidth: 1,
    marginLeft: 5,
    marginTop: 3,
  },
  zipCode: {
    width: 100 ,
    height: baseFontSize,
  },

});

module.exports = FirstProject;
