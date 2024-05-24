import { Text, View } from 'react-native';
import FloatingAdd from './FloatingAdd.js';
import { useEffect } from 'react';

export default function Planner({ navigation }) {

  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Planner!</Text>
      </View>
      <FloatingAdd {...{navigation}}/>
    </>
  );
}
