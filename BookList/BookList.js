'use strict'

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableHighlight,

} from 'react-native';

var BookItem = require('./BookItem');
var API_KEY = '93a132a4b18d4db784da565bb761cf19';
var QUERY_TYPE = 'hardcover-fiction';
var API_STEM = 'https://api.nytimes.com/svc/books/v3/lists'
var ENDPOINT = `${API_STEM}/${QUERY_TYPE}?response-format=json&api-key=${API_KEY}`;

class BookList extends Component {
  constructor() {
    super();
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([])
    };
    this._refreshData = this._refreshData.bind(this)
  }
  componentDidMount() {
    this._refreshData();
  }

  _refreshData() {
    fetch(ENDPOINT)
      .then((response) => response.json())
      .then((rjson) => {
        console.log(rjson);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(rjson.results.books)
        });
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  _renderRow(rowData) {
      return <BookItem coverURL={rowData.book_image} title={rowData.title} author={rowData.author}/>;
  }

  _renderHeader() {
    return ( <View style={styles.sectionDivider}>
      <Text style={styles.headingText}>
        Bestselllers in hardcover-fiction
      </Text>
      </View>
    );
  }

  _renderFooter() {
    return (
      <View style={styles.sectionDivider}>
        <Text>
          Data from New York Times Best sellers list.
        </Text>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight  onPress={this._refreshData}>
         <Text style={styles.button}>
           再読み込み
         </Text>
       </TouchableHighlight>
        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderHeader={this._renderHeader}
          renderFooter={this._renderFooter}
          />
        <Text>
          {console.log(ENDPOINT)}
        </Text>

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
    paddingTop: 24,
  },
  list: {
    flex: 1,
    flexDirection: 'row',
  },
  listContent: {
    flex: 1 ,
    flexDirection: 'column',
  },
  row: {
    flex: 1,
    fontSize: 24,
    padding: 42 ,
    borderWidth: 1,
    borderColor: '#dddddd',
  },
  sectionDivider: {
    padding: 8,
    backgroundColor: '#eeeeee',
    alignItems: 'center'
  },
  headingText: {
    flex: 1,
    fontSize: 24,
    alignSelf: 'center',
  },
  button: {
    padding: 15,
    borderColor: '#000',
    borderRadius: 4,
    borderWidth: 2,
    textAlign: 'center',
  }
});

module.exports = BookList;
