import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const messages = [
    'Lunch is at Carson Kitchen at 3 pm',
    'Mob Museum at 5pm',
    'High Roller at 9pm',
  ];
  const delay = 3000; // 3 seconds delay between notifications

  const showNotification = (index) => {
    const newNotification = {
      id: notifications.length + 1,
      message: messages[index],
    };
    setNotifications([...notifications, newNotification]);

    // Schedule the next notification if available
    if (index + 1 < messages.length) {
      setTimeout(() => {
        showNotification(index + 1);
      }, delay);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <Text>Press the button to start showing notifications</Text>
      <Button
        title="Show Notifications"
        onPress={() => showNotification(0)}
      />
      <View style={styles.notificationContainer}>
        {notifications.map((notification) => (
          <Text key={notification.id} style={styles.notification}>
            {notification.message}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  notificationContainer: {
    marginTop: 20,
  },
  notification: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default Notification;
