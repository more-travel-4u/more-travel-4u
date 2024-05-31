import Weather from "./Weather.js";
import Profile from "./Profile.js";
import Settings from './Settings.js';
import Maps from "./Maps.js";
import Notification from "./Notification.js";
import ShareWith from "./ShareWith.js";
import Chatting from "./Chatting.js";
// import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';


const MoreTabNavigator = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator defaultStatus="open">
      <Drawer.Screen name="Weather" component={Weather} />
      <Drawer.Screen name="Location" component={Maps} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Notification" component={Notification} />
      <Drawer.Screen name="ShareWith" component={ShareWith} />
      {/* <Drawer.Screen name="Chatting" component={Chatting} /> */}
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  )
}

export default function More() {
  return (
    <>
      <MoreTabNavigator />
    </>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   button: {
//     marginVertical: 10,
//   },
// });
