import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch, } from 'react-redux';
// created userSlice.js, and imported these reducers i made
import { setUser, setEmail, setPassword, setUsername, setUserMessage, clearAll } from './../store/userSlice.js';
import { useIsFocused } from '@react-navigation/native';

const ProfilePage = () => {

  const dispatch = useDispatch();
  // getting the state variables username, password, email, and userMessage (for use of settings messages) from Redux state store
  const { username, password, email, userMessage } = useSelector((state) => state.user); 
  const isFocused = useIsFocused();
  const [isEditing, setIsEditing] = useState(false);

  // HARDCODED TOKEN FOR USER ID#1 FOR TESTING FOR NOW
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhYWEiLCJpYXQiOjE3MTU5NTUxMTF9.qr0AsAO0KQAF6OBjoIgg7dMNvFj4b9YNkZNR-M7DumU"
  const API_URL = "https://silent-parrots-tan.loca.lt" // PLACEHOLDER FOR TESTING, URL SPECIFIC TO ALEX


  useEffect(() => {
    // upon navigating to the tab, get details of the user
    const getUser = async () => {
      try {
        const response = await fetch(API_URL + "/api/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }) 
        const json = await response.json();
        dispatch(setUser(json.user))
      } catch (error) {
        console.error("ERROR HERE:", error);
      }
    }
    getUser();
    return (() => {dispatch(clearAll())})
  }, [isFocused],);

  const handleInputChange = (name, value) => {
    // upon input change when editing, update Redux states
    if (name === "username")
      dispatch(setUsername(value))
    else if (name === "password")
      dispatch(setPassword(value))
    else if (name === "email")
      dispatch(setEmail(value))
  };

  const handleSave = async (event) => {
    // upon hitting save, update username/password/email in database
    // IMPORTANT NOTE: CURRENTLY THIS ONLY WORKS IF USERNAME, PASSWORD, AND EMAIL ARE ALL FILLED IN
    event.preventDefault();
    try { 
      const response = await fetch(API_URL + "/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          username,
          newPassword: password,
          email,
          password: "password" //hard-coded for testing (remember to re run seed to get the password for user 1 back to password if it is changed!)
        })
      })
      const data = await response.json();
      const stringyData = JSON.stringify(data); // to be refactored when more functionality is added
      if (response.ok) { // to be refactored when more functionality is added
        dispatch(setUserMessage(`You have successfully updated your username, password, and/or email! ${stringyData}`))
      }
    } catch {
      console.error("ERROR OCCURRED DURING PUT REQUEST TO UPDATE USER:", error)
    } finally {
    setIsEditing(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile Page</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Username:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={(value) => handleInputChange('username', value)}
          />
        ) : (
          <Text>{username}</Text>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(value) => handleInputChange('password', value)}
          />
        ) : (
          <Text>{password}</Text>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(value) => handleInputChange('email', value)}
          />
        ) : (
          <Text>{email}</Text>
        )}
      </View>
      <Text>{userMessage}</Text>
      <View style={styles.buttonGroup}>
        {isEditing ? (
          <>
            <Button title="Save" onPress={handleSave} />
            <Button title="Cancel" onPress={() => setIsEditing(false)} />
          </>
        ) : (
          <Button title="Edit Profile" onPress={() => setIsEditing(true)} />
        )}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    marginTop: 55,
  },
  inputGroup: {
    marginBottom: 15,
    marginTop: 55,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    fontSize: 18,
  },
  buttonGroup: {
    marginTop: 175,
    // alignContent: ProfilePage, // this was breaking the Profile page.
  },
});

export default ProfilePage;
