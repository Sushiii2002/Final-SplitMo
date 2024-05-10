import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../constants/colors';
import { getAuth, signInWithEmailAndPassword, updateEmail, sendEmailVerification } from '@firebase/auth';
import Button from '../../components/Button';

const ChangeEmailScreen = ({ navigation }) => {
 const [newEmail, setNewEmail] = useState('');
 const [currentPassword, setCurrentPassword] = useState('');
 const [oldEmail, setOldEmail] = useState('');

 const handleEmailChange = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        Alert.alert('Error', 'No user is currently signed in.');
        return;
      }

      // Re-authenticate the user with their current email and password
      await signInWithEmailAndPassword(auth, oldEmail, currentPassword);

      // Send a verification email to the new email address
      await sendEmailVerification(user);

      Alert.alert('Verification Email Sent', 'Please check your email to verify the new email address.');
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Error changing email:', error);
      Alert.alert('Error', 'Failed to change email. Please try again.');
    }
 };

 return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Change Email</Text>
          <Text style={styles.subtitle}>Enter your old email, new email, and current password</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Old Email</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Enter your current email address"
              placeholderTextColor={COLORS.black}
              keyboardType="email-address"
              value={oldEmail}
              onChangeText={setOldEmail}
              style={styles.input}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>New Email</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Enter your new email address"
              placeholderTextColor={COLORS.black}
              keyboardType="email-address"
              value={newEmail}
              onChangeText={setNewEmail}
              style={styles.input}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Current Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Enter your current password"
              placeholderTextColor={COLORS.black}
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
              style={styles.input}
            />
          </View>
        </View>

        <Button
          title="Change Email"
          onPress={handleEmailChange}
          filled
          style={styles.button}
        />

        <View style={styles.backToLoginContainer}>
          <Text style={styles.backToLoginText}>Back to</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
            <Text style={styles.backToLoginLink}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
 );
};




const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: COLORS.white,
 },
 content: {
    flex: 1,
    marginHorizontal: 22,
 },
 titleContainer: {
    marginVertical: 22,
 },
 title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 12,
    color: COLORS.black,
 },
 subtitle: {
    fontSize: 16,
    color: COLORS.black,
 },
 inputContainer: {
    marginBottom: 12,
 },
 label: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 8,
 },
 inputWrapper: {
    width: '100%',
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 22,
 },
 input: {
    width: '100%',
 },
 button: {
    marginTop: 18,
    marginBottom: 4,
    fontWeight: 'bold',
 },
 backToLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 22,
 },
 backToLoginText: {
    fontSize: 16,
    color: COLORS.black,
 },
 backToLoginLink: {
    fontSize: 16,
    color: "#E7B10A",
    fontWeight: 'bold',
    marginLeft: 6,
 },
});

export default ChangeEmailScreen;
