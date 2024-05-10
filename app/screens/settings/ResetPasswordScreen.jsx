import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../constants/colors';
import { getAuth, sendPasswordResetEmail } from '@firebase/auth';
import Button from '../../components/Button';


const ResetPasswordScreen = ({ navigation }) => {
 const [email, setEmail] = useState('');


 const handleResetPassword = async () => {
   try {
     const auth = getAuth();
     await sendPasswordResetEmail(auth, email);
     Alert.alert('Password Reset', 'Please check your email for instructions to reset your password.');
     navigation.goBack();
   } catch (error) {
     console.error('Error resetting password:', error);
     Alert.alert('Error', 'Failed to reset password. Please try again.');
   }
 };


 return (
   <SafeAreaView style={styles.container}>
     <View style={styles.content}>
       <View style={styles.titleContainer}>
         <Text style={styles.title}>Forgot Password</Text>
         <Text style={styles.subtitle}>Enter your email to reset your password</Text>
       </View>


       <View style={styles.inputContainer}>
         <Text style={styles.label}>Email address</Text>
         <View style={styles.inputWrapper}>
           <TextInput
             placeholder="Enter your email address"
             placeholderTextColor={COLORS.black}
             keyboardType="email-address"
             value={email}
             onChangeText={setEmail}
             style={styles.input}
           />
         </View>
       </View>


       <Button
         title="Reset Password"
         onPress={handleResetPassword}
         filled
         style={styles.button}
       />


   
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


export default ResetPasswordScreen;