import { Text, View, Button } from 'react-native';
import { setToken } from './../store/authSlice.js';
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux';
import { clearAll } from './../store/userSlice.js';
import { clearActiveTrip, resetActiveTripCompanions } from './../store/tripSlice.js';

export default function Settings({ navigation }) {

  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Change your active trip!</Text>
      <Button title="Change Active Trip" onPress={() => navigation.navigate("Change Active Trip")}/>
      <Text>Create a new trip!</Text>
      <Button title="Create New Trip" onPress={() => { navigation.navigate("Create New Trip") }} />
      <Text>Logout Here!</Text>
      <Button title="Logout" onPress={async () => {
        await SecureStore.setItemAsync("token", "");
        dispatch(setToken(""));
        dispatch(clearAll());
        dispatch(clearActiveTrip());
        dispatch(resetActiveTripCompanions());
        await navigation.navigate("Home");
      }} />
    </View>
  );
}