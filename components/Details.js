import React , { Component } from 'react';
import { Modal, View, Text, StyleSheet, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import PropTypes from 'prop-types';

const Details = ({ data }) => {

  console.log('Details.js input props following ...')
  console.log ({data});

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

  return (

    <View style={styles.modalContainer}>
      <Text style={styles.title}>Details</Text>

      <Text style={styles.subtitle}>Weather Details</Text>

      <Text style={styles.item}>{data[0].name} {data[0].value}</Text>
      <Text style={styles.item}>{data[1].name} {data[1].value}</Text>
      <Text style={styles.item}>{data[2].name} {data[2].value}</Text>
      <Text style={styles.item}>{data[3].name} {data[3].value}</Text>
      <Text style={styles.item}>{data[4].name} {data[4].value}</Text>
      <Text style={styles.item}>{data[5].name} {data[5].value}</Text>
      <Text style={styles.item}>{data[6].name} {data[6].value}</Text>
      <Text style={styles.item}>{data[7].name} {data[7].value}</Text>
      <Text style={styles.item}>{data[8].name} {data[8].value}</Text>

      <List containerStyle={{ borderTopWidth: 10, borderBottomWidth: 10 }>
        <FlatList 
          data={ data }
          renderItem={({ item }) => {
            <ListItem 
              title = {`${item.name}`} 
              subtitle = {`${item.value}`}
              containerStyle={{ borderBottomWidth: 0 }}
            />
          }}
          keyExtractor={item => item.name}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </List>

    </View>
    
  );
};

// Details.propTypes = {
//   temperature: PropTypes.number.isRequired,
//   weather: PropTypes.string
// };

const styles = StyleSheet.create({
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