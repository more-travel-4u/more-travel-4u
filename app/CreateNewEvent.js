import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatTime, formatDate } from './../utils.js';
import { setNewEventDate } from './../store/eventSlice.js';

const CreateNewEvent = ({ navigation }) => {
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
  const activeTrip = useSelector(state => state.trip.activeTrip)
  const eventLocation = useSelector(state => state.event.eventLocation)
  useEffect(() => {
    if (eventLocation) {
      handleInput("location", eventLocation)
    }
  }, [eventLocation])

  const handleInput = (key, value) => {
    setFormData(prevState => ({
      ...prevState,
      [key]: value
    }))
  }

    // [ { id, username }, { id, username } ]

  const handleChooseFromMap = () => {
    navigation.navigate("ChooseFromMap")
  }

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
        <View style={styles.inputContainer}>
          <Text>Event Date:</Text>
          <MyDateTimePicker {...{activeTrip}}/>
        </View>
        <View style={styles.inputContainer}>
          <Text>Location:</Text>
          <TextInput 
            style={styles.input}
            placeholder="Enter Location, or choose from map"
            value={formData.location}
            onChangeText={(text) => handleInput("location", text)}
          />
          <Button title="Choose from Map" onPress={handleChooseFromMap}/>
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

const MyDateTimePicker = ({activeTrip}) => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date())
  const newEventDate = useSelector(state => state.event.newEventDate);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (date) {
      dispatch(setNewEventDate(date.toISOString()))
    }
    return (() => {
      setShow(false)
      setMode('date')
    })
  }, [])

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View>
      <Button onPress={showDatepicker} title="Choose date" />
      <Button onPress={showTimepicker} title="Choose time" />
      {date && <Text>{`Selected: ${formatTime(date)} on ${formatDate(date)}`}</Text>}
      {/* <Text>{`Selected: ${formatTime(date)} on ${formatDate(date)}`}</Text> */}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          maximumDate = {new Date(activeTrip.end_date)}
          minimumDate = {new Date(activeTrip.start_date)}
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default CreateNewEvent