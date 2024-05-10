import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../constants/colors';
import { getAuth, sendPasswordResetEmail } from '@firebase/auth';
import Button from '../../components/Button';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);

  const fetchSecurityQuestionAndAnswer = async () => {
    try {
      const db = getFirestore();
      const currentUser = getAuth().currentUser;
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const { securityQuestion, securityQuestionAnswer } = userDoc.data();
          setShowModal({ question: securityQuestion, answer: securityQuestionAnswer });
        } else {
          Alert.alert('Error', 'User data not found.');
        }
      } else {
        Alert.alert('Error', 'You are not logged in.');
      }
    } catch (error) {
      console.error('Error fetching security question:', error);
      Alert.alert('Error', 'Failed to fetch security question.');
    }
  };

  const handleResetPassword = async (answer) => {
    if (answer === showModal.answer) {
      try {
        const auth = getAuth();
        await sendPasswordResetEmail(auth, email);
        Alert.alert('Password Reset', 'Please check your email for instructions to reset your password.');
        setShowModal(false);
        navigation.goBack();
      } catch (error) {
        console.error('Error resetting password:', error);
        Alert.alert('Error', 'Failed to reset password. Please try again.');
      }
    } else {
      Alert.alert('Incorrect Answer', 'The answer you provided is incorrect.');
    }
  };

  const SecurityQuestionModal = ({ question, answer, onSubmit, onClose }) => {
    const [userAnswer, setUserAnswer] = useState('');

    const handleSubmit = () => {
      onSubmit(userAnswer);
    };

    return (
      <Modal visible={true} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Security Question</Text>
            <Text style={styles.modalQuestion}>{question}</Text>
            <TextInput
              style={styles.modalInput}
              value={userAnswer}
              onChangeText={setUserAnswer}
              placeholder="Enter your answer"
            />
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={onClose} style={styles.modalButton} />
              <Button title="Submit" onPress={handleSubmit} style={styles.modalButton} />
            </View>
          </View>
        </View>
      </Modal>
    );
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
          onPress={fetchSecurityQuestionAndAnswer}
          filled
          style={styles.button}
        />

        <View style={styles.backToLoginContainer}>
          <Text style={styles.backToLoginText}>Back to</Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.backToLoginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>

      {showModal && (
        <SecurityQuestionModal
          question={showModal.question}
          answer={showModal.answer}
          onSubmit={handleResetPassword}
          onClose={() => setShowModal(false)}
        />
      )}
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalQuestion: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalInput: {
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderColor: 'white',

  },
});

export default ForgotPasswordScreen;