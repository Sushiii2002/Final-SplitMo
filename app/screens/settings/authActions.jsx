// authActions.js
import { signOut } from '@firebase/auth';
import { auth } from '../../../firebase';

export const logout = async (navigation) => {
 try {
    await signOut(auth);
    // Optionally, navigate to the LoginScreen or WelcomeScreen after logout
    navigation.navigate('WelcomeScreen');
 } catch (error) {
    console.error('Error signing out:', error);
 }
};
