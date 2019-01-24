import React , {Component} from 'react';
import { Modal, TouchableHighlight, Alert, StyleSheet, Text, View , Animated } from 'react-native';

import { API_KEY } from './utils/weatherAPIKey.js';
import Weather from './components/Weather.js';

export default class App extends React.Component {
  state = {
    isLoading: false,
    temperature: 0,
    weatherCondition: 'Default',
    weatherDescription: 'null',
    details: {},
    modalVisible: false,
    error: null
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition (
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({ error: 'Error retrieving weather.'});
      }
    );
  }

  fetchWeather(lat=47.6261111111, lon=-122.5208333333) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
    .then(res => res.json())
    .then(json => {
      this.setState({
        isLoading:false,
        temperature: json.main.temp,
        weatherCondition: json.weather[0].main,
        weatherDescription: json.weather[0].description,
        details: {
          location: json.name, 
          lat: lat,
          lon: lon,
          humidity: json.main.humidity, 
          pressure: json.main.pressure, 
          maxtemp: json.main.temp_max, 
          mintemp: json.main.temp_min, 
          winddir: json.wind.deg, 
          windspeed: json.wind.speed
        }
      })
      console.log("this.state", this.state);
    })
    .catch(console(error));
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    const { isLoading } = this.state;

    console.log("this.state.weatherCondition", this.state.weatherCondition);

    return (
      <View style={styles.container}>
        { isLoading ? 
          <Text>Fetching Weather...</Text> 
            : 
              <Weather 
                weather={this.state.weatherCondition} 
                temperature={this.state.temperature}
                weatherDescription={this.state.weatherDescription}
                details={this.state.details}
              />
        }

        <View style={{marginTop: 22}}>
          <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
            <View style={{marginTop: 22}}>
              <View>
                <Text>Hello World!</Text>

                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Text>Hide Modal</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>

          <TouchableHighlight
            onPress={() => {
              this.setModalVisible(true);
            }}>
            <Text>Show Modal</Text>
          </TouchableHighlight>
        </View>



      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
