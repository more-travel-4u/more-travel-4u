import store from '../store/index.js';
import { Provider } from 'react-redux';
import HomeScreen from "./Home.js";
import SettingsScreen from "./Settings.js";
import Trips from "./Reservations.js";
import Plans from "./Planner.js";
import Notes from "./Memos.js";
import Weather from "./Weather.js";
import Maps from "./Maps.js";
import Options from "./More.js";
import Profile from "./Profile.js"
import Register from "./Register.js"
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Login, { API_URL } from './Login.js';
import SplashScreen from './SplashScreen.js';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';
import { setToken } from '../store/authSlice.js';

const Tab = createMaterialBottomTabNavigator();

const Stack = createNativeStackNavigator();

function RootLayout() {

  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token)

  useEffect(() => {
    if (!token)
      (async function getToken() {
        try {
          const theToken = await SecureStore.getItemAsync("token");
          if (theToken) {
            const response = await fetch(API_URL + "/verify", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${theToken}`
              }
            })
            const json = await response.json();
            if (json?.message === "Not Logged In"){
              dispatch(setToken(""));
              await SecureStore.setItemAsync("token", "");
            }
          }
        } catch (error) {
          console.error(error);
        }
      })();
  }, [token],)


  return (
    <>
      {token ? (
        <MainTabNavigator />
        ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      )}
    </>
  );
}

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#0d47a1"
      inactiveColor="#01497c"
      barStyle={{ backgroundColor: '#5aa9e6' }}
    >
    <Tab.Screen 
      name="Home" 
      component={HomeScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen 
      name="Reservations" 
      component={Trips}
      options={{
        tabBarLabel: 'Reservations',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="airplane" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen 
      name="Planner" 
      component={Plans}
      options={{
        tabBarLabel: 'Planner',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="notebook" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen 
      name="Memos" 
      component={Notes}
      options={{
        tabBarLabel: 'Memos',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="message-processing-outline" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen 
      name="Profile" 
      component={Profile}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="message-processing-outline" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen 
      name="More" 
      component={Options}
      options={{
        tabBarLabel: 'More',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="dots-horizontal" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen 
      name="Settings" 
      component={SettingsScreen}
      options={{
        tabBarLabel: 'Settings',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="cog" color={color} size={26} />
        ),
      }} 
    />
    <Tab.Screen 
      name="Maps" 
      component={Maps}
      options={{
        tabBarLabel: 'Maps',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="cog" color={color} size={26} />
        ),
      }} 
    />          
    <Tab.Screen 
      name="Weather" 
      component={Weather}
      options={{
        tabBarLabel: 'Weather',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="cog" color={color} size={26} />
        ),
      }} 
    />
  </Tab.Navigator>
  )
}

const RootLayoutWrapper = () => {
  return (
    <Provider {...{store}}>
      <RootLayout />
    </Provider>
  )
}

export default RootLayoutWrapper
