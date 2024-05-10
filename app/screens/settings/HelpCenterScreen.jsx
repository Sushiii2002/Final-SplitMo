import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../constants/colors';

const HelpCenterScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Help Center</Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeaderText}>FAQs</Text>
        <TouchableOpacity style={styles.helpButton} onPress={() => navigation.navigate('FAQScreen')}>
          <Ionicons name="help-circle-outline" size={24} color={"#E7B10A"} />
          <Text style={styles.helpText}>View FAQs</Text>
          <Ionicons name="chevron-forward-outline" size={24} color={"#E7B10A"} />
        </TouchableOpacity>
      </View>



      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeaderText}>Contact Us</Text>
        <TouchableOpacity style={styles.helpButton} onPress={() => navigation.navigate('GetInTouchScreen')}>
          <Ionicons name="call-outline" size={24} color={"#E7B10A"} />
          <Text style={styles.helpText}>Get in Touch</Text>
          <Ionicons name="chevron-forward-outline" size={24} color={"#E7B10A"} />
        </TouchableOpacity>
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
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingHorizontal: 5,
  },
  helpText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "black",
  },
});

export default HelpCenterScreen;
