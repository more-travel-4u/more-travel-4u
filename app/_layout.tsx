// import { Stack } from "expo-router";
import store from '../store/index.js';
import { Provider } from 'react-redux';
import HomeScreen from "./Home.js";
import SettingsScreen from "./Settings.js";
import Trips from "./Reservations.js";
import Plans from "./Planner.js";
import Notes from "./Memos.js";
import Options from "./More.js";
import Profile from "./Profile.js"
import ReservationPage from './Reservations.js';
import { NavigationContainer } from '@react-navigation/native';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

export default function RootLayout() {

  return (
    <>
      <Provider store={store}>
        <Tab.Navigator
          initialRouteName="Home"
          activeColor="#0d47a1"
          inactiveColor="#01497c"
          barStyle={{ backgroundColor: '#5aa9e6' }}
        >
          <Tab.Screen name="Home" component={HomeScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen name="Reservations" component={ReservationPage}
            options={{
              tabBarLabel: 'Reservations',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="airplane" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen name="Planner" component={Plans}
            options={{
              tabBarLabel: 'Planner',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="notebook" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen name="Memos" component={Notes}
            options={{
              tabBarLabel: 'Memos',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="message-processing-outline" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen name="Profile" component={Profile}
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="message-processing-outline" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen name="More" component={Options}
            options={{
              tabBarLabel: 'More',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="dots-horizontal" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen name="Settings" component={SettingsScreen}
            options={{
              tabBarLabel: 'Settings',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="cog" color={color} size={26} />
              ),
            }} />

        </Tab.Navigator>
      </Provider>
    </>
  );
}
