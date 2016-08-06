
import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';

var styles = require('./style');
class Layout extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{backgroundColor:'white'}}>
          ここからtopBlock
        </Text>
        <View style={styles.topBlock}>
          <View style={styles.leftCol}>
            <View style={ [styles.cellOne, styles.base]}>
              <Text>
                1
              </Text>
            </View>
            <View style={ [styles.cellTwo, styles.base]}>
              <Text>
                2
              </Text>
            </View>
          </View>
          <View style={[styles.cellThree, styles.base]}>
            <Text>
              3
            </Text>
          </View>
        </View>
        <Text style={{backgroundColor:'white'}}>
          ここからbottomBlock
        </Text>
        <View style={styles.bottomBlock}>
          <View style={styles.bottomLeft}>
            <View style={[styles.cellFour, styles.base]}>
              <Text>
                4
              </Text>
            </View>
            <View style={[styles.cellFive, styles.base]}>
              <Text>
                5
              </Text>
            </View>
          </View>
          <View style={styles.bottomRight}>
            <View style={[styles.cellSix, styles.base]}>
              <Text>
                6
              </Text>
            </View>
            <View style={[styles.cellSeven, styles.base]}>
              <Text>
                7
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

module.exports = Layout;
