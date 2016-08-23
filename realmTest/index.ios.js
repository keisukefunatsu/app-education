
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native'
import Realm from 'realm'
import tcomb from 'tcomb-form-native'
import { ListView } from 'realm/react-native';

class realmTest extends Component {
  
  constructor(props) {
    super(props)
  }
  render() {
  const CatSchema = {
    name: 'Cat',
    properties: {
      birthplace: 'string',
      sex: 'string',
      type: 'string',
    }
  }
  
  const PersonSchema = {
    name: 'Person',
      properties: {
        name: 'string',
        birthday: 'date',
        cats: {type: 'list' , objectType: 'Cat'},
        picture: {type: 'data', optional: true},
    }
  }
  let realm = new Realm({schema: [CatSchema, PersonSchema]})
  
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Count of members in Realm: {realm.objects('Cat').length}
        </Text>
        <View>
          <TextInput
            style={{
              height: 30, 
              width: 100,
              borderWidth: 1,
              borderColor: "rgba(0,0,0,0.5)",
            }}
            placeholder={'Type here'}
            placeholderTextColor={"rgba(198,198,204,1)"}
            onChangeText={(text) => {this.setState({text})}}
            onSubmitEditing={() => {
              realm.write(() => {                 
                realm.create('Cat', {
                  birthplace: 'kakogawa',
                  sex: 'male',
                  type: 'American Shorthair',              
                })
              })
              this.setState({text: ''})
            }}
            value={(this.state && this.state.text) || ''}
          />
        </View>
       
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('realmTest', () => realmTest);
