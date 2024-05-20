
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch, } from 'react-redux';
import { updateUser } from 'react-redux';


const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    dispatch(updateUser(formData));
    setIsEditing(false);
    console.log('Profile saved:', formData);
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
          <Text>{user.username}</Text>
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
    alignContent: ProfilePage,
  },
});

export default ProfilePage;
