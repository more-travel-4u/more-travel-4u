import FloatingAdd from './FloatingAdd.js';
import { useState } from 'react';
import { Button } from 'react-native';
// import { Button, Text } from 'react-native-paper';
import { Text } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView, View } from 'react-native';

export default function Planner({ navigation }) {

  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <DatePicker />
        <Text>Planner!</Text>
      </View>
      <FloatingAdd {...{navigation}}/>
    </>
  );
}

const DatePicker = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
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

  // const showTimepicker = () => {
  //   showMode('time');
  // };

  return (
    <SafeAreaView>
      <Button onPress={showDatepicker} title="Show date picker!" />
      {/* <Button onPress={showTimepicker} title="Show time picker!" /> */}
      <Text>selected: {date.toLocaleString()}</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </SafeAreaView>
  );
};