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

  // expected req.body { name, start_date, end_date, userIds: [{usersId}, {usersId}, {usersId}] }

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [usernames, setUsernames] = useState([]);

  useEffect(() => {
    return (() => {
      setName("")
      setStartDate(new Date())
      setEndDate(new Date())
      setUsernames([])
    })
  }, [])

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
          {/* <View style={styles.inputContainer}>
            <Text style={styles.title}>Users Attending Trip:</Text>
            <TextInput 
              style={styles.input}
              placeholder="Enter Username of Companion"
              value={formData.description}
              onChangeText={(text) => handleInput("description", text)}
              multiline={true}
              numberOfLines={5}
            />
          </View> */}
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
  }
});


export default CreateNewTrip;