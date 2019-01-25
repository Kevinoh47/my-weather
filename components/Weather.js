import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableHighlight, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { weatherConditions } from '../utils/WeatherConditions.js';
import If from '../utils/If.js';

const _convertToF = (temp) => {return (temp * 9 /5 + 32).toFixed(0)};

const Weather = ({ weather, temperature, weatherDescription, details }) => {

  // console.log('Weather.js input props following ...')
  // console.log({weather});
  // console.log({temperature});
  // console.log({weatherConditions});
  // console.log('weatherConditions[weather]...', weatherConditions[weather]);
  // console.log ({weatherDescription});
  // console.log ({details});

  const myF = _convertToF(temperature);
  const myC = temperature.toFixed(1);

  return (

    <View 
      style={[
          styles.weatherContainer, 
          { backgroundColor: weatherConditions[weather].color }
        ]}>
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons 
          size={72} 
          name={weatherConditions[weather].icon}
          color={'#fff'} 
        />
        <Text style={styles.tempText}>{myC}˚C</Text>
        <Text style={styles.subtitle}>{myF}˚F</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>{weather}</Text>
        <Text style={styles.subtitle}>
          {weatherConditions[weather].subtitle}
        </Text>
        <If condition={ (weather).toLowerCase() !== weatherDescription.toLowerCase() } >
          <Text style={styles.subtitle}>
            {weatherDescription}
          </Text>
        </If>
      </View>
    </View>
  );
};

Weather.propTypes = {
  temperature: PropTypes.number.isRequired,
  weather: PropTypes.string
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    backgroundColor: '#f7b733'
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
  bodyContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    marginBottom: 40
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

export default Weather;