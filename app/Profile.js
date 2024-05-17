import { BottomTabBar } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "Username",
    password: "ABC123",
    email: "foo@bar.com"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
    // send updated data to backend from here
    console.log('Profile info saved:', formData);
  };

  return (


    <View style={styles.container}>
      <Text style={styles.header}>Profile Page</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>UserName:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={formData.username}
            onChangeText={(value) => handleInputChange('username', value)}
          />
        ) : (
          <Text>{user.name}</Text>
        )}
      </View>


      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={formData.password}
            onChangeText={(value) => handleInputChange('password', value)}
          />
        ) : (
          <Text>{user.password}</Text>
        )}
      </View>


      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
          />
        ) : (
          <Text>{user.email}</Text>
        )}
      </View>


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
    alignContent: BottomTabBar,
  },
});

export default ProfilePage;
