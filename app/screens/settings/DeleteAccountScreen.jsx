import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../constants/colors';
import { getAuth, deleteUser, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { logout } from './authActions';

const DeleteAccountScreen = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [isPasswordShown, setIsPasswordShown] = useState(false);
 const navigation = useNavigation();

 const handleDeleteAccount = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const credential = EmailAuthProvider.credential(user.email, password);

        // Re-authenticate the user
        await reauthenticateWithCredential(user, credential);

        // Delete the user account from Firebase Authentication
        await deleteUser(user);

        // Sign the user out and navigate to the WelcomeScreen
        await logout(navigation);
               
        // Delete the user data from Firestore
        const db = getFirestore();
        const userDocRef = doc(db, 'users', user.uid);
        await deleteDoc(userDocRef);



      } else {
        Alert.alert(
          'Error', 
          'No user is currently signed in. Please sign in to delete your account.'
        );
      }

    } catch (error) {
      console.error('Error deleting account:', error);
      Alert.alert(
        'Account Deleted Successfully', 
        'You have successfully deleted your account.'
      );
    }
 };

 return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginVertical: 22 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              marginVertical: 12,
              color: COLORS.black,
              alignSelf: 'center',
            }}
          >
            Delete Account
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: COLORS.black,
              alignSelf: 'center',
            }}
          >
            Please enter your email and password to delete your account.
          </Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 600,
              marginVertical: 8,
            }}
          >
            Email address *
          </Text>

          <View
            style={{
              width: '100%',
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Enter your email address"
              placeholderTextColor={COLORS.black}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              style={{
                width: '100%',
              }}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 600,
              marginVertical: 8,
            }}
          >
            Password *
          </Text>

          <View
            style={{
              width: '100%',
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor={COLORS.black}
              secureTextEntry={!isPasswordShown}
              value={password}
              onChangeText={setPassword}
              style={{
                width: '100%',
              }}
            />

            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{
                position: 'absolute',
                right: 12,
              }}
            >
              {isPasswordShown ? (
                <Ionicons name="eye" size={24} color={COLORS.black} />
              ) : (
                <Ionicons name="eye-off" size={24} color={COLORS.black} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleDeleteAccount}
          style={{
            backgroundColor: '#E7B10A',
            alignItems: 'center',
            justifyContent: 'center',
            height: 50,
            borderRadius: 10,
            marginVertical: 10,
          }}
        >
          <Text style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 18 }}>
            Delete Account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
 );
};

export default DeleteAccountScreen;
