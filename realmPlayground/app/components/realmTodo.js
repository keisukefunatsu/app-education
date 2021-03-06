
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
let tasks = realm.objects('Task')

export default class RealmTodo extends Component {
  getData(text){
      if (text == 'show_completed') {
        return tasks.filtered('completed == true')
      }
      else if (text == 'show_active') {
        return tasks.filtered('completed == false')
      }
      else if (text == 'show_all') {
        return tasks
      }
      else {
        return tasks
      }
    }
  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});    
    this.state = ({
      dataSource: ds.cloneWithRows(this.getData(this.props.visibility)),
      data:this.getData(this.props.visibility),
    });
    this._renderRow = this._renderRow.bind(this)
  }

  componentWillReceiveProps(){
    let data = this.getData(this.props.visibility)
    this._updateData(data)
  }
   _updateData(data){
    this.setState({
      data:data,
      dataSource: this.state.dataSource.cloneWithRows(data),
    });
  }
  _createData(){
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
//       テストデータ削除用
      // realm.delete(tasks)
    })
    let data = this.getData(this.props.visibility)
    this._updateData(data)
  }

  _completeItem(id){
    realm.write(() => {
      var item = tasks.filtered('id = $0',id)[0]
      item.completed = !item.completed
      let data = this.getData(this.props.visibility)
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
            <View style={styles.items}>
              <Text style={rowData.completed? styles.completed : styles.item }>{rowData.name}</Text>
            </View>
          </Text>
        </TouchableHighlight>
      </View>
    )
  }

  _showCompleted(){
    let data = tasks.filtered('completed == true')
    this._updateData(data)
  }

  _showActive(){
    let data = tasks.filtered('completed == false')
    this._updateData(data)
  }

  _create_manyData(){
    for(i = 0; i < 1000; i++ ) {
      this._createData()
      console.log(i)
    }
    
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
         <TouchableHighlight
          activeOpacity={75 / 100}
          underlayColor={"rgb(210,210,210)"}>
          <Text>戻る</Text>
        </TouchableHighlight>
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
    borderRadius: 5,
  },
  list: {
    flex: 4,
    justifyContent: 'center',
  },
  completed: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',    
  },
  items: {
    width: 300,    
    flexDirection: 'row',
    height: 40,
    borderBottomWidth: 1,
    borderRadius: 5,    
  },
  item: {
    fontSize: 16,
    paddingLeft: 10,
  }
});

AppRegistry.registerComponent('realmPlayground', () => realmPlayground);
