import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HelpCenterScreen from './HelpCenterScreen';
import UpdatePasswordScreen from './UpdatePasswordScreen';
import ChangeEmailScreen from './ChangeEmailScreen';
import DeleteAccountScreen from './DeleteAccountScreen';
import { logout } from './authActions';
import SecurityQuestionUpdate from './SecurityQuestionUpdate';
import SettingsNotification from './SettingsNotification';


const SettingsScreen = ({ navigation }) => {
  const [notificationModalVisible, setNotificationModalVisible] = useState(false);

  const showNotificationSettingsAlert = () => {
    Alert.alert(
      "Notification Settings",
      "Please go to your device's settings to enable or disable notifications for this app.",
      [
        { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
        { text: "OK", onPress: () => navigation.goBack(),   }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Settings</Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeaderText}>Security</Text>
        <TouchableOpacity style={styles.settingButton} onPress={() => navigation.navigate(UpdatePasswordScreen)}>
          <Ionicons name="lock-closed-outline" size={24} color={"#E7B10A"} />
          <Text style={styles.settingText}>Change Password</Text>
          <Ionicons name="chevron-forward-outline" size={24} color={"#E7B10A"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingButton} onPress={() => navigation.navigate(ChangeEmailScreen)}>
          <Ionicons name="mail-outline" size={24} color={"#E7B10A"} />
          <Text style={styles.settingText}>Update Email Address</Text>
          <Ionicons name="chevron-forward-outline" size={24} color={"#E7B10A"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingButton} onPress={() => navigation.navigate(SecurityQuestionUpdate)}>
          <Ionicons name="lock-closed-outline" size={24} color={"#E7B10A"} />
          <Text style={styles.settingText}>Set Security Questions</Text>
          <Ionicons name="chevron-forward-outline" size={24} color={"#E7B10A"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingButton} onPress={() => navigation.navigate(HelpCenterScreen)}>
          <Ionicons name="help-circle-outline" size={24} color={"#E7B10A"} />
          <Text style={styles.settingText}>Help Center</Text>
          <Ionicons name="chevron-forward-outline" size={24} color={"#E7B10A"} />
        </TouchableOpacity>
      </View>

   <View style={styles.sectionContainer}>
     <Text style={styles.sectionHeaderText}>Notifications</Text>
     <TouchableOpacity style={styles.settingButton} onPress={() => navigation.navigate(SettingsNotification)}>
       <Ionicons name="notifications-off-outline" size={24} color={"#E7B10A"} />
       <Text style={styles.settingText}>Enable/Disable Notifications</Text>
       <Ionicons name="chevron-forward-outline" size={24} color={"#E7B10A"} />
     </TouchableOpacity>
   </View>



   
   <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeaderText}>Account</Text>
        <TouchableOpacity style={styles.settingButton} onPress={() => logout(navigation)}>
          <Ionicons name="log-out-outline" size={24} color={"#E7B10A"} />
          <Text style={styles.settingText}>Logout</Text>
          <Ionicons name="chevron-forward-outline" size={24} color={"#E7B10A"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingButton} onPress={() => navigation.navigate(DeleteAccountScreen)}>
          <Ionicons name="trash-outline" size={24} color={"#E7B10A"} />
          <Text style={styles.settingText}>Deactivate/Delete Account</Text>
          <Ionicons name="chevron-forward-outline" size={24} color={"#E7B10A"} />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={notificationModalVisible}
        onRequestClose={() => setNotificationModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Notifications</Text>
            <TouchableOpacity
              style={styles.alertButton}
              onPress={showNotificationSettingsAlert}
            >
              <Text style={styles.alertButtonText}>Open Notification Settings</Text>
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
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    marginBottom: 10,
    backgroundColor: "#E7B10A",
    width: 455,
    height: 100,
    padding: 10,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 40,
  },
  sectionContainer: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  settingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingHorizontal: 5,
  },
  settingText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "black",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: 'bold',
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

export default SettingsScreen;