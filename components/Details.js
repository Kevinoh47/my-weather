import React , { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import PropTypes from 'prop-types';

class Details extends Component {

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  render() {
    console.log('Details.js input props following ...')
    console.log (this.props.data);
    return (
  
      <View >
        <Text style={styles.title}>Details</Text>
  
        <Text style={styles.subtitle}>Weather Details</Text>
  
        <Text style={styles.item}>{this.props.data[0].value}</Text>
        <Text style={styles.item}>{this.props.data[1].name} {this.props.data[1].value}</Text>
        <Text style={styles.item}>{this.props.data[2].name} {this.props.data[2].value}</Text>
        <Text style={styles.item}>{this.props.data[3].name} {this.props.data[3].value}</Text>
        <Text style={styles.item}>{this.props.data[4].name} {this.props.data[4].value}</Text>
        <Text style={styles.item}>{this.props.data[5].name} {this.props.data[5].value}</Text>
        <Text style={styles.item}>{this.props.data[6].name} {this.props.data[6].value}</Text>
        <Text style={styles.item}>{this.props.data[7].name} {this.props.data[7].value}</Text>
        <Text style={styles.item}>{this.props.data[8].name} {this.props.data[8].value}</Text>
  
        {/* <List containerStyle={{ borderTopWidth: 2, borderBottomWidth: 2 }} >
          <FlatList 
            data={ this.props.data }
            renderItem={({ item }) => {
              <ListItem 
                title = {`${item.name} oh my test title value` } 
                subtitle = {`${item.value} and test subtitle value`}
                containerStyle={{ borderBottomWidth: 0 }}
              />
            }}
            keyExtractor={item => item.name}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </List> */}
      </View>
    );
  }
}

// Details.propTypes = {
//   temperature: PropTypes.number.isRequired,
//   weather: PropTypes.string
// };

const styles = StyleSheet.create({
  item: {
    color: '#070707',
    fontSize: 36,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e6ed17',
    color: '#070707',
    fontSize: 36,
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tempText: {
    fontSize: 48,
    color: '#fff'
  },
  title: {
    fontSize: 48,
    color: '#fff'
  },
  subtitle: {
    fontSize: 24,
    color: '#fff'
  }
});

export default Details;