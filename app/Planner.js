import FloatingAdd from './FloatingAdd.js';
import FloatingDateChange from './FloatingDateChange.js';
import { useState, useEffect } from 'react';
import { Button } from 'react-native';
// import { Button, Text } from 'react-native-paper';
import { Text } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedPlannerDate } from './../store/eventSlice.js';

export default function Planner({ navigation }) {

  const activeTrip = useSelector(state => state.trip.activeTrip);
  const dispatch = useDispatch();

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(setSelectedPlannerDate(activeTrip.start_date))
  }, [],);

  const showDatepicker = () => {
    showMode('date');
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <>
      <FloatingDateChange {...{navigation, showDatepicker, showMode, mode, setMode, show, setShow}} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <DatePicker {...{activeTrip, showDatepicker, showMode, mode, setMode, show, setShow}}/>
      </View>
      <FloatingAdd {...{navigation}}/>
    </>
  );
}

const DatePicker = ({activeTrip, showDatepicker, showMode, mode, setMode, show, setShow}) => {

  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date(activeTrip.start_date));

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    dispatch(setSelectedPlannerDate(selectedDate.toISOString()))
    setShow(false);
    setDate(currentDate);
  };

  // const showTimepicker = () => {
  //   showMode('time');
  // };

  return (
    <SafeAreaView>
      {/* <Button onPress={showDatepicker} title="Show date picker!" /> */}
      {/* <Button onPress={showTimepicker} title="Show time picker!" /> */}
      {/* <Text>Selected: {date.toLocaleString()}</Text> */}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          maximumDate = {new Date(activeTrip.end_date)}
          minimumDate = {new Date(activeTrip.start_date)}
          onChange={onChange}
        />
      )}
    </SafeAreaView>
  );
};