import 'react-native-gesture-handler'; // do not move away from line 1
import store from '../store/index.js';
import { Provider } from 'react-redux';
import HomeScreen from "./Home.js";
import hotelDetails from "./Hotels.js";
import Planner from "./Planner.js";
import Notes from "./Memos.js";
import CreateNewEvent from "./CreateNewEvent.js";
import ChooseFromMap from "./ChooseFromMap.js";
import More from "./More.js";
import Register from "./Register.js"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Login, { API_URL } from './Login.js';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { setToken } from '../store/authSlice.js';
import { MD3LightTheme, PaperProvider, Text } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { createStackNavigator } from '@react-navigation/stack'
import { Button } from 'react-native'; // TODO: change to react-native-paper
import { set_showFAB as setShow } from './../store/eventSlice.js';
import { formatDate } from './../utils.js';

// // Function for formatting our date.
// export const formatDate = (inputDate) => {
//   const date = inputDate.slice(0, 10)
//   const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
//   const strArray = date.split('');
//   let monthNum = strArray[5] + strArray[6];
//   if (monthNum[0] === '0') monthNum = monthNum.substring(1);
//   return `${months[Number(monthNum)-1]} ${strArray[8]}${strArray[9]}, ${strArray[0]}${strArray[1]}${strArray[2]}${strArray[3]}`
// }


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
            if (json?.message === "Not Logged In") {
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

  const selectedPlannerDate = useSelector(state => state.event.selectedPlannerDate);
  const dispatch = useDispatch();

  return (
    <RegStack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#85A295' } }}>
      <RegStack.Screen
        name="Planner"
        component={Planner}
        options={{
          headerTitle: () => <Text style={{ "fontSize": 20 }}>{`Planner: ${formatDate(selectedPlannerDate)}`}</Text>,
          // headerRight: () => {
          //   <Button 
          //     title = "Change Date"
          //     color = "#00cc00"
          //     onPress={() => {
          //       dispatch(setShow(true));
          //     }}
          //   />
          // }
        }}
      />
      <RegStack.Screen name="CreateNewEvent" component={CreateNewEvent} />
      <RegStack.Screen name="ChooseFromMap" component={ChooseFromMap} />
    </RegStack.Navigator>
  )
}

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="white"
      inactiveColor="#e5ebe8"
      barStyle={{ backgroundColor: '#6667AB' }}
    >
      <Tab.Screen
        name="Hotels"
        component={hotelDetails}
        options={{
          tabBarLabel: 'Hotels',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="airplane" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="_sitemap"
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
  // colors: {
  //   ...MD3LightTheme.colors,
  // primary: "silver",
  // secondary: "gold"
  // }
}

const RootLayoutWrapper = () => {
  return (
    <Provider {...{ store }}>
      <PaperProvider {...{ theme }}>
        <RootLayout />
      </PaperProvider>
    </Provider>
  )
}

export default RootLayoutWrapper
