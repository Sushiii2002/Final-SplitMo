import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import COLORS from '../../constants/colors';
import * as ImagePicker from 'expo-image-picker';
import { getAuth, updateProfile } from 'firebase/auth';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const securityQuestions = [
  { label: 'What is your mothers maiden name?', value: 'motherMaidenName' },
  { label: 'What was the name of your first pet?', value: 'firstPetName' },
  { label: 'What is the name of the city where you were born?', value: 'birthCity' },
];

const GetProfileScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [uploadingProfilePicture, setUploadingProfilePicture] = useState(false);
  const [selectedSecurityQuestion, setSelectedSecurityQuestion] = useState('');
  const [securityQuestionAnswer, setSecurityQuestionAnswer] = useState('');
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfilePicture(result.uri);
    }
  };

  const saveProfile = async () => {
    const auth = getAuth();
    const db = getFirestore();
    const currentUser = auth.currentUser;

    if (currentUser) {
      try {
        // Update the user's profile information in Firebase Auth
        await updateProfile(currentUser, {
          displayName: fullName,
          phoneNumber: mobileNumber,
        });

        // Upload the profile picture to Firebase Storage
        if (profilePicture) {
          setUploadingProfilePicture(true);
          const storage = getStorage();
          const storageRef = ref(storage, `profile-pictures/${currentUser.uid}`);
          const uploadTask = uploadBytesResumable(storageRef, profilePicture);

  
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              // Handle upload progress if needed
            },
            (error) => {
              console.error('Error uploading profile picture:', error);
              Alert.alert('Error', 'An error occurred while uploading your profile picture.');
              setUploadingProfilePicture(false);
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

              // Update the user's profile information in Firestore
              await updateDoc(doc(db, 'users', currentUser.uid), {
                name: fullName,
                phone: mobileNumber,
                profilePictureURL: downloadURL,
                securityQuestion: selectedSecurityQuestion,
                securityQuestionAnswer: securityQuestionAnswer,
              });

              Alert.alert('Profile Updated', 'Your profile has been updated successfully.');
              setUploadingProfilePicture(false);

              // Navigate to the DashboardScreen
              navigation.navigate('DashboardScreen');
            }
          );
        } else {
          // Update the user's profile information in Firestore without a profile picture
          await updateDoc(doc(db, 'users', currentUser.uid), {
            name: fullName,
            phone: mobileNumber,
            securityQuestion: selectedSecurityQuestion,
            securityQuestionAnswer: securityQuestionAnswer,
          });

          Alert.alert('Profile Updated', 'Your profile has been updated successfully.');

          // Navigate to the DashboardScreen
          navigation.navigate('DashboardScreen');
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        Alert.alert('Error', 'An error occurred while updating your profile.');
      }
    } else {
      Alert.alert('Error', 'You are not logged in.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Get Profile</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Enter your full name"
        />

        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          value={mobileNumber}
          onChangeText={setMobileNumber}
          placeholder="Enter your mobile number"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Profile Picture</Text>
        <TouchableOpacity style={styles.pictureContainer} onPress={pickImage}>
          {profilePicture ? (
            <Image source={{ uri: profilePicture }} style={styles.picture} />
          ) : (
            <Text style={styles.picturePlaceholder}>Tap to select a picture</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.label}>Security Question</Text>
        <Picker
          selectedValue={selectedSecurityQuestion}
          onValueChange={(itemValue) => setSelectedSecurityQuestion(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select a security question" value="" />
          {securityQuestions.map((question) => (
            <Picker.Item key={question.value} label={question.label} value={question.value} />
          ))}
        </Picker>

        <Text style={styles.label}>Security Question Answer</Text>
        <TextInput
          style={styles.input}
          value={securityQuestionAnswer}
          onChangeText={setSecurityQuestionAnswer}
          placeholder="Enter your security question answer"
        />



        <TouchableOpacity
          style={styles.saveButton}
          onPress={saveProfile}
          disabled={uploadingProfilePicture}
        >
          <Text style={styles.saveButtonText}>
            {uploadingProfilePicture ? 'Uploading...' : 'Save Profile'}
          </Text>
        </TouchableOpacity>


          

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
  pictureContainer: {
    height: 200,
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 4,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picture: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  picturePlaceholder: {
    fontSize: 16,
    color: COLORS.grey,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 4,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GetProfileScreen;