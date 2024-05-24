import 'react-native-gesture-handler'; // do not move away from line 1
import store from '../store/index.js';
import { Provider } from 'react-redux';
import HomeScreen from "./Home.js";
import Trips from "./Reservations.js";
import Planner from "./Planner.js";
import Notes from "./Memos.js";
import CreateNewEvent from "./CreateNewEvent.js";
import More from "./More.js";
import Register from "./Register.js"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Login, { API_URL } from './Login.js';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { setToken } from '../store/authSlice.js';
import { MD3LightTheme, PaperProvider } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { createStackNavigator } from '@react-navigation/stack'

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();
const RegStack = createStackNavigator();

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

const EventStackNavigator = () => {
  return (
    <RegStack.Navigator>
      <RegStack.Screen name="Planner" component={Planner} />
      <RegStack.Screen name="CreateNewEvent" component={CreateNewEvent} />
    </RegStack.Navigator>
  )
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
      component={EventStackNavigator}
      options={{
        tabBarLabel: 'Events',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="notebook" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen 
      name="Home" 
      component={HomeScreen}
      mode="contained"
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
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
      name="More" 
      component={More}
      options={{
        tabBarLabel: 'More',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="dots-horizontal" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
  )
}

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "silver",
    secondary: "gold"
  }
}

const RootLayoutWrapper = () => {
  return (
    <Provider {...{store}}>
      <PaperProvider {...{theme}}>
        <RootLayout />
      </PaperProvider>
    </Provider>
  )
}

export default RootLayoutWrapper
