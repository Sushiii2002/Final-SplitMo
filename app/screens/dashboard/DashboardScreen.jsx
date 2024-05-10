import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';


import COLORS from '../../constants/colors';


const DashboardScreen = ({ navigation }) => {
 const [isDropdownVisible, setIsDropdownVisible] = useState(false);


 const toggleDropdown = () => {
   setIsDropdownVisible(!isDropdownVisible);
 };


 return (
   <View style={styles.container}>
     <View style={styles.headerContainer}>
       <View style={styles.topBar}>
         <Text style={styles.heading}>Dashboard</Text>
       </View>
     </View>
     <View style={styles.contentContainer}>
       <Text style={styles.balance}>Current balance: ₱5,678.00</Text>
       <View style={styles.buttonsContainer}>
         <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TransferFund')}>
           <Icon name="account-balance-wallet" size={40} color={COLORS.primary} style={styles.buttonIcon} />
           <Text style={styles.buttonText}>Split Money</Text>
         </TouchableOpacity>


         <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RequestFunds')}>
           <Icon name="request-quote" size={40} color={COLORS.primary} style={styles.buttonIcon} />
           <Text style={styles.buttonText}>Request Funds</Text>
         </TouchableOpacity>


         <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProfileScreen')}>
           <Icon name="person" size={40} color={COLORS.primary} style={styles.buttonIcon} />
           <Text style={styles.buttonText}>Profile</Text>
         </TouchableOpacity>


         <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate('SettingsScreen')}>
           <Icon name="settings" size={40} color={COLORS.primary} style={styles.buttonIcon} />
           <Text style={styles.buttonText}>Settings</Text>
         </TouchableOpacity>
       </View>
     </View>






   </View>
 );
};


const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#FFFFFF',
   alignItems: 'center',
   justifyContent: 'flex-start',
   paddingHorizontal: 20,
 },
 headerContainer: {
   alignItems: 'center',
   backgroundColor: "#E7B10A",
   width: 460,
   height: 100,
 },
 topBar: {
   width: '100%',
   marginTop: 40,
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'space-between',
   padding: 10,
   paddingHorizontal: 20,
 },
 heading: {
   fontSize: 24,
   fontWeight: 'bold',
   color: '#FFFFFF',
   marginLeft: '5%',
 },
 contentContainer: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
 },
 balance: {
   fontSize: 25,
   fontWeight: 'bold',
   textAlign: 'center',
   color: "#E7B10A",
   marginBottom: 10,
 },
 buttonsContainer: {
   flexDirection: 'row',
   flexWrap: 'wrap',
   justifyContent: 'center',
   paddingHorizontal: 10,
 },
 button: {
   backgroundColor: COLORS.white,
   borderColor: "#E7B10A"
   ,
   borderWidth: 2,
   borderRadius: 15,
   padding: 10,
   margin: 10,
   alignItems: 'center',
   justifyContent: 'center',
   width: 150,
   height: 150,
 },
 buttonIcon: {
   fontSize: 75,
   color: "#E7B10A"
   ,
   marginBottom: 5,
 },
 buttonText: {
   fontSize: 16,
   color: "#E7B10A"
   ,
   textAlign: 'center',
 },
 dropdownContainer: {
   backgroundColor: '#FFFFFF',
   padding: 20,
   alignItems: 'center',
   justifyContent: 'center',
 },
 dropdownItem: {
   padding: 10,
 },
 dropdownItemText: {
   fontSize: 16,
   color: COLORS.primary,
 },


});


export default DashboardScreen;