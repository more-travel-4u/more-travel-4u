import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setUsername, setPassword, setEmail, clearAuth } from '../store/authSlice';
import * as SecureStore from 'expo-secure-store'

const Register = ({ navigate }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRegister = async () => {
    const { username, email, password } = formData;

    // Basic validation
    if (!username || !email || !password) {
      Alert.alert('Validation Failed', 'All fields are required.');
      return;
    }

    try {
      // Dispatch actions to update Redux state
      dispatch(setUsername(username));
      dispatch(setPassword(password));
      dispatch(setEmail(email));

      // For demonstration purposes, let's clear the form fields after registration
      dispatch(clearAuth());

      Alert.alert('Registration Successful', 'You have been registered successfully.');
      
    } catch (error) {
      Alert.alert('Registration Failed', 'An error occurred during registration. Please try again.');
      console.error('Registration Error:', error);
    }
  };

  return (
    <View style={styles.container}>
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
