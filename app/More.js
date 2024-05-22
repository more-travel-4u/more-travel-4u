import React from 'react';
import store from '../store/index.js';
import { Provider } from 'react-redux';
import Weather from "./Weather.js";
import Maps from "./Maps.js";
import Register from "./Register.js"
import { Text, View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Options() {
  const navigation = useNavigation();

  return (
    <Provider store={store}>
    <View style={styles.container}>
      <Text style={styles.title}>More!</Text>
      <Button
        title="Go to Maps"
        onPress={() => navigation.navigate('Maps')}
        style={styles.button}
      />
      <Button
        title="Go to Weather"
        onPress={() => navigation.navigate('Weather')}
        style={styles.button}
      />
      <Button
        title="Go to Register"
        onPress={() => navigation.navigate('Register')}
        style={styles.button}
      />
    </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
  },
});
