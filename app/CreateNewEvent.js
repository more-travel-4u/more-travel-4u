import { View, Text, TextInput, StyleSheet, Button, Alert, ScrollView, StatusBar, Pressable } from 'react-native';
import { Divider } from 'react-native-paper';
import CheckBox from 'expo-checkbox';
import { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatTime, formatDate, prepareQuery } from './../utils.js';
import { setActiveTrip, setActiveTripCompanions } from './../store/tripSlice.js';
import { setNewEventDate, setCheckedAddress, setNewEventDateEnd, setSelectedUsers } from './../store/eventSlice.js';
import { API_URL } from './Login.js';

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
  const checkedAddress = useSelector(state => state.event.checkedAddress)
  const { newEventDate, newEventDateEnd } = useSelector(state => state.event)
  const token = useSelector(state => state.auth.token)
  const dispatch = useDispatch();
  const [addingEvent, setAddingEvent] = useState(false)
  useEffect(() => {
    return (() => {
      dispatch(setSelectedUsers([]))
      dispatch(setCheckedAddress(false))
    })
  }, [])
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

  const handleChooseFromMap = () => {
    navigation.navigate("ChooseFromMap")
  }

  const handleConfirmAddress = async () => {
    if (!formData.location) return Alert.alert("Please fill out an address first.")
    try {
      const stringQuery = prepareQuery(formData.location);
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${stringQuery}&key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`)
      const json = await response.json();
      if (json.status === "OK") {
        handleInput("location", json.results[0].formatted_address)
        dispatch(setCheckedAddress(true));
      } else return Alert.alert("Error confirming address! Please add and/or edit address information to be more specific and/or clear.")
    } catch (error) {
      console.error("Handle Confirm Address Error", error)
    }
  }

  const handleAddEvent = async () => {
    if (addingEvent) return;
    else setAddingEvent(true);
    const userIds = selectedUsers.map((selectedUser) => {
      return ({ id: selectedUser.id })
    })
    const eventObj = {
      name: formData.name,
      description: formData.description,
      start_time: newEventDate,
      end_time: newEventDateEnd,
      date: newEventDate,
      location: formData.location,
      userIds
    }
    if (!eventObj.name) return Alert.alert("Please enter in the event name.");
    else if (!eventObj.start_time) return Alert.alert("Please enter in the event start time.");
    else if (!eventObj.end_time) return Alert.alert("Please enter in the event end time.");
    else if (!eventObj.date) return Alert.alert("Please enter in the event date.");
    else if (!eventObj.location) return Alert.alert("Please enter in the location address.");
    else if (!checkedAddress) return Alert.alert("Please confirm address before adding event.");
    else if (!eventObj.userIds.length) return Alert.alert("At least one person must attend the event.")
    else if (new Date(eventObj.start_time) >= new Date(eventObj.end_time)) return Alert.alert("End time for event must be after its start time.");
    else {
      try {
        const response = await fetch(`${API_URL}/api/event`, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(eventObj)
        })
        const json = await response.json();
        if (response.ok) {
          const response2 = await fetch(API_URL + "/api/trip", {
            method: "GET",
            headers: {
              'Accept': 'application/json',
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          })
          const json2 = await response2.json();
          if (response2.ok) {
            dispatch(setActiveTrip(json2.trip));
            dispatch(setActiveTripCompanions());
            navigation.navigate('Planner');
          }
        }
        console.log(json)
      } catch (error) {
        console.log("Add New Event Error", error)
      }
    }

    console.log(eventObj)
    // Alert.alert(JSON.stringify(eventObj))
    setAddingEvent(false);
  }

  return (
    <>
      <View style={styles.scrollContainer}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Event Name:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Event Name"
              value={formData.name}
              onChangeText={(text) => handleInput("name", text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Event Start Time:</Text>
            <MyDateTimePicker {...{ activeTrip }} />
            <Divider />
            <Text style={styles.title}>Event End Time:</Text>
            <MyEndDateTimePicker {...{ activeTrip }} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Location:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Location, or choose from map"
              value={formData.location}
              onChangeText={(text) => handleInput("location", text)}
            />
            {/* Note: Button cannot accept style prop*/}
            <Button color={checkedAddress ? "green" : "blue"} title="Confirm Address" onPress={handleConfirmAddress} />
            <Button style={styles.button} title="Choose from Map" onPress={handleChooseFromMap} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Description:</Text>
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
            <Text style={styles.title}>Event Participants</Text>
            <View style={styles.checkboxContainer}>
              {userCompanionsArray.map(userCompanion => <UserCompanionCheckBox {...{ userCompanion }} />)}
            </View>
          </View>
          {/* Note: Button cannot accept style prop*/}
          <Button style={styles.button} title="Add Event" onPress={handleAddEvent} />
        </ScrollView>
      </View>
    </>
  )
}

const UserCompanionCheckBox = ({ userCompanion }) => {

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
    <View key={userCompanion.username + userCompanion.id}>
      <CheckBox
        style={styles.checkbox}
        value={isSelected}
        onValueChange={handleUserChange}
        key={userCompanion.id}
      />
      <Text key={userCompanion.username} style={styles.label}>{userCompanion.username}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center'
  },
  title: {
    fontSize: 30,
    marginBottom: 16,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 12,
    borderColor: 'darkblue',
    borderWidth: 3,
    borderStyle: "solid",
    backgroundColor: 'lightblue'
  },
  input: {
    borderWidth: 1,
    borderColor: 'darkblue',
    padding: 8,
    borderRadius: 4,
    backgroundColor: 'lightgrey',
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
  },
  scrollContainer: {
    flex: 1,
    borderColor: "darkblue",
    borderStyle: "solid",
    borderWidth: 10

  },
  scrollView: {
    backgroundColor: 'darkblue',
    margin: "5px"
  },
  textArea: {
    backgroundColor: 'lightgrey'
  },
  button: {
    paddingVertical: 10
  }
});

const MyDateTimePicker = ({ activeTrip }) => {
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
      {/* Note: Button cannot accept style prop*/}
      <Button style={styles.button} onPress={showDatepicker} title="Choose date" />
      <Button style={styles.button} onPress={showTimepicker} title="Choose time" />
      {date && <Text style={styles.subtitle}>{`Selected: ${formatTime(date)} on ${formatDate(date)}`}</Text>}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          maximumDate={new Date(activeTrip.end_date)}
          minimumDate={new Date(activeTrip.start_date)}
          onChange={onChange}
        />
      )}
    </View>
  );
};

const MyEndDateTimePicker = ({ activeTrip }) => {
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
      {/* Note: Button cannot accept style prop*/}
      <Button style={styles.button} onPress={showDatepicker} title="Choose date" />
      <Button style={styles.button} onPress={showTimepicker} title="Choose time" />
      {date && <Text style={styles.subtitle}>{`Selected: ${formatTime(date)} on ${formatDate(date)}`}</Text>}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          maximumDate={new Date(activeTrip.end_date)}
          minimumDate={new Date(activeTrip.start_date)}
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default CreateNewEvent