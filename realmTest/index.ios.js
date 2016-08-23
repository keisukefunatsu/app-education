
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Switch,
} from 'react-native'
import Realm from 'realm'
import tcomb from 'tcomb-form-native'
import { ListView } from 'realm/react-native';

const TaskSchema = {
  name: 'Task',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
  }
}

const TaskSchema2 = {
  name: 'Task',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    completed: 'bool',
    created_at: 'date',
  }
}

let realm = new Realm({schema: [TaskSchema2], schemaVersion: 3})

class realmTest extends Component {
  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let src = realm.objects('Task').sorted('id')
    this.state = ({
      dataSource: ds.cloneWithRows(src),
      data:src,
    });
    this._renderRow = this._renderRow.bind(this)
  }
  
   _updateData(){ 
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.state.data)
    });
  } 
  _createData(){
    let tasks = realm.objects('Task')
    let date = new Date()
    if (tasks.length == 0) {
      var maxId = 0
    }
    else {
      var maxId = tasks.sorted('id')[tasks.length - 1].id   
    }        
    realm.write(() => {                
      realm.create('Task', {
        id: maxId += 1,
        name: this.state.text, 
        completed: false,
        created_at: date,              
      })
//                    let allcats = realm.objects('Task')
//                     realm.delete(allcats);
    })
  }
  
  _completeItem(id){
    realm.write(() => {
      let item = realm.objects('Task').filtered('id = $0',id)[0]
      item.completed = !item.completed
    })  
    
  }
  _renderRow(rowData) {    
    return (
      <View style={{marginTop:10}}>
        <TouchableHighlight
          onPress={() => {
            this._completeItem(rowData.id)
            this._updateData()
          }}
          activeOpacity={75 / 100}
          underlayColor={"rgb(210,210,210)"}>
          <Text>
            <View style={{
                width: 250,
                height: 30,                
                borderBottomWidth: 1,
              }}>
              <Text style={rowData.completed? styles.completed : ''}>{rowData.name}</Text>            
            </View>            
          </Text>       
        </TouchableHighlight>
        
      </View>
    )
  }

  _hideCompleted(){              
    let data = realm.objects('Task').filtered('completed == true')
    this.setState({
      data: data,
      dataSource: this.state.dataSource.cloneWithRows(this.state.data)
    })
    console.log(this.state.data)
  }
  
  _showCompleted(){              
    let data = realm.objects('Task').filtered('completed == false')
    this.setState({
      data: data,
      dataSource: this.state.dataSource.cloneWithRows(this.state.data)
    })
    console.log(this.state.data)
  }

  render() {
   
    return (
      <View style={styles.container}>       
        <View style={styles.input}>
          <Text style={styles.welcome}>
          お仕事の名前を入れてね       
            { }
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
        <Switch
          value={(this.state && this.state.switchValue) || false}
          onValueChange={(value) => {
            this.setState({switchValue: value})
             if (this.state.switchValue == true) {
              this._hideCompleted()
             }
              else {
                this._showCompleted()
              }
          }}
          tintColor={"rgba(230,230,230,1)"}
          onTintColor={"rgba(68,219,94,1)"}
        />
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
  },
  completed: {
    textDecorationLine: 'line-through', 
    textDecorationStyle: 'solid',
  },
});

AppRegistry.registerComponent('realmTest', () => realmTest);
