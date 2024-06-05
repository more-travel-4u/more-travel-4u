import Weather from "./Weather.js";
import Profile from "./Profile.js";
import Settings from './Settings.js';
import Maps from "./Maps.js";
import Notification from "./Notification.js";
import ShareWith from "./Sharing.js";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import ChangeActiveTrip from './ChangeActiveTrip.js';
import CreateNewTrip from "./CreateNewTrip.js";

const SettingsStackNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="My Settings" component={Settings} />
      <Stack.Screen name="Change Active Trip" component={ChangeActiveTrip} />
      <Stack.Screen name="Create New Trip" component={CreateNewTrip} />
    </Stack.Navigator>
  )
}


const MoreTabNavigator = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator defaultStatus="open">
      <Drawer.Screen name="Weather 🌤️" component={Weather} />
      <Drawer.Screen name="Location 📍" component={Maps} />
      <Drawer.Screen name="Profile 👤" component={Profile} />
      <Drawer.Screen name="Notification 🔔" component={Notification} />
      <Drawer.Screen name="Sharing 💬" component={ShareWith} />
      <Drawer.Screen name="Settings ⚙️" component={SettingsStackNavigator} />
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
