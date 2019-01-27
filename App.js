import React from 'react';
import { Modal, TouchableHighlight, Alert, StyleSheet, Text, View  } from 'react-native';

import { API_KEY } from './utils/weatherAPIKey.js';
import Weather from './components/Weather.js';
import Details from './components/Details.js';
import { Accelerometer } from 'expo';

class App extends React.Component {
  state = {
    isLoading: false,
    temperature: 0,
    weatherCondition: 'Default',
    weatherDescription: 'null',
    data: [],
    modalVisible: false,
    accelerometerData: {},
    gestured: false,
    error: null
  };

  componentDidMount = () => {
    this._subscribe();
    navigator.geolocation.getCurrentPosition (
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({ error: 'Error retrieving weather.'});
      }
    );
  }

  componentWillUnmount = () => {
    this.setState({gestured: false})
  }

  /** 
   * x coordinate is pushing horizontally to the right about 45 degrees; y is force straight up .9 would be almost straight up  
   **/
  gestured = () => {
    const { x, y } = this.state.accelerometerData;
    // console.log({x});
    // console.log({y})
    if (x < -0.3 && y > 0.6) {
      this.setState({gestured: !this.state.gestured})
      this.setModalVisible(!this.state.modalVisible);
    }
  }

  _subscribe = () => {
    // When invoked, the listener is provided a single argumument that is an object containing keys x, y, z.
    Accelerometer.setUpdateInterval(1500);
    this._subscription = Accelerometer.addListener((accelerometerData) => {
      this.setState({ accelerometerData });
      this.gestured();
    });
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
          {name: "location", value: (json.name) ? json.name : ''}, 
          {name: "lat", value:  (lat) ? lat : 0},
          {name: "lon", value:  (lon) ? lon : 0},
          {name: "humidity", value:  (json.main.humidity) ? json.main.humidity : 0}, 
          {name: "pressure", value:  (json.main.pressure) ? json.main.pressure : 0}, 
          {name: "maxtemp", value:  (json.main.temp_max) ? json.main.temp_max : 0 }, 
          {name: "mintemp", value:  (json.main.temp_min) ? json.main.temp_min : 0}, 
          {name: "winddir", value:  (json.wind.deg) ? json.wind.deg : 0 }, 
          {name: "windspeed", value:  (json.wind.speed) ? json.wind.speed : 0}
        ]
      })
    })
    .catch(console(error));
  }

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  }

  render() {
    const { isLoading } = this.state.isLoading;

    return (
      <View style={styles.container}>
        { isLoading ?  <Text>Fetching Weather...</Text>  : 
          <Weather 
            weather={this.state.weatherCondition} 
            temperature={this.state.temperature}
            weatherDescription={this.state.weatherDescription}
          />
        }
        <View style={{marginTop: 22}}>
          <Modal
            style={styles.modalContainer}
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={{marginTop: 22}}>
              <View>{isLoading ? <Text>Fetching Details...</Text>  : <Details data={this.state.data} />}
                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Text>Hide Details</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
          <TouchableHighlight
            onPress={() => {
              this.setModalVisible(true);
            }}>
            <Text>Show Details</Text>
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

export default App;
