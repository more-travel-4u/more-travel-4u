import { useEffect, useState } from 'react';
import { SectionList, StyleSheet, ActivityIndicator, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { setCurrentWeather } from './../store/weatherSlice.js';
import { API_URL } from '.'; // from ./index.tsx

const Weather = () => {

  const testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhYWEiLCJpYXQiOjE3MTU5NTUxMTF9.qr0AsAO0KQAF6OBjoIgg7dMNvFj4b9YNkZNR-M7DumU"

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const currentWeather = useSelector(state => state.weather.currentWeather);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getWeather = async () => {
      try {
        const response = await fetch(API_URL + '/api/weather', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${testToken}` // hard-coded for now
          },
          body: {
            city: "New York" // hard-coded for now
          }
        })
        const json = await response.json();
        dispatch(setCurrentWeather(json.data));
      } catch (error) {
        console.error("An error has occurred:", error);
      } finally {
        setIsLoading(false);
      }
    }
    console.log("Hello")
    getWeather();
  }, [isFocused],);
  
  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* {isLoading ? (
          <ActivityIndicator />
        ) : (
          <><Text>I am weather tab!</Text></>
          // <SectionList 
          //   sections = {[
          //     {}
          //   ]}
          
          
          
          
          // />
        )} */}
        <Text>I am weather tab!</Text>
      </View>
    </>
  )
}

export default Weather