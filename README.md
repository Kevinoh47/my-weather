



![CF](http://i.imgur.com/7v5ASc8.png) LAB
=================================================

## Lab 41 React Native -- my-weather
### Author: Kevin O'Halloran

### Links and Resources
* [repo](https://github.com/Kevinoh47/my-weather)

I built the base of this app following this tutorial:
https://blog.expo.io/building-a-minimalist-weather-app-with-react-native-and-expo-fe7066e02c09

And then expanded it, using these resources as references:

https://docs.expo.io/versions/latest/sdk/accelerometer/
https://medium.com/@aurelie.lebec/triggering-an-event-on-phone-movement-react-native-and-expo-32e55a4e184c
https://developer.android.com/reference/android/hardware/SensorEvent

I considered using react-native-sensors as a dependency, but read somewher that it did not work with Expo.  

The weather API is:
https://openweathermap.org/weather-conditions

Two things that I tried and didn't get to work:

1) I tried passing a function down via state from parent (App.js) to child (a component that is now deleted for managing the accelerometer.) I wanted the Accelerometer class to manage that state, and run the function passed in props to update the parent App. In theory, this should have worked but in the end, I realized that the Accelerometer functions were simple enough to put in the App class itself.

2) I passed state from App to the child Details module, and wanted to iterate over an array to render a FlatList with RenderItem prop. Again I ran out of time, not sure why this didn't work. Because it was a known list of values in the array, however, I could (ineligantly) unpack them without iterating the array.


### Modules
#### `app.js`
##### Exported Values and Methods
The app.js file builds and exports the App class component. This class contains a single render() method whhich returns a View which manages the Weather data as well as the child elements for a modal window of weather Details.

The App class component also manages the API call via react native fetch, called in the fetchWeather() function.

App also creates a listener for Accelerometer data (_subscribe()) and updates state based on that. The _subscribe() function also calls handRaised(), which also sets state based on data from the listener. 

The componentDidMount lifecycle function calls fetchWeather() and _subsribe(). 

#### `Details.js`
##### Exported Values and Methods
The Details component housed in /components/Details.js exports itself. Props are passed in from the Apps component. Details has a render() method for rendering weather details. In the current implementation it is used by the Apps component to open a Modal window with weather details. 


#### `Weather.js`
##### Exported Values and Methods
The Weather component (./components/weather.js) exports itself, and has a render method, which is used to return the main weather data. Props are taken from the Apps component and the weatherDescription static component; Data from each is married based on weather key words to render a dynamic page based on current conditions.

#### `If.js`
##### Exported Values and Methods
The ./utils/If.js file houses the If functional component, which is used to for conditionally rendering child components wrapped in this method. It returns either child props or null, based on whether or not a condition within the passed down props is true.

#### `weatherAPIKey.js`
##### Exported Values and Methods
The ./utils/weatherAPIKey.js file simply exports an API key constant. A useful refactoring would be to move this constant to a dotEnv file to mask it from implementation -- although since we are using a simple GET currently, we would also need to change the API call to a POST to prevent the API key from being sniffed.


#### `weatherCondition.js`
##### Exported Values and Methods
The ./utils/WeatherCondition.js file exports a constant object which constains a set of objects that describe varying weather conditions, and which supply icons for those weather conditions.

#### Tests

#### UML
