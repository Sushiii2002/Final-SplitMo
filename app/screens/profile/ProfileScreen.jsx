import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, SafeAreaView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../constants/colors';
import * as ImagePicker from 'expo-image-picker';
import { logout } from '../settings/authActions';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({
    name: '',
    phoneNumber: '',
    profilePictureURL: null,
  });
  const [isNameEditable, setIsNameEditable] = useState(false);
  const [editableName, setEditableName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (currentUser) {
          const db = getFirestore();
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDocSnapshot = await getDoc(userDocRef);
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            setUser({
              name: userData.name,
              phoneNumber: userData.phone,
              profilePictureURL: userData.profilePictureURL || null,
            });
            setEditableName(userData.name);
          } else {
            console.log('User document not found');
          }
        } else {
          console.log('No user is signed in');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleNameChange = (text) => {
    setEditableName(text);
  };

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      // TODO: Update the user's profile picture in Firebase Storage and Firestore
    }
  };

  const toggleNameEditable = () => {
    setIsNameEditable(!isNameEditable);
  };

  const getInitials = () => {
    if (user.name) {
      const names = user.name.split(' ');
      const initials = names.map((name) => name.charAt(0).toUpperCase()).join('');
      return initials;
    }
    return '';
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.topBar}>
          <Text style={styles.heading}>Profile</Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={handleImagePick}>
            {user.profilePictureURL ? (
              <Image source={{ uri: user.profilePictureURL }} style={styles.profileImage} resizeMode="cover" />
            ) : (
              <View style={styles.profileAvatar}>
                <Text style={styles.profileAvatarText}>{getInitials()}</Text>
              </View>
            )}
          </TouchableOpacity>
          {isNameEditable ? (
            <TextInput
              style={styles.nameInput}
              value={editableName}
              onChangeText={handleNameChange}
              placeholder="Name"
              placeholderTextColor="#888"
              onBlur={() => setIsNameEditable(false)} // Hide input when it loses focus
            />
          ) : (
            <Text style={styles.name}>{editableName}</Text>
          )}
          <Text style={styles.phoneNumber}>{user.phoneNumber}</Text>
          <TouchableOpacity onPress={toggleNameEditable} style={styles.editIcon}>
            <Ionicons name="create-outline" size={20} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            style={styles.navigationButton}
            onPress={() => navigation.navigate('SettingsScreen')}
          >
            <Text style={styles.navigationButtonText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navigationButton}
            onPress={() => navigation.navigate('HelpCenterScreen')}
          >
            <Text style={styles.navigationButtonText}>Help Center</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navigationButton}
            onPress={() => navigation.navigate('TermsAndConditionScreen')}
          >
            <Text style={styles.navigationButtonText}>Terms and Conditions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navigationButton}
            onPress={() => logout(navigation)}
          >
            <Text style={styles.navigationButtonText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
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
    marginBottom: 10,
    backgroundColor: "#E7B10A",
    width: 455,
    height: 100,
  },
  topBar: {
    width: '100%',
    marginTop: 40,
    marginLeft: 20,
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
  },
  contentContainer: {
    marginTop: 60,
    padding: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileAvatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#E7B10A",
    width: 125,
    height: 125,
    borderRadius: 100,
  },
  profileAvatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
  },
  phoneNumber: {
    fontSize: 16,
    color: 'black',
    marginTop: 5,
  },
  navigationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  navigationButton: {
    backgroundColor: "#E7B10A",
    borderColor: "#E7B10A",
    borderWidth: 2,
    borderRadius: 30,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 50,
  },
 navigationButtonText: {
   fontSize: 16,
   color: '#ffffff',
   textAlign: 'center',
   fontWeight: 'bold',
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
 profileContainer: {
  alignItems: 'center',
  justifyContent: 'center',
  marginVertical: 20,
  
},


nameInput: {
  fontSize: 20,
  fontWeight: 'bold',
  color: 'black',
  marginTop: 10,
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 5,
  padding: 10,
  width: '80%',
},
editIcon: {
  position: 'absolute',
  right: -30,
  top: 139,
  padding: 0,
},
});


export default ProfileScreen;
