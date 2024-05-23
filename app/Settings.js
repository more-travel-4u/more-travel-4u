import { Text, View, Button } from 'react-native';
import { setToken } from './../store/authSlice.js';
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux';

export default function SettingsScreen() {

  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
      <Text>Logout Here!</Text>
      <Button title="Logout" onPress={async () => {
        await SecureStore.setItemAsync("token", "");
        dispatch(setToken(""));
      }}/>
    </View>
  );
}