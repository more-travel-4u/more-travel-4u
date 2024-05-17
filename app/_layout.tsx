import { Stack } from "expo-router";
import store from '../store/index.js';
import { Provider } from 'react-redux';
import { Text, View } from 'react-native';
import HomeScreen from "./Home.js";
import SettingsScreen from "./Settings.js";
import Trips from "./Reservations.js";
import Plans from "./Planner.js";
import Notes from "./Memos.js";
import Options from "./More.js";
import ProfilePage from "./Profile.js"
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

export default function RootLayout() {

  return (
    <>
      <Provider store={store}>
        <Tab.Navigator
          initialRouteName="Home"
          activeColor="#f0edf6"
          inactiveColor="#3e2465"
          barStyle={{ backgroundColor: '#694fad' }}
        >
          <Tab.Screen name="Home" component={HomeScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen name="Reservations" component={Trips}
          />
          <Tab.Screen name="Planner" component={Plans}
          />
          <Tab.Screen name="Memos" component={Notes}
          />
          <Tab.Screen name="Profile" component={ProfilePage}
          />
          <Tab.Screen name="More" component={Options}
          />


          <Tab.Screen name="Settings" component={SettingsScreen}
            options={{
              tabBarLabel: 'Settings',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account" color={color} size={26} />
              ),
            }} />

        </Tab.Navigator>
      </Provider>
    </>
  );
}
