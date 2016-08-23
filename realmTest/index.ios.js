
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} from 'react-native'
import Realm from 'realm'
import tcomb from 'tcomb-form-native'
import { ListView } from 'realm/react-native';

const PersonSchema = {
  name: 'Person',
    properties: {
      name: 'string',
      birthday: 'date',
      cats: {type: 'list' , objectType: 'Cat'},
      picture: {type: 'data', optional: true},
  }
}

const UpdatedCatSchema = {
  name: 'Cat',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    birthplace: 'string',
    sex: 'string',
    type: 'string',
  }
}

let realm = new Realm({schema: [UpdatedCatSchema, PersonSchema], schemaVersion: 2})

class realmTest extends Component {
  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let src = realm.objects('Cat')
    this.state = ({
      dataSource: ds.cloneWithRows(src),
      data:src
    });
    this._deleteItem = this._deleteItem.bind
  }
  
   _updateData(){ 
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.state.data)
    });
  } 
  _createData(){
   realm.write(() => {     
           let maxId = realm.objects('Cat').length
           realm.create('Cat', {
              id: maxId += 1,
              name: this.state.text,
              birthplace: 'kakogawa',
              sex: 'male',
              type: 'American Shorthair',              
            })
//                let allcats = realm.objects('Cat')
//                 realm.delete(allcats);
          })
  }
  _deleteItem(id){
    realm.write(() => {
      let item = realm.objects('Cat').filterd('id' == id)
      realm.delete(item)
    })  
  }
  
  _onpressCatData(){
    console.log('It works~')
  }
  _renderRow(rowData) {
    return (
      <View style={{marginTop:10}}>
        <TouchableHighlight
          onPress={() => {this._deleteItem(rowData.id)}}
          activeOpacity={75 / 100}
          underlayColor={"rgb(210,210,210)"}>
          <Text>
            <View style={{
                width: 250,
                height: 40,                
                borderBottomWidth: 1,
              }}>
              <Text>名前：{rowData.name}</Text>
              <Text>ID：{rowData.id}</Text>                            
            </View>            
          </Text>       
        </TouchableHighlight>
        
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>       
        <View style={styles.input}>
          <Text style={styles.welcome}>
          猫ちゃんの名前を入れてね       
          </Text>
          <TextInput
            style={{
              height: 30, 
              width: 150,
              borderWidth: 1,
              borderColor: "rgba(0,0,0,0.5)",
              marginTop: 10,
            }}
            placeholder={'Type here'}
            placeholderTextColor={"rgba(198,198,204,1)"}
            onChangeText={(text) => {this.setState({text})}}
            onSubmitEditing={() => {
              this._createData()                          
              this._updateData()
              this.setState({text: ''})  
            }}
            value={(this.state && this.state.text) || ''}
          />
        </View>
        <View style={styles.list}>
           <ListView
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
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
  input: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flex: 4,
    justifyContent: 'center',
  }
});

AppRegistry.registerComponent('realmTest', () => realmTest);
