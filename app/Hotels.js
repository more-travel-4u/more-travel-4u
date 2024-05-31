import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { hotelDetails, setHotel } from "../store/hotelSlice";

const HOTEL_API_URL = 'https://booking-com.p.rapidapi.com/v1/metadata/exchange-rates?locale=en-gb&currency=AED';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': 'ad2ae320b2msh6d722cc3f2a217bp1b7d74jsn447f1a99e0d8',
    'x-rapidapi-host': 'booking-com.p.rapidapi.com'
  }
};

const ReservationPage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const searchHotel = async () => {
    if (!searchQuery) {
      setErrorMessage("All fields are required");
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    try {
      const url = HOTEL_API_URL;
      const response = await fetch(url, options);
      const data = await response.json();
      if (data.status === 'Failure' || data.status === 'UnknownReference') {
        setErrorMessage("Failed to fetch hotel data");
      } else {
        setSearchQuery(data);
      }
    } catch (error) {
      setErrorMessage("An error has occurred procuring hotelier data");
      console.error("ERROR", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Hotel Area"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Button title="Search Hotel" onPress={searchHotel} />
      {isLoading ? (
        <ActivityIndicator style={styles.loader} />
      ) : (
        hotelDetails && (
          <View style={styles.resultContainer}>
            {/* Display the phone details or other data here */}
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '100%',
  },
  loader: {
    margin: 20,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default ReservationPage;

