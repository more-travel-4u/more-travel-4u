import { Text, View, Button, StyleSheet, TextInput, } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Home Page</Text>
      <WeatherInput />
      <PlannerPreview />
      <ReservationsPreview />
    </View>
  );
}


const WeatherInput = () => (
  <View style={styles.preview}>
    <Text style={styles.previewTitle}>Weather</Text>
    <TextInput style={styles.input} placeholder="Enter city" />
  </View>
);


const PlannerPreview = () => (
  <View style={styles.preview}>
    <Text style={styles.previewTitle}>Planner</Text>
    <Text>Surf Lessons @ 10 am Tomorrow!</Text>
  </View>
);


const ReservationsPreview = () => (
  <View style={styles.preview}>
    <Text style={styles.previewTitle}>Reservations</Text>
    <Text>Next Reservation: Dinner at 7 PM</Text>
  </View>
);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 35,
    marginTop: 55,
  },
  preview: {
    marginBottom: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  previewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    fontSize: 18,
  },
});
