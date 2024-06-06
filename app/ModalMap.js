import { Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as Location from "expo-location";
import { prepareQuery } from './../utils.js';

const ModalMap = () => {
  const [location, setLocation] = useState(null)
  const [userLocation, setUserLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState("")
  const eventLocation = useSelector(state => state.event.modalEvent)

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        let _location = await Location.getCurrentPositionAsync({});
        setUserLocation(_location);
      } catch (error) {
        setErrorMsg("Unable to get user location.")
      }
    }
    const getEventCoordinates = async () => {
      try {
        const stringQuery = prepareQuery(eventLocation.location);
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${stringQuery}&key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`)
        const json = await response.json();
        if (json.status === "OK") {
          setLocation(json.results[0].geometry.location)
        } else return Alert.alert("Error fetching location!")
      } catch (error) {
        console.error("Handle Confirm Address Error", error)
      }
    }
    //getUserLocation();
    getEventCoordinates();
    return (() => {
      setLocation(null);
      setUserLocation(null);
      setErrorMsg("")
    })
  }, [],)

  const showLocationsOfInterest = () => {
    return locationsOfInterest.map((item, index) => {
      return (
        <Marker
          key={index}
          coordinate={item.location}
          title={item.title}
          description={item.description}
        />
      );
    });
  };

  return (
    <>
      <Text>Event Location on Map:</Text>
      {location &&
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.03,
            longitudeDelta: 0.01
          }}
        >
          <Marker
            coordinate={{ latitude: location.lat, longitude: location.lng }}
            title="Event Location"
            titleVisibility="visible"
          />
          {/* <Marker 
            coordinate={{ latitude: userLocation.coords.latitude, longitude: userLocation.coords.longitude }}
            title="User Location"
            pinColor="yellow"
          /> */}
        </MapView>
      }
    </>
  )
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "50%"
  }
})

export default ModalMap