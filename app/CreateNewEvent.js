import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import CheckBox from 'expo-checkbox';
import { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatTime, formatDate, prepareQuery } from './../utils.js';
import { setNewEventDate, setCheckedAddress, setNewEventDateEnd, setSelectedUsers } from './../store/eventSlice.js';

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
  const selectedUsers = useSelector(state => state.event.selectedUsers)
  const dispatch = useDispatch();
  useEffect(() => {
    if (!selectedUsers.length)
    dispatch(setSelectedUsers(userCompanionsArray))
  }, [userCompanionsArray],)
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

  const handleConfirmAddress = async () => {
    if (!formData.location) return Alert.alert("Please fill out an address first.")
    try {
      const stringQuery = prepareQuery(formData.location);
      console.log(stringQuery)
      console.log(process.env.EXPO_PUBLIC_GOOGLE_API_KEY)
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${stringQuery}&key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`)
      const json = await response.json();
      console.log(json.status)
      console.log(json.results[0].formatted_address)
      console.log(json.results[0].geometry.location)
    } catch (error) {
      console.error("Handle Confirm Address Error", error)
    }
    Alert.alert("Hey! COnfirm Address Here")
  }

  const handleAddEvent = () => {
    console.log(userCompanionsArray)
    Alert.alert("Hey! Added Event!")
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
          <Text>Event Start Time:</Text>
          <MyDateTimePicker {...{activeTrip}}/>
          <Text>Event End Time:</Text>
          <MyEndDateTimePicker {...{activeTrip}}/>
        </View>
        <View style={styles.inputContainer}>
          <Text>Location:</Text>
          <TextInput 
            style={styles.input}
            placeholder="Enter Location, or choose from map"
            value={formData.location}
            onChangeText={(text) => handleInput("location", text)}
          />
          <Button title="Confirm Address" onPress={handleConfirmAddress}/>
          <Button title="Choose from Map" onPress={handleChooseFromMap}/>
        </View>
        <View style={styles.inputContainer}>
          <Text>Description:</Text>
          <TextInput 
            style={styles.input}
            placeholder="Enter Description (optional)"
            value={formData.description}
            onChangeText={(text) => handleInput("description", text)}
            multiline={true}
            numberOfLines={5}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Event Participants</Text>
          <View style={styles.checkboxContainer}>
            {userCompanionsArray.map(userCompanion => <UserCompanionCheckBox {...{userCompanion}}/>)}
          </View>
          {/* [{"id": 1, "username": "aaa"}, {"id": 13, "username": "Aniyah.Champlin41"}, {"id": 58, "username": "Hallie5"}] */}
        </View>
        <Button title="Add Event" onPress={handleAddEvent}/>
      </View>
    </>
  )
}

const UserCompanionCheckBox = ({userCompanion}) => {

  const dispatch = useDispatch();
  const [isSelected, setIsSelected] = useState(true)
  const selectedUsers = useSelector(state => state.event.selectedUsers)

  const handleUserChange = (value) => {
    setIsSelected(value);
    if (value) {
      const userArrayIndex = selectedUsers.findIndex(selectedUser => {
        if (userCompanion.id === selectedUser.id) return true;
        else return false;
      })
      if (userArrayIndex === -1) {
        dispatch(setSelectedUsers([userCompanion, ...selectedUsers]))
      }
    } else {
      const userArrayIndex = selectedUsers.findIndex(selectedUser => {
        if (userCompanion.id === selectedUser.id) return true;
        else return false;
      })
      if (userArrayIndex !== -1) {
        const newArray = selectedUsers.filter((selectedUser, index) => {
          if (userArrayIndex !== index) return true;
          else return false;
        })
        dispatch(setSelectedUsers(newArray))
      }
    }
  }

  return (
    <Fragment key={userCompanion.id}>
      <CheckBox 
        style={styles.checkbox}
        value={isSelected}
        onValueChange={handleUserChange}
      />
      <Text style={styles.label}>{userCompanion.username}</Text>
    </Fragment>
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
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  }
});

const MyDateTimePicker = ({activeTrip}) => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date(activeTrip.start_date))
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
  }, [date])

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

const MyEndDateTimePicker = ({activeTrip}) => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date(activeTrip.start_date))
  const newEventDateEnd = useSelector(state => state.event.newEventDateEnd);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (date) {
      dispatch(setNewEventDateEnd(date.toISOString()))
    }
    return (() => {
      setShow(false)
      setMode('date')
    })
  }, [date])

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