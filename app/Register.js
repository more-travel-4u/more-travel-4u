import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setUsername, setPassword, setEmail, clearAuth, setToken, setAuthMessage } from './../store/authSlice.js';
import * as SecureStore from 'expo-secure-store'
import { API_URL } from './Login.js';

const Register = ({ navigation }) => {

  const dispatch = useDispatch();
  const authMessage = useSelector(state => state.auth.authMessage)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    return (() => {
      dispatch(setAuthMessage(""))
      setFormData({
        username: '',
        email: '',
        password: ''
      })
  })
  }, [],)

  const handleChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const { username, email, password } = formData;

    // Basic validation
    if (!username || !email || !password) {
      Alert.alert('Validation Failed', 'All fields are required.');
      return;
    }

    try {
      const response = await fetch(API_URL + "/auth/register", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(setToken(data.token));
        await SecureStore.setItemAsync("token", data.token);
        setFormData({
          username: '',
          email: '',
          password: ''
        })
      } else {
        dispatch(setAuthMessage(data.message || "Registration failed. Please try again later."))
      }
    } catch (error) {
      dispatch(setAuthMessage("Network error. Please try again later."))
      console.error('Registration Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      {authMessage && <Text>{authMessage}</Text>}
      <Text style={styles.title}>Register</Text>
      <View style={styles.inputContainer}>
        <Text>Username:</Text>
        <TextInput
          style={styles.input}
          value={formData.username}
          onChangeText={(text) => handleChange('username', text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Email:</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(text) => handleChange('email', text)}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Password:</Text>
        <TextInput
          style={styles.input}
          value={formData.password}
          onChangeText={(text) => handleChange('password', text)}
          secureTextEntry={true}
        />
      </View>
      <Button title="Register" onPress={handleRegister} />
      <Text>Already have an account?</Text>
      <Button title="Login Here" onPress={() => navigation.navigate("Login")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center'
  },
  inputContainer: {
    marginBottom: 12
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4
  }
});

export default Register;
