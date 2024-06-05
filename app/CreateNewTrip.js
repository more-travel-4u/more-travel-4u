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

const CreateNewTrip = () => {

  const myUsername = useSelector(state => state.user.username)
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [usernames, setUsernames] = useState([myUsername]);
  const [currentUsername, setCurrentUsername] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const token = useSelector(state => state.auth.token)
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  

  useEffect(() => {
    return (() => {
      setName("")
      setStartDate(new Date())
      setEndDate(new Date())
      setUsernames([myUsername])
      setMessage("")
    })
  }, [])

  const DisplayTripAttendees = ({username}) => {

    const isSelf = (username === myUsername);

    const handleRemove = () => {
      if (isSelf) return;
      const usernamesAfterRemoval = usernames.filter((arrayUsername) => {
        if (username !== arrayUsername) return true;
        else return false;
      })
      setUsernames([...usernamesAfterRemoval]);
    }

    return (
      <View key={username} style={styles.userContainer}>
        <Button title="Remove" onPress={handleRemove}/>
        <Text style={{fontSize: 20}}>  {username}</Text>
      </View>
    )
  }

  const handleAdd = () => {
    if (!currentUsername) return Alert.alert("Please fill out the username of your trip companion.")
    const newUsernamesArray = [...usernames, currentUsername]
    setUsernames(newUsernamesArray)
    setCurrentUsername("")
    console.log(usernames)
  }

  const handleSubmit = async () => {
    if (submitting) return;
    else setSubmitting(true);
    if (!name) {
      Alert.alert("Please provide a name for the trip!");
      setSubmitting(false);
      return;
    } else if (!startDate) {
      Alert.alert("Please set a start date for the trip!");
      setSubmitting(false);
      return;
    } else if (!endDate) {
      Alert.alert("Please set an end date for the trip!");
      setSubmitting(false);
      return;
    } else if (startDate > endDate) {
      Alert.alert("Trip end date must be after trip start date!");
      setSubmitting(false);
      return;
    }
    try {
      const body = JSON.stringify({
        name,
        start_date: startDate,
        end_date: endDate,
        usernames
      });
      const response = await fetch(API_URL + "/api/trip", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body
      })
      const json = await response.json();
      if (response.ok) {
        if (json.message) {
          setMessage(json.message) 
          setSubmitting(false);
        } else {
          try {
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
              setMessage("Trip successfully created!")
            }
          } catch (error) {
            console.error("ERROR GETTING ACTIVE TRIP AFTER CREATING NEW TRIP", error)
            setMessage("There was an error retrieving trip information after creating a new trip; please restart the app.")
          }
          setName("")
          setStartDate(new Date())
          setEndDate(new Date())
          setUsernames([myUsername])
          setSubmitting(false);
        }
      } else {
        setMessage("There was an issue creating new trip; please try again later.")
        setSubmitting(false);
      }
    } catch (error) {
      console.error("CREATING NEW TRIP ERROR", error);
      setSubmitting(false);
    }
    setSubmitting(false);
  }

  return (
    <>
      <View style={styles.scrollContainer}> 
        <ScrollView style={styles.scrollView}>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Trip Name:</Text>
            <TextInput 
              style={styles.input}
              placeholder="Enter Trip Name"
              value={name}
              onChangeText={text => setName(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Trip Start Date:</Text>
            <MyDateTimePicker {...{setStartDate, startDate}}/>
            <Divider />
            <Text style={styles.title}>Trip End Date:</Text>
            <MyEndDateTimePicker {...{setEndDate, endDate}}/>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Users Attending Trip:</Text>
            {usernames.map(username => {return <DisplayTripAttendees {...{username}}/>})}
            <TextInput 
              style={styles.input}
              placeholder="Enter Username of Trip Companion"
              value={currentUsername}
              onChangeText={text => setCurrentUsername(text)}
            />
            <Button title="Add User" onPress={handleAdd}/>
            {message && <Text style={styles.title}>{message}</Text>}
            {/* <Button title="console log" onPress={() => {
              console.log(submitting)
              console.log(usernames)
              // setSubmitting(false);
            }} /> */}
            <Button title="Create New Trip" onPress={handleSubmit} />
          </View>
        </ScrollView>
      </View>
    </>
  )
}

const MyDateTimePicker = ({setStartDate, startDate}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    return (() => {
      setShow(false)
    })
  }, [])

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate
    setShow(false);
    setStartDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View>
      {/* Note: Button cannot accept style prop*/}
      <Button style={styles.button} onPress={showDatepicker} title="Choose Trip Start Date" />
      {startDate && <Text style={styles.subtitle}>{`Selected: ${formatDate(startDate)}`}</Text>}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={startDate}
          mode={"date"}
          onChange={onChange}
        />
      )}
    </View>
  );
};

const MyEndDateTimePicker = ({setEndDate, endDate}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    return (() => {
      setShow(false)
    })
  }, [])

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate
    setShow(false);
    setEndDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View>
      {/* Note: Button cannot accept style prop*/}
      <Button style={styles.button} onPress={showDatepicker} title="Choose Trip Start Date" />
      {endDate && <Text style={styles.subtitle}>{`Selected: ${formatDate(endDate)}`}</Text>}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={endDate}
          mode={"date"}
          onChange={onChange}
        />
      )}
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
  },
  userContainer: {
    flex: 1,
    flexDirection: "row"
  }
});


export default CreateNewTrip;