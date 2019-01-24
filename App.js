import React from 'react';
import { StyleSheet, Text, View , Animated } from 'react-native';

import { API_KEY } from './utils/weatherAPIKey.js';
import Weather from './components/Weather.js';

export default class App extends React.Component {
  state = {
    isLoading: false,
    temperature: 0,
    weatherCondition: null,
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
      console.log({lat});
      console.log({lon});
      console.log({json});
      console.log('json.main.temp: ',json.main.temp);
      console.log('json.weather[0]: ', json.weather[0]);
      console.log('json.weather[0].main: ', json.weather[0].main);
      this.setState({
        temperature: json.main.temp,
        weatherCondition: (json.weather[0].description) ? json.weather[0].description : json.weather[0].main,
        isLoading:false
      })
    })
    .catch(console(error));
  }

  render() {

    const { isLoading } = this.state;

    console.log("this.state.weatherCondition", this.state.weatherCondition);

    return (
      <View style={styles.container}>
        { isLoading ? <Text>Fetching Weather...</Text> : 
        <Weather weather={this.state.weatherCondition} temperature={this.state.temperature}/>}
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
