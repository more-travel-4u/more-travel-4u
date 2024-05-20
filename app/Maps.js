import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { StatusBar } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

let locationsOfInterest = [
  {
    title: "First",
    location: {
      latitude: -27.2,
      longitude: 145
    },
    description: "First Marker"
  },
  {
    title: "Second",
    location: {
      latitude: -30.2,
      longitude: 150
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
          latitude: -26.8526,
          latitudeDelta: 27.4990,
          longitude: 148.1104,
          longitudeDelta: 15.9521,
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
