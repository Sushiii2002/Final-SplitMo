import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../constants/colors';

const GetInTouchScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Get in Touch</Text>
      </View>

      <View style={styles.contactContainer}>
        <Text style={styles.contactText}>Email Us</Text>
        <Text style={styles.contactInfo}>support@yourapp.com</Text>
      </View>

      <View style={styles.contactContainer}>
        <Text style={styles.contactText}>Call Us</Text>
        <Text style={styles.contactInfo}>+63 901232452</Text>
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
  contactContainer: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  contactText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contactInfo: {
    fontSize: 16,
    color: "black",
  },
});

export default GetInTouchScreen;
