import { Text, View, Button, StyleSheet, TextInput, } from 'react-native';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTrip, setActiveTripCompanions } from './../store/tripSlice.js';
import { API_URL } from './Login.js';
import { setSeeModal } from "./../store/eventSlice.js";

export default function HomeScreen() {

  const dispatch = useDispatch();
  const activeTrip = useSelector(state => state.trip.activeTrip);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    dispatch(setSeeModal(false));
    // to grab active trip upon logging in
    (async function getActiveTrip() {
      if (!activeTrip) {
        try {
          const response = await fetch(API_URL + "/api/trip", {
            method: "GET",
            headers: {
              'Accept': 'application/json',
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          })
          const json = await response.json();
          if (response.ok) {
            dispatch(setActiveTrip(json.trip));
            dispatch(setActiveTripCompanions());
          }
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, [token],);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#85A295', }}>
      {/* {activeTrip && <Text style={styles.header}>{JSON.stringify(activeTrip)}</Text>} */}
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
    padding: 33,
    borderWidth: 1,
    borderColor: '#865666',
    borderRadius: 10,
    backgroundColor: '#C3ADB3',
  },
  previewTitle: {
    color: '#865666',
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
    color: '#e5c3c3',
  },
});
