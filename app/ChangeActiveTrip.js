import { Text, StyleSheet, Button } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { API_URL } from './Login.js';
import { useSelector, useDispatch } from "react-redux";
import RadioButtonRN from "radio-buttons-react-native";
import { setActiveTrip, setActiveTripCompanions } from "./../store/tripSlice.js";

const ChangeActiveTrip = ({ navigation }) => {

  const [trips, setTrips] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSelecting, setIsSelecting] = useState(false);
  const token = useSelector(state => state.auth.token)
  const activeTrip = useSelector(state => state.trip.activeTrip)
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllTrips = async () => {
      try {
        const response = await fetch(API_URL + "/api/trip/all", {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        })
        const json = await response.json();
        if (response.ok) {
          setTrips(json.trips)
        } else (setErrorMsg("Unable to retrieve your trips; please try again later."))
      } catch (error) {
        console.error("GET ALL TRIPS ERROR", error)
      }
    }
    if (!trips) getAllTrips();
  }, [activeTrip],)

  useEffect(() => {
    return (() => {
        console.log("UseEffect cleanup function occurring.")
        setTrips(null)
        setErrorMsg("")
        setIsSelecting(false);
    })
  }, [],)

  const determineCurrentActiveTrip = (myActiveTrip) => {
    const activeTripIndex = trips.findIndex((trip) => {
      return (trip.trips.id === myActiveTrip.id)
    })
    return activeTripIndex + 1
  }

  const handleSelect = async (e) => {
    if (isSelecting) return;
    else setIsSelecting(true);
    try {
      const tripId = e.trip.id;
      const response = await fetch(`${API_URL}/api/trip/active/${tripId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        },
      })
      if (response.ok) {
        try {
          const response2 = await fetch(`${API_URL}/api/trip`, {
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
          } else setErrorMsg("Error getting active trip after successfully changing active trip; please restart the app.")
        } catch (error) {
          console.error("Error getting new active trip after changing active trip!", error)
        }
      } else setErrorMsg("Error switching active trip; please try again later.")
    } catch (error) {
      console.error("Error changing active trip!", error)
    }
    console.log(e)
    setIsSelecting(false);
  }

  return (
    <>
      <Text style={styles.title}>Your Trips</Text>
      {!trips && <ActivityIndicator />}
      {!activeTrip && <Text style={styles.title}>You have no trips.</Text>}
      {errorMsg && <Text style={styles.title}>{errorMsg}</Text>}
      {activeTrip && trips && 
        <RadioButtonRN 
          data = { trips.map(trip => {return { label: trip.trips.name, trip: trip.trips }}) }
          selectedBtn = { handleSelect }
          initial= { determineCurrentActiveTrip(activeTrip) }
        />
      }
      {activeTrip && <Text style={styles.title}>{`Your current active trip is: ${activeTrip.name}`}</Text>}
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24
  }
})

export default ChangeActiveTrip