import { Text, StyleSheet, View } from 'react-native';
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
        setErrorMsg("Unable to get location.")
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

  const handleSelect = (event) => {
    const coordinateLocation = event.nativeEvent.coordinate.latitude.toString().slice(0, 7) + event.nativeEvent.coordinate.longitude.toString().slice(0, 7)
    dispatch(setEventLocation(coordinateLocation))
    navigation.navigate("CreateNewEvent")
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