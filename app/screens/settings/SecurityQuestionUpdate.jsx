import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../constants/colors';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { Picker } from '@react-native-picker/picker';

const securityQuestions = [
  { label: 'What is your mothers maiden name?', value: 'motherMaidenName' },
  { label: 'What was the name of your first pet?', value: 'firstPetName' },
  { label: 'What is the name of the city where you were born?', value: 'birthCity' },
];

const SecurityQuestionUpdate = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [oldSecurityQuestion, setOldSecurityQuestion] = useState('');
  const [selectedNewSecurityQuestion, setSelectedNewSecurityQuestion] = useState('');
  const [newSecurityQuestionAnswer, setNewSecurityQuestionAnswer] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchSecurityQuestion();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchSecurityQuestion = async () => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (currentUser) {
        const db = getFirestore();
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setOldSecurityQuestion(userData.securityQuestion);
        } else {
          console.log('User document not found');
        }
      } else {
        console.log('No user is signed in');
      }
    } catch (error) {
      console.error('Error fetching security question:', error);
    }
  };

  const verifyPassword = async () => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      setIsPasswordVerified(true);
    } catch (error) {
      console.error('Error verifying password:', error);
      Alert.alert('Error', 'Invalid email or password.');
    }
  };

  const updateSecurityQuestion = async () => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (currentUser) {
        const db = getFirestore();
        await updateDoc(doc(db, 'users', currentUser.uid), {
          securityQuestion: selectedNewSecurityQuestion,
          securityQuestionAnswer: newSecurityQuestionAnswer,
        });
        Alert.alert('Success', 'Your security question has been updated.');
        navigation.navigate('SettingsScreen');
      } else {
        Alert.alert('Error', 'You are not logged in.');
      }
    } catch (error) {
      console.error('Error updating security question:', error);
      Alert.alert('Error', 'An error occurred while updating your security question.');
    }
  };

  const handleAnswerChange = (text) => {
    setNewSecurityQuestionAnswer(text);
    setIsButtonDisabled(text.trim() === '');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Update Security Question</Text>

      <View style={styles.form}>
        {!isPasswordVerified && (
          <>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
            />

            <TouchableOpacity style={styles.verifyButton} onPress={verifyPassword}>
              <Text style={styles.verifyButtonText}>Verify Password</Text>
            </TouchableOpacity>
          </>
        )}

        {isPasswordVerified && (
          <>
            {oldSecurityQuestion && (
              <View>
                <Text style={styles.label}>Old Security Question</Text>
                <Text style={styles.securityQuestion}>{oldSecurityQuestion}</Text>
              </View>
            )}

            <Text style={styles.label}>New Security Question</Text>
            <Picker
              selectedValue={selectedNewSecurityQuestion}
              onValueChange={(itemValue) => setSelectedNewSecurityQuestion(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select a new security question" value="" />
              {securityQuestions.map((question) => (
                <Picker.Item key={question.value} label={question.label} value={question.value} />
              ))}
            </Picker>

            <Text style={styles.label}>New Security Question Answer</Text>
            <TextInput
              style={styles.input}
              value={newSecurityQuestionAnswer}
              onChangeText={handleAnswerChange}
              placeholder="Enter your new security question answer"
            />

            <TouchableOpacity
              style={[styles.saveButton, isButtonDisabled && styles.disabledButton]}
              onPress={updateSecurityQuestion}
              disabled={isButtonDisabled}
            >
              <Text style={styles.saveButtonText}>Save Security Question</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  form: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  verifyButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 4,
    marginBottom: 16,
  },
  verifyButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  securityQuestion: {
    fontSize: 16,
    marginBottom: 16,
  },
  picker: {
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 4,
  },
  disabledButton: {
    backgroundColor: COLORS.grey,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SecurityQuestionUpdate;