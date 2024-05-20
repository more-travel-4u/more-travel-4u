import { useEffect } from 'react';
import { SectionList, StyleSheet, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentWeather } from './../store/weatherSlice.js';
import { API_URL } from '.'; // from ./index.tsx

const Weather = () => {

  const dispatch = useDispatch();
  const currentWeather = useSelector(state => state.weather.currentWeather);

  const getWeather = async () => {
    try {
      const response = await fetch()
    } catch (error) {
      console.error("An error has occurred:", error);
    }
  }

  useEffect(() => {
  }, [],)
  
  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{currentWeather}</Text>
      </View>
    </>
  )
}

export default Weather