import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white', // Set background color to white
    padding: 10,
    borderRadius: 15,
    shadowOffset:{width:10, height:10},
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,   
    
  },
  buttonText: {
    color: '#E7B10A', // Set text color to yellow
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
  },
});

export default CustomButton;
