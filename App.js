import React , {Component} from 'react';
import { Modal, TouchableHighlight, Alert, StyleSheet, Text, View , Animated } from 'react-native';

import { API_KEY } from './utils/weatherAPIKey.js';
import Weather from './components/Weather.js';
import Details from './components/Details.js';

export default class App extends React.Component {
  state = {
    isLoading: false,
    temperature: 0,
    weatherCondition: 'Default',
    weatherDescription: 'null',
    data: [],
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
        data: [
          {name: "location", value: json.name}, 
          {name: "lat", value:  lat},
          {name: "lon", value:  lon},
          {name: "humidity", value:  json.main.humidity}, 
          {name: "pressure", value:  json.main.pressure}, 
          {name: "maxtemp", value:  json.main.temp_max}, 
          {name: "mintemp", value:  json.main.temp_min}, 
          {name: "winddir", value:  json.wind.deg}, 
          {name: "windspeed", value:  json.wind.speed}
        ]
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

    return (
      <View style={styles.container}>
        { isLoading ? 
          <Text>Fetching Weather...</Text> 
            : 
              <Weather 
                weather={this.state.weatherCondition} 
                temperature={this.state.temperature}
                weatherDescription={this.state.weatherDescription}
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
                <Text>Details</Text>
                <Details data={this.state.data} />
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
