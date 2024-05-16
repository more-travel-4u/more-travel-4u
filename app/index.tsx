import React, { useEffect } from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { setUsername, setPassword, setToken, setAuthMessage, clearPassword, clearAuth } from './../store/authSlice.js';

interface IndexProps { }

// IMPORTANT NOTE: The api_url currently is specific to alex only. He is using localtunnel to create an API_URL web url
// so that Expo Go can communicate with his locally hosted server for testing purposes. During production, API_URL should be
// set to our Render deploy:
// const API_URL = https://more-travel-4u.onrender.com
// More info on localtunnel: https://www.npmjs.com/package/localtunnel
const API_URL = "https://spotty-crews-leave.loca.lt" // for alex

const Index: React.FC<IndexProps> = (props) => {

  const dispatch = useDispatch();
  const { username, password, token, authMessage } = useSelector((state: any) => state.auth);

  useEffect(() => {
    dispatch(clearAuth())
  }, [],)

  useEffect(() => {
    if (token)
      // TODO: change logged in, here is your token line upon addition of more functionality.
      dispatch(setAuthMessage("Login successful! Here is your token: " + token))
  }, [token],)

  const handleLogin = async (event: any) => {
    event.preventDefault();
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
        dispatch(clearPassword());
      } else {
        dispatch(setAuthMessage(data.message || "Login failed. Please try again later."));
      }
    } catch(error) {
      console.log(error);
      dispatch(setAuthMessage("Network error. Please try again later."))
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text>More Travel 4 U</Text>
        {authMessage && <Text>{authMessage}</Text>}
        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          value={username}
          onChangeText={(text) => {dispatch(setUsername(text))}}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => {dispatch(setPassword(text))}}
          autoCapitalize="none"
        />
        <Button title="Login" onPress={handleLogin} />

        {/* TODO: add button functionality to navigate to Registration */}
        <Text>Don't have an account?</Text>
        <Button title="Register Here" disabled onPress={() => {}} />
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

export default Index;