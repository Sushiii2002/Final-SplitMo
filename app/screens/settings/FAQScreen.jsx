import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../constants/colors';

const FAQScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>FAQs</Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>How do I make a transfer?</Text>
        <Text style={styles.answerText}>To make a transfer, select the recipient, enter the amount, and choose your payment method. Confirm the transfer to complete the transaction.</Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>What payment methods are available?</Text>
        <Text style={styles.answerText}>We support PayPal and Credit Card payments. Choose the one that suits you best for each transaction.</Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>Is my money secure?</Text>
        <Text style={styles.answerText}>Your money is secure. We use advanced encryption and security measures to protect your transactions and personal information.</Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>How can I contact support?</Text>
        <Text style={styles.answerText}>For any inquiries or support, please contact us through the 'Contact Us' option in the Help Center.</Text>
      </View>
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
  questionContainer: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  answerText: {
    fontSize: 16,
    color: "black",
  },
});

export default FAQScreen;
