import { useEffect, useState } from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { setUsername, setPassword, setToken, setAuthMessage, clearPassword, clearAuth } from '../store/authSlice.js';
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import * as SecureStore from 'expo-secure-store';

// IMPORTANT NOTE: The api_url currently is specific to alex only. He is using localtunnel to create an API_URL web url
// so that Expo Go can communicate with his locally hosted server for testing purposes. During production, API_URL should be
// set to our Render deploy:
// More info on localtunnel: https://www.npmjs.com/package/localtunnel
export const API_URL = "https://more-travel-4u.onrender.com"
//export const API_URL = "https://rare-hats-stop.loca.lt" // for alex

const Login = ({ navigation }) => {

  const dispatch = useDispatch();
  const { username, password, token, authMessage } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(clearAuth())
    return (() => {
      dispatch(setAuthMessage(""))
    })
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(API_URL + "/auth/login", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json()
      if (response.ok) {
        dispatch(setToken(data.token));
        await SecureStore.setItemAsync("token", data.token);
        dispatch(clearPassword());
      } else {
        dispatch(setAuthMessage(data.message || "Login failed. Please try again later."));
      }
    } catch (error) {
      console.log(error);
      dispatch(setAuthMessage("Network error. Please try again later."))
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text>More Travel 4 U</Text>
        {authMessage && <Text>{authMessage}</Text>}
        {isLoading && <ActivityIndicator animating={true} color={MD2Colors.red800} />}
        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          value={username}
          onChangeText={(text) => { dispatch(setUsername(text)) }}
          autoCapitalize="none"
        />


        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => { dispatch(setPassword(text)) }}
          autoCapitalize="none"
        />


        <Button title="Login" onPress={handleLogin} />

        <Text>Don't have an account?</Text>
        <Button title="Register Here" onPress={() => navigation.navigate("Register")} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});

export default Login