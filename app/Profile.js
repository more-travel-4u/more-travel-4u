import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch, } from 'react-redux';
// created userSlice.js, and imported these reducers i made
import { setUser, setEmail, setPassword, setUsername, setUserMessage, clearAll, setNewPassword } from './../store/userSlice.js';
// import { useIsFocused } from '@react-navigation/native';
import { API_URL } from './Login.js';

const ProfilePage = () => {

  const dispatch = useDispatch();
  // getting the state variables username, password, email, and userMessage (for use of settings messages) from Redux state store
  const { username, password, email, userMessage, newPassword } = useSelector((state) => state.user);
  const token = useSelector(state => state.auth.token);
  // const isFocused = useIsFocused();
  const [isEditing, setIsEditing] = useState(false);



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
        console.log(json.user)
        dispatch(setUser(json.user))
      } catch (error) {
        console.error("ERROR HERE:", error);
      }
    }
    getUser();
    return (() => setIsEditing(false))
  }, [],);

  const handleInputChange = (name, value) => {
    // upon input change when editing, update Redux states
    if (name === "username")
      dispatch(setUsername(value))
    else if (name === "password")
      dispatch(setPassword(value))
    else if (name === "email")
      dispatch(setEmail(value))
    else if (name === "newPassword")
      dispatch(setNewPassword(value))
  };

  const handleSave = async (event) => {
    // upon hitting save, update username/password/email in database
    // IMPORTANT NOTE: CURRENTLY THIS ONLY WORKS IF USERNAME, PASSWORD, AND EMAIL ARE ALL FILLED IN
    event.preventDefault();
    if (!username || !email || !password) {
      dispatch(setUserMessage("Please fill out all fields when editing your information."));
      return;
    }
    console.log(username, password, newPassword, email)
    try {
      const response = await fetch(API_URL + "/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          username,
          newPassword,
          email,
          password
        })
      })
      const data = await response.json();
      console.log(data)
      if (response.ok) { // to be refactored when more functionality is added
        dispatch(setUserMessage(`You have successfully updated your username, password, and/or email!`))
        dispatch(setUser(data.user));
        setIsEditing(false);
      } else (dispatch(setUserMessage(data.message || "Error occurred during attempt to edit information.")))
    } catch {
      console.error("ERROR OCCURRED DURING PUT REQUEST TO UPDATE USER:", error)
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.header}>Profile Page</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(value) => handleInputChange('email', value)}
            autoCapitalize="none"
          />
        ) : (
          <Text>{email}</Text>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Username:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={(value) => handleInputChange('username', value)}
            autoCapitalize="none"
          />
        ) : (
          <Text>{username}</Text>
        )}
      </View>

      {isEditing && (
        <>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>New Password:</Text>
            <TextInput
              style={styles.input}
              value={newPassword}
              onChangeText={(value) => handleInputChange('newPassword', value)}
              autoCapitalize="none"
              placeholder="Enter New Password Here"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Old Password:</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={(value) => handleInputChange('password', value)}
              autoCapitalize="none"
              placeholder="Confirm Old Password"
            />
          </View>
        </>
      )}

      <Text>{userMessage}</Text>

      <View style={styles.buttonGroup}>
        {isEditing ? (
          <>
            <Button title="Save" onPress={handleSave} />
            <Button title="Cancel" onPress={() => setIsEditing(false)} />
          </>
        ) : (
          <>
            <Button title="Edit Profile" onPress={() => setIsEditing(true)} />
          </>
        )}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#C3ADB3',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    marginTop: 55,
    backgroundColor: '#C3ADB3'
  },
  inputGroup: {
    marginBottom: 15,
    marginTop: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    fontSize: 18,
  },
  buttonGroup: {
    marginTop: 75,
  },
});

export default ProfilePage;
