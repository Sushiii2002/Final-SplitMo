import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import COLORS from '../../constants/colors';
import { getAuth, sendPasswordResetEmail } from '@firebase/auth';
import Button from '../../components/Button';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const SecurityQuestionsScreen = ({ toggleForgotEmail }) => {
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');

  const handleResetPasswordWithSecurityQuestions = async () => {
    try {
      const auth = getAuth();
      const db = getFirestore();

      // Assuming you have a collection called 'users' in Firestore
      // and each user document contains a 'securityQuestion' and 'securityAnswer' field
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        const storedSecurityQuestion = userData.securityQuestion;
        const storedSecurityAnswer = userData.securityAnswer;

        if (
          securityQuestion === storedSecurityQuestion &&
          securityAnswer === storedSecurityAnswer
        ) {
          const email = auth.currentUser.email;
          await sendPasswordResetEmail(auth, email);
          Alert.alert(
            'Password Reset',
            'Please check your email for instructions to reset your password.'
          );
        } else {
          Alert.alert('Incorrect Answer', 'The security answer is incorrect.');
        }
      } else {
        Alert.alert('User not found', 'No user data found in the database.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      Alert.alert('Error', 'Failed to reset password. Please try again.');
    }
  };

  return (
    <View style={styles.content}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Forgot Email Address</Text>
        <Text style={styles.subtitle}>
          Answer your security question to reset your password
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Security Question</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Enter your security question"
            placeholderTextColor={COLORS.black}
            value={securityQuestion}
            onChangeText={setSecurityQuestion}
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Security Answer</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Enter your security answer"
            placeholderTextColor={COLORS.black}
            value={securityAnswer}
            onChangeText={setSecurityAnswer}
            style={styles.input}
          />
        </View>
      </View>
      <Button
        title="Reset Password"
        onPress={handleResetPasswordWithSecurityQuestions}
        filled
        style={styles.button}
      />
      <View style={styles.backToLoginContainer}>
        <Text style={styles.backToLoginText}>Back to</Text>
        <TouchableOpacity onPress={toggleForgotEmail}>
          <Text style={styles.backToLoginLink}>Email Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    color: '#E7B10A',
    fontWeight: 'bold',
    marginLeft: 6,
  },
});

export default SecurityQuestionsScreen;