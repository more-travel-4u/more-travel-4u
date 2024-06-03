import { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, View, Text, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { setCurrentWeather, setErrorMessage } from './../store/weatherSlice.js';

// TODO for this component:
// look into other free weather apis perhaps (Weatherstack has a low monthly limit for free subscription)
// add a seven day weather forecast, and perhaps more details like precipitation
// add in cached weather info access so we can have less API calls
// add in variable city input
// styling!!!

const Weather = () => {

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { currentWeather, errorMessage } = useSelector(state => state.weather);
  const [isLoading, setIsLoading] = useState(true);

  // TODO: get location from phone api, set city to that location
  const city = "New York" // hardcoded for now

  useEffect(() => {
    const WEATHERSTACK_API_URL = "http://api.weatherstack.com/current";
    const WEATHERSTACK_API_KEY = "291d85fdc2c71107ed5381d08676476a"; // need to find a way to hide
    const getWeather = async () => {
      try {
        const response = await fetch(`${WEATHERSTACK_API_URL}?access_key=${WEATHERSTACK_API_KEY}&query=${city}&units=f`)
        const data = await response.json();
        if (!data.success) dispatch(setErrorMessage("Cannot retrieve weather data."))
        else dispatch(setCurrentWeather(data));
      } catch (error) {
        console.error("ERROR", error)
      } finally {
        setIsLoading(false);
      }
    }
    getWeather();
    return (() => {
      setIsLoading(true)
      dispatch(setErrorMessage(""))
    })
  }, [isFocused],);

  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {errorMessage && <Text>{errorMessage}</Text>}
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          (!errorMessage && <FlatList
            data = {
              [
                {
                  id: 1,
                  city: `Today's Weather in ${currentWeather.location.name}`,
                  temperature: `Temperature: ${currentWeather.current.temperature}° F`,
                  description: `Description: ${currentWeather.current.weather_descriptions[0]}`,
                  image: currentWeather.current.weather_icons[0]
                },
              ]
            }
            renderItem = {({item}) => {
              return (
                <View style={{paddingTop: 100}}>
                  <Text>{item.city}</Text>
                  <Text>{item.temperature}</Text>
                  <Text>{item.description}</Text>
                  <Image 
                    source={{uri: item.image}} 
                    style={{width: 50, height: 50}}
                  />
                </View>
              )
            }}
            keyExtractor = {item => item.id}
          />)
        )}
      </View>
    </>
  )
}

export default Weather