
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableHighlight
} from 'react-native';

var Forecast = require('./Forecast');
var forecastContent = null;
var API_STEM = 'http://api.openweathermap.org/data/2.5/weather?';
var API_KEY = '226963277f0b5995ea950fcdbee01008';


class FirstProject extends Component {
  constructor() {
    super();
    this.state = {
      zip: '',
      forecast: null
    };
    this._getForcastForZip = this._getForcastForZip.bind(this);
    this._getCurrentPosition = this._getCurrentPosition.bind(this);
    this._getForcastForCoords = this._getForcastForCoords.bind(this);
  }

  componentDidMount() {
    this._getCurrentPosition();
  }
  _getForcast(url,cb){
    fetch(url)
      .then((response) => response.json())
      .then((responseJSON) => {
        this.setState({
          forecast: {
            main: responseJSON.weather[0].main,
            description: responseJSON.weather[0].description,
            temp: Math.floor(responseJSON.main.temp - 273),
            city: responseJSON.name
          }
        });
      })
      .catch((error) => {
        console.warn(error);
      });
  }
  _getForcastForZip(event){
    var zip = event.nativeEvent.text;
    this.setState({
      zip:zip
    });
    this._getForcast(`${API_STEM}q=${zip}&APPID=${API_KEY}`);
  }

  _getForcastForCoords(lat, lon){
    this._getForcast(`${API_STEM}lat=${lat}&lon=${lon}&APPID=${API_KEY}`);
  }
  _getCurrentPosition(){
    navigator.geolocation.getCurrentPosition(
      (initialPosition) => {
        this.setState({
          latitude: initialPosition.coords.latitude,
          longitude: initialPosition.coords.longitude,
        });
        this._getForcastForCoords(this.state.latitude,this.state.longitude);
      },
      (error) => alert(error.message),
      {enableHighAccuracy:true, timeout: 20000, maximumAge:1000}
    );
  }

  render() {
    if (this.state.forecast !== null) {
      forecastContent = <Forecast
      main={this.state.forecast.main}
      description={this.state.forecast.description}
      temp={this.state.forecast.temp}
      city={this.state.forecast.city}/>;
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
                  onSubmitEditing={this._getForcastForZip}/>
              </View>
            </View>
            <TouchableHighlight onPress={this._getCurrentPosition} style={styles.button}>
              <Text>
                Use Current Location
              </Text>
            </TouchableHighlight>
            {forecastContent}
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
    flex: 2,
    borderColor:'#ade248',
    borderBottomWidth: 1,
    borderRadius: 4,
    marginLeft: 5,
    marginTop: 3,
  },
  zipCode: {
    width: 100 ,
    height: baseFontSize,
  },
  button: {
    flex: 2,
    padding: 15,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'white',
    opacity: 0.8,
    borderRadius: 4,
    backgroundColor: 'white',
  }
});

module.exports = FirstProject;
