import React, { useState, useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { onAuthStateChanged } from '@firebase/auth';
import { auth } from './firebase';



import WelcomeScreen from './app/screens/auth/WelcomeScreen';
import LoginScreen from './app/screens/auth/LoginScreen';
import SignUpScreen from './app/screens/auth/SignUpScreen';
import DashboardScreen from './app/screens/dashboard/DashboardScreen';
import TransferFund from './app/screens/dashboard/TransferFund';
import RequestFunds from './app/screens/dashboard/RequestFunds';
import SettingsScreen from './app/screens/settings/SettingsScreen';
import ProfileScreen from './app/screens/profile/ProfileScreen';
import ForgotPasswordScreen from './app/screens/auth/ForgotPasswordScreen';
import ResetPasswordScreen from './app/screens/settings/ResetPasswordScreen';
import HelpCenterScreen from './app/screens/settings/HelpCenterScreen';
import FAQScreen from './app/screens/settings/FAQScreen';
import GetInTouchScreen from './app/screens/settings/GetInTouchScreen';
import TermsAndConditionScreen from './app/screens/profile/TermsAndConditionScreen';
import PayPalScreen from './app/screens/paypal/PayPalScreen';
import ChangeEmailScreen from './app/screens/settings/ChangeEmailScreen';
import UpdatePasswordScreen from './app/screens/settings/UpdatePasswordScreen';
import DeleteAccountScreen from './app/screens/settings/DeleteAccountScreen';
import LogoutScreen from './app/screens/dashboard/LogoutScreen';
import GetProfileScreen from './app/screens/auth/GetProfileScreen';
import SecurityQuestionUpdate from './app/screens/settings/SecurityQuestionUpdate';
import SettingsNotification from './app/screens/settings/SettingsNotification';








const Stack = createStackNavigator();


export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setIsAuthenticated(true);
            // Optionally, navigate to the DashboardScreen or another screen
          } else {
            setIsAuthenticated(false);
            // Optionally, navigate to the LoginScreen or WelcomeScreen
          }
        });
    
        // Cleanup subscription on unmount
        return () => unsubscribe();
     }, []);





return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? 'DashboardScreen' : 'WelcomeScreen'}>
            {/* Your authenticated screens */}
            <Stack.Screen name="DashboardScreen" component={DashboardScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TransferFund" component={TransferFund} options={{ headerShown: false }} />
            <Stack.Screen name="RequestFunds" component={RequestFunds} options={{ headerShown: false }} />
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="HelpCenterScreen" component={HelpCenterScreen} options={{headerShown: false}}/>
            <Stack.Screen name="FAQScreen" component={FAQScreen} options={{headerShown: false}}/> 
            <Stack.Screen name="GetInTouchScreen" component={GetInTouchScreen} options={{headerShown: false}}/>
            <Stack.Screen name="TermsAndConditionScreen" component={TermsAndConditionScreen} options={{headerShown: false}}/>
            <Stack.Screen name="LogoutScreen" component={LogoutScreen} options={{headerShown: false}}/>
            <Stack.Screen name="PayPalScreen" component={PayPalScreen} options={{headerShown: false}}/>
            <Stack.Screen name="SettingsNotification" component={SettingsNotification} options={{headerShown: false}}/>
            {/* Add other authenticated screens here */}

            {/* Your unauthenticated screens */}
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="GetProfileScreen" component={GetProfileScreen} options={{headerShown: false}}/>
            <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ChangeEmailScreen" component={ChangeEmailScreen} options={{headerShown: false}}/>  
            <Stack.Screen name="UpdatePasswordScreen" component={UpdatePasswordScreen} options={{headerShown: false}}/>
            <Stack.Screen name="DeleteAccountScreen" component={DeleteAccountScreen} options={{headerShown: false}}/>
            <Stack.Screen name="SecurityQuestionUpdate" component={SecurityQuestionUpdate} options={{headerShown: false}}/>
            {/* Add other unauthenticated screens here */}
      </Stack.Navigator>
    </NavigationContainer>
 );
}