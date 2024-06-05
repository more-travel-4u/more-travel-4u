import { Text, StyleSheet, View, Alert } from 'react-native';
import MapView from 'react-native-maps';
import { useEffect, useState } from 'react'
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { setEventLocation } from "./../store/eventSlice.js";
import { ActivityIndicator } from 'react-native-paper';

const ChooseFromMap = ({ navigation }) => {

  const dispatch = useDispatch();
  const eventLocation = useSelector(state => state.event.eventLocation);
  const [errorMsg, setErrorMsg] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        let _location = await Location.getCurrentPositionAsync({});
        setLocation(_location);
      } catch (error) {
        // setErrorMsg("Unable to get location.")
        setLocation({
          coords: {
            latitude: 41.9398,
            longitude: -87.6589,
          }
        })
      }
    }
    getLocation();
  }, [],)

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const handleSelect = async (event) => {
    const coordinateLocation = event.nativeEvent.coordinate.latitude.toString().slice(0, 9) + event.nativeEvent.coordinate.longitude.toString().slice(0, 9)
    console.log(event.nativeEvent.coordinate.latitude.toString())
    console.log(event.nativeEvent.coordinate.longitude.toString())
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${event.nativeEvent.coordinate.latitude.toString().slice(0, 8)},${event.nativeEvent.coordinate.longitude.toString().slice(0, 8)}&key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`)
      const json = await response.json();
      if (json.status === "OK") {
        dispatch(setEventLocation(json.results[0].formatted_address))
        navigation.navigate("CreateNewEvent")
      } else Alert.alert("Error choosing from map; please try again later.")
    } catch (error) {
      console.error("Choose from map error", error)
    }
  }

  return (
    <>
      {!location && <ActivityIndicator />}
      {location &&
        <MapView
          style={styles.map}
          mapType="hybrid"
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00421,
          }}
          onPress={handleSelect}
          onPoiClick={handleSelect}
        ></MapView>
      }
    </>
  )
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%"
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
})

export default ChooseFromMap;