import { Button, Text, View } from 'react-native';


// event prevent default not working here, goes to details page then automatically refreshes
export default function Details() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details</Text>
    </View>
  );
}