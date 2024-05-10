import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Linking } from 'react-native';

const NotificationModal = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenSettings = async () => {
    const isConfirmed = await confirmRedirect();
    if (isConfirmed) {
      Linking.openSettings();
    }
  };

  const confirmRedirect = () => {
    return new Promise((resolve) => {
      Alert.alert(
        'Open Settings',
        'Do you want to open your device settings?',
        [
          { text: 'Cancel', onPress: () => resolve(false), style: 'cancel' },
          { text: 'OK', onPress: () => resolve(true) },
        ],
        { cancelable: false }
      );
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text>Enable/Disable Notifications</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Notification Settings</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleOpenSettings}
            >
              <Text style={styles.modalButtonText}>Open Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default NotificationModal;