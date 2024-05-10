import { View, Text, Image, Pressable, ScrollView, StyleSheet, TextInput, TouchableOpacity, Checkbox, Alert } from 'react-native'
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../../constants/colors';
import { Ionicons } from "@expo/vector-icons";


import { initializeApp } from '@firebase/app';
import {
 getAuth,
 createUserWithEmailAndPassword,
 signInWithEmailAndPassword,
 onAuthStateChanged,
 signOut
} from '@firebase/auth';


import Button from '../../components/Button';
import DashboardScreen from '../dashboard/DashboardScreen';










const LoginScreen = ({ navigation }) => {
   const [isPasswordShown, setIsPasswordShown] = useState(false);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');


       const onLogin = async () => {
           try {
           const auth = getAuth();
           await signInWithEmailAndPassword(auth, email, password);
           // Navigation to the DashboardScreen
           navigation.navigate('DashboardScreen');
           } catch (error) {
           console.error('Error logging in:', error);
           // Handle the error, e.g., display an error message to the user
           Alert.alert('Login Error', 'Invalid email or password. Please try again.');
           }
       };




   return (
       <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
           <View style={{ flex: 1, marginHorizontal: 22 }}>
               <View style={{ marginVertical: 22, alignItems: 'center'}}>
                   <Text style={{
                       fontSize: 22,
                       fontWeight: 'bold',
                       marginVertical: 12,
                       color: COLORS.black
                   }}>
                       Login
                   </Text>


                   <Text style={{
                       fontSize: 16,
                       color: COLORS.black
                   }}>Connect with your account today!</Text>
               </View>


               <View style={{ marginBottom: 12 }}>
                   <Text style={{
                       fontSize: 16,
                       fontWeight: 400,
                       marginVertical: 8,
                       fontWeight: 'bold',
                   }}>Email address</Text>


                   <View style={{
                       width: "100%",
                       height: 48,
                       borderColor: COLORS.black,
                       borderWidth: 1,
                       borderRadius: 8,
                       alignItems: "center",
                       justifyContent: "center",
                       paddingLeft: 22
                   }}>
                       <TextInput
                       placeholder="Enter your email address"
                       placeholderTextColor={COLORS.black}
                       keyboardType="email-address"
                       value={email}
                       onChangeText={setEmail}
                       style={{
                           width: "100%",
                       }}
                       />
                   </View>
               </View>


               <View style={{ marginBottom: 12 }}>
                   <Text style={{
                       fontSize: 16,
                       fontWeight: 'bold',
                       marginVertical: 8
                   }}>Password</Text>


                   <View style={{
                       width: "100%",
                       height: 48,
                       borderColor: COLORS.black,
                       borderWidth: 1,
                       borderRadius: 8,
                       alignItems: "center",
                       justifyContent: "center",
                       paddingLeft: 22
                   }}>
                       <TextInput
                       placeholder="Enter your password"
                       placeholderTextColor={COLORS.black}
                       secureTextEntry={!isPasswordShown}
                       value={password}
                       onChangeText={setPassword}
                       style={{
                           width: "100%",
                       }}
                       />


                       <TouchableOpacity
                           onPress={() => setIsPasswordShown(!isPasswordShown)}
                           style={{
                               position: "absolute",
                               right: 12
                           }}
                       >
                           {
                               isPasswordShown == false ? (
                                   <Ionicons name="eye-off" size={24} color={COLORS.black} />
                               ) : (
                                   <Ionicons name="eye" size={24} color={COLORS.black} />
                               )
                           }


                       </TouchableOpacity>
                      
                   </View>
               </View>
                   <Pressable onPress={() => navigation.navigate("ForgotPasswordScreen")}>
                       <Text style={{
                           fontSize: 12,
                           color: '#59bfff',
                           fontWeight: "semibold",
                           marginLeft: 6,
                           alignSelf: 'flex-end'
                       }}>Forgot Password?
                       </Text>
                   </Pressable>




                   <Button
                   title="Login"
                   onPress={onLogin}
                   filled
                   style={{
                       marginTop: 20,
                       marginBottom: 4,
                   }}
                   />
               <View style={{
                   flexDirection: "row",
                   justifyContent: "center",
                   marginVertical: 15
               }}>
                   <Text style={{ fontSize: 16, color: COLORS.black }}>Don't have an account?</Text>
                   <Pressable
                       onPress={() => navigation.navigate("SignUpScreen")}
                   >
                       <Text style={{
                           fontSize: 16,
                           color: "#E7B10A",
                           fontWeight: "bold",
                           marginLeft: 6
                       }}>Sign Up</Text>
                   </Pressable>
               </View>
           </View>
       </SafeAreaView>
   )
}


export default LoginScreen;