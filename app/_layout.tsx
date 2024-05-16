import { Stack } from "expo-router";
import store from '../store/index.js';
import { Provider } from 'react-redux';
import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function RootLayout() {

  return (
    <>
      {/* <NavigationContainer> */}
      <Tab.Navigator>
        {/* <Provider store={store}> */}
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        {/* </Provider> */}
      </Tab.Navigator>
      {/* </NavigationContainer> */}
    </>
  );
}


