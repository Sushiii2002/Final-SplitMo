import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../constants/colors';
import { getAuth, signInWithEmailAndPassword, updatePassword } from '@firebase/auth';
import Button from '../../components/Button';
import LoginScreen from '../auth/LoginScreen';

const UpdatePasswordScreen = ({ navigation }) => {
 const [currentPassword, setCurrentPassword] = useState('');
 const [newPassword, setNewPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');
 const [isLoading, setIsLoading] = useState(false);

 const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New password and confirm password do not match.');
      return;
    }

    setIsLoading(true);
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Error', 'No user is currently signed in.');
      setIsLoading(false);
      return;
    }

    try {
      // Re-authenticate the user
      await signInWithEmailAndPassword(auth, user.email, currentPassword);

      // Update the password
      await updatePassword(user, newPassword);
      Alert.alert('Password Updated', 'Your password has been updated successfully.');
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Error updating password:', error);
      Alert.alert('Error', 'Failed to update password. Please try again.');
    }
    setIsLoading(false);
 };

 return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Update Password</Text>
          <Text style={styles.subtitle}>Enter your current and new password</Text>
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

        <View style={styles.inputContainer}>
          <Text style={styles.label}>New Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Enter your new password"
              placeholderTextColor={COLORS.black}
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
              style={styles.input}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm New Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Confirm your new password"
              placeholderTextColor={COLORS.black}
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.input}
            />
          </View>
        </View>

        <Button
          title="Update Password"
          onPress={handleUpdatePassword}
          filled
          style={styles.button}
        />

        {isLoading && <ActivityIndicator size="large" color="#0000ff" />}

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

export default UpdatePasswordScreen;
