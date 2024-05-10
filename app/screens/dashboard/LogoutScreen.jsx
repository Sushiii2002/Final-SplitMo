// LogoutScreen.js
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { logout } from '../settings/authActions';

const LogoutScreen = ({ navigation }) => {
 return (
    <View style={styles.container}>
      <Button title="Logout" onPress={() => logout(navigation)} />
    </View>
 );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
 },
});

export default LogoutScreen;
