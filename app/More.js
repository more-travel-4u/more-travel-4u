import Weather from "./Weather.js";
import Profile from "./Profile.js";
import Settings from './Settings.js';
import Maps from "./Maps.js";
import Notification from "./Notification.js";
import ShareWith from "./Sharing.js";
// import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';


const MoreTabNavigator = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator defaultStatus="open">
      <Drawer.Screen name="Weather 🌤️" component={Weather} />
      <Drawer.Screen name="Location 📍" component={Maps} />
      <Drawer.Screen name="Profile 👤" component={Profile} />
      <Drawer.Screen name="Notification 🔔" component={Notification} />
      <Drawer.Screen name="Sharing 💬" component={ShareWith} />
      <Drawer.Screen name="Settings ⚙️" component={Settings} />
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