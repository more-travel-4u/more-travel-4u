import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { StatusBar } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

let locationsOfInterest = [
  {
    title: "Vegas",
    location: {
      latitude: 36.1517,
      longitude: -115.1494
    },
    description: "First Marker"
  },
  {
    title: "Tokyo",
    location: {
      latitude: 35.6764,
      longitude: 139.6500
    },
    description: "Second Marker"
  },
];

export default function Maps() {
  const onRegionChange = (region) => {
    console.log(region);
  };

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
    <View style={styles.container}>
      <MapView
        style={styles.map}
        onRegionChange={onRegionChange}
        initialRegion={{
          latitude: 41.9398,
          latitudeDelta: 6.4264,
          longitude: -87.6589,
          longitudeDelta: 4.3986,
        }}
      >
        {showLocationsOfInterest()}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
