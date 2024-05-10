import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const SettingsNotification = () => {
  const showNotificationSettingsAlert = () => {
    Alert.alert(
      "Notification Settings",
      "Please go to your device's settings to enable or disable notifications for this app.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <TouchableOpacity style={styles.alertButton} onPress={showNotificationSettingsAlert}>
        <Text style={styles.alertButtonText}>Open Notification Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  alertButton: {
    backgroundColor: '#E7B10A',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  alertButtonText: {
    fontSize: 16,
    color: 'black',
  },
});

export default SettingsNotification;
