
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
import { ListView } from 'realm/react-native'

const TodoSchema = {
  name: 'Task',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    completed: 'bool',
    created_at: 'date',
  }
}

let realm = new Realm({schema: [TodoSchema]})

export default class RealmTodo extends Component {
  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});    
     if (this.props.visibility == 'show_completed') {
        var data = realm.objects('Task').filtered('completed == true')
      }
      else if (this.props.visibility == 'show_active') {
        var data = realm.objects('Task').filtered('completed == false')
      }
      else if (this.props.visibility == 'show_all') {
        var data = realm.objects('Task')
      }
    this.state = ({
      dataSource: ds.cloneWithRows(data),
      data:data,
    });
    this._renderRow = this._renderRow.bind(this)
  }

  componentWillReceiveProps(){
   if (this.props.visibility == 'show_completed') {
      var data = realm.objects('Task').filtered('completed == true')
    }
    else if (this.props.visibility == 'show_active') {
      var data = realm.objects('Task').filtered('completed == false')
    }
    else if (this.props.visibility == 'show_all') {
      var data = realm.objects('Task')
    }
    this._updateData(data)
  }
   _updateData(data){
    this.setState({
      data:data,
      dataSource: this.state.dataSource.cloneWithRows(data),
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
    if (this.props.visibility == 'show_completed') {
        var data = realm.objects('Task').filtered('completed == true')
      }
      else if (this.props.visibility == 'show_active') {
        var data = realm.objects('Task').filtered('completed == false')
      }
      else if (this.props.visibility == 'show_all') {
        var data = realm.objects('Task')
      }
    this._updateData(data)
  }

  _completeItem(id){
    realm.write(() => {
      var item = realm.objects('Task').filtered('id = $0',id)[0]
      item.completed = !item.completed
       if (this.props.visibility == 'show_completed') {
        var data = realm.objects('Task').filtered('completed == true')
      }
      else if (this.props.visibility == 'show_active') {
        var data = realm.objects('Task').filtered('completed == false')
      }
      else if (this.props.visibility == 'show_all') {
        var data = realm.objects('Task')
      }
      this._updateData(data)
    })  
  }
  _renderRow(rowData) {
    return (
      <View style={{marginTop:10}}>
        <TouchableHighlight
          onPress={() => {
            this._completeItem(rowData.id)
          }}
          activeOpacity={75 / 100}
          underlayColor={"rgb(210,210,210)"}>
          <Text>
            <View style={{
                width: 250,
                height: 30,
                borderBottomWidth: 1,
              }}>
              <Text style={rowData.completed? styles.completed : ''}>{rowData.id}:{rowData.name}</Text>
            </View>
          </Text>
        </TouchableHighlight>
      </View>
    )
  }

  _showCompleted(){
    let data = realm.objects('Task').filtered('completed == true')
    this._updateData(data)
  }

  _showActive(){
    let data = realm.objects('Task').filtered('completed == false')
    this._updateData(data)
  }

  render() {
    return (      
      <View style={styles.container}>
        <View style={styles.input}>      
          <Text style={styles.welcome}>
          お仕事の名前を入れてね
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
  },
  completed: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
});

AppRegistry.registerComponent('realmPlayground', () => realmPlayground);
