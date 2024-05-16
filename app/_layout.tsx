import { Stack } from "expo-router";
import store from '../store/index.js';
import { Provider } from 'react-redux';

export default function RootLayout() {

  return (
    <>
      <Provider store={store}>
        <Stack>
          {/* <Stack.Screen name="Login" /> */}
          {/* <Stack.Screen name="index" /> */}
        </Stack>
      </Provider>
    </>
  );
}
