'use strict'

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TextInput,

} from 'react-native';

var BookItem = require('./BookItem');
var API_KEY = '93a132a4b18d4db784da565bb761cf19';
var API_STEM = 'https://api.nytimes.com/svc/books/v3/lists'

class BookList extends Component {
  constructor() {
    super();
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      query: 'e-book-fiction',
      dataSource: ds.cloneWithRows([]),
      error: false
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(event){
    var query = event.nativeEvent.text;
    this.setState({
      query: query
    });
    this._refreshData(this.state.query);
  }

  componentDidMount() {
    this._refreshData(this.state.query);
  }

  _refreshData(query) {
    var endpoint = `${API_STEM}/${query}?response-format=json&api-key=${API_KEY}`
    fetch(endpoint)
      .then((response) => response.json())
      .then((rjson) => {
        console.log(rjson);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(rjson.results.books),
          error: false
        });
      })
      .catch((error) => {
        console.warn(error);
        this.setState({
          error: true
        });
      });
  }

  _renderError() {
    return (
      <View style={styles.container}>
        <View style={styles.queryContainer}>
          <Text>
            No result for {this.state.query} Please input again
          </Text>
          <TextInput
            placeholder="Please input query"
            style={[styles.query, styles.mainText]}
            returnKeyType="go"
            onSubmitEditing={this.onChange}/>
        </View>
      </View>
    );
  }

  _renderRow(rowData) {
      return <BookItem coverURL={rowData.book_image} title={rowData.title} author={rowData.author}/>;
  }

  _renderHeader() {
    return (
      <View style={styles.sectionDivider}>
        <Text style={styles.headingText}>
          Best Seller List
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
    if(this.state.error){
      return this._renderError();
    }
    else {
      return (
        <View style={styles.container}>
          <View style={styles.queryContainer}>
            <TextInput
              placeholder="Please input query"
              style={[styles.query, styles.mainText]}
              returnKeyType="go"
              onSubmitEditing={this.onChange}/>
            <Text style={styles.headingText}>
              Search results for {this.state.query}
            </Text>
          </View>
          <ListView
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
            renderHeader={this._renderHeader}
            renderFooter={this._renderFooter}
            />
        </View>
      );
    }
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
    flex: 1,
    padding: 10,
    borderColor: '#000',
    borderRadius: 4,
    borderWidth: 2,
    alignSelf: 'flex-end',
    textAlign: 'center',
  },
  mainText: {
    fontSize: 16,
    color: '#000',
    alignItems: 'center',
  },
  query: {
    alignSelf: 'center',
    marginTop: 30,
    width: 300 ,
    height: 30,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    marginBottom: 20,
    padding:5,
  },
});

module.exports = BookList;
