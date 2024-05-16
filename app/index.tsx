import React, { useEffect } from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { setUsername, setPassword, setToken, setAuthMessage, clearPassword, clearAuth } from './../store/authSlice.js';
import Constants from "expo-constants";

const { manifest } = Constants;
interface IndexProps { }

// const API_URL = Constants?.expoConfig?.hostUri ? 
//   Constants.expoConfig.hostUri.split(`:`).shift().concat(`:3000`)
//   : 
//   `https://more-travel-4u.onrender.com`;
const API_URL = "http://localhost:3000" // for alex

const Index: React.FC<IndexProps> = (props) => {

  const dispatch = useDispatch();
  const { username, password, token, authMessage } = useSelector((state: any) => state.auth);
  // const [login, setLogin] = useState<string>("");
  // const [password, setPassword] = useState<string>("");

  useEffect(() => {
    dispatch(clearAuth());
    // dispatch(setAuthMessage("Login successful! Here is your token: " + token))
  }, [token],)

  const handleLogin = async (event: any) => {
    console.log(API_URL)
    event.preventDefault();
    try {
      const response = await fetch(API_URL + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      console.log(data);
      console.log(response.ok);
      if (response.ok) {
        dispatch(setToken(data.token));
        dispatch(clearPassword()); // TODO: change line 31 upon adding more functionality.
      } else {
        dispatch(setAuthMessage(data.message || "Login failed. Please try again later."));
      }
    } catch(error) {
      console.log(error);
      dispatch(setAuthMessage("Network error. Please try again later."))
    }
  };

  return (
    <View style={styles.container}>
      <Text>More Travel 4 U</Text>
      {authMessage && <Text>{authMessage}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Enter Username"
        value={username}
        onChangeText={(text) => {dispatch(setUsername(text))}}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => {dispatch(setPassword(text))}}
      />
      <Button title="Login" onPress={handleLogin} />

      {/* TODO: add button functionality to navigate to Registration */}
      <Text>Don't have an account?</Text>
      <Button title="Register Here" disabled onPress={() => {}} />
    </View>
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