import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const CreateNewEvent = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    start_time: "",
    end_time: "",
    location: "",
    userIds: []
  })
  const userCompanionsArray = useSelector(state => state.trip.activeTripCompanions);

  const handleInput = (key, value) => {
    setFormData(prevState => ({
      ...prevState,
      [key]: value
    }))
  }

  // [ { id, username }, { id, username } ]

  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.title}>Add New Event</Text>
        <View style={styles.inputContainer}>
          <Text>Event Name:</Text>
          <TextInput 
            style={styles.input}
            placeholder="Enter Event Name"
            value={formData.name}
            onChangeText={(text) => handleInput("name", text)}
          />
        </View>
      </View>
    </>
  )
}

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

export default CreateNewEvent