import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setReservation, updateReservation, checkIn, checkOut, itineraryNumber, confirmationNumber, hotelAddress, hotelName, agreedRate } from "../store/reservationSlice";

const ReservationPage = () => {
  const dispatch = useDispatch();
  const reservation = useSelector((state) => state.reservation);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(reservation);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    dispatch(updateReservation(formData));
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reservation Page</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Check-In Date:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={checkIn}
            onChangeText={(value) => handleInputChange('checkIn', value)}
          />
        ) : (
          <Text>{checkIn}</Text>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Check-Out Date:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={checkOut}
            onChangeText={(value) => handleInputChange('checkOut', value)}
          />
        ) : (
          <Text>{checkOut}</Text>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Itinerary Number:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={itineraryNumber}
            onChangeText={(value) => handleInputChange('itineraryNumber', value)}
          />
        ) : (
          <Text>{itineraryNumber}</Text>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Confirmation Number:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={confirmationNumber}
            onChangeText={(value) => handleInputChange('confirmationNumber', value)}
          />
        ) : (
          <Text>{confirmationNumber}</Text>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Hotel Address:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={hotelAddress}
            onChangeText={(value) => handleInputChange('hotelAddress', value)}
          />
        ) : (
          <Text>{hotelAddress}</Text>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Hotel Name:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={hotelName}
            onChangeText={(value) => handleInputChange('hotelName', value)}
          />
        ) : (
          <Text>{hotelName}</Text>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Agreed Rate:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={agreedRate}
            onChangeText={(value) => handleInputChange('agreedRate', value)}
          />
        ) : (
          <Text>{agreedRate}</Text>
        )}
      </View>

      <View style={styles.buttonGroup}>
        {isEditing ? (
          <>
            <Button title="Save" onPress={handleSave} />
            <Button title="Cancel" onPress={() => setIsEditing(false)} />
          </>
        ) : (
          <Button title="Edit Reservation" onPress={() => setIsEditing(true)} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    marginTop: 55,
  },
  inputGroup: {
    marginBottom: 15,
    marginTop: 55,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    fontSize: 18,
  },
  buttonGroup: {
    marginTop: 20,
  },
});

export default ReservationPage;
