import React from 'react';
import { Text, View, Pressable, ScrollView } from 'react-native';

const TermsAndConditionsContent = ({ onClose }) => {
  return (
    <View style={{
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      width: '80%',
    }}>
          <ScrollView>
        <Text style={{ marginBottom: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>Terms and Conditions for SplitMo</Text>
          {'\n\n'}
          By accessing or using our app, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, then you may not access the app.
        </Text>

        <Text style={{ marginBottom: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>1. Account Information</Text>
          {'\n\n'}
          <Text style={{ fontStyle: 'italic' }}>1.1. </Text>In order to use SplitMo, you may be required to provide certain information such as your name, email address, and banking information.
          {'\n\n'}
          <Text style={{ fontStyle: 'italic' }}>1.2. </Text>You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
          {'\n\n'}
          <Text style={{ fontStyle: 'italic' }}>1.3. </Text>You are responsible for maintaining the confidentiality of your account and password and for restricting access to your account. You agree to accept responsibility for all activities that occur under your account.
        </Text>

        <Text style={{ marginBottom: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>2. Authorization for Banking Access</Text>
          {'\n\n'}
          <Text style={{ fontStyle: 'italic' }}>2.1. </Text>By using SplitMo, you authorize us to access your banking information through the designated banking application.
          {'\n\n'}
          <Text style={{ fontStyle: 'italic' }}>2.2. </Text>You understand and agree that we may access, collect, and use your banking information solely for the purpose of facilitating money splitting transactions as per your instructions.
          {'\n\n'}
          <Text style={{ fontStyle: 'italic' }}>2.3. </Text>You acknowledge that we may use third-party service providers to access your banking information and agree to the terms and conditions of such third-party providers.
        </Text>

        <Text style={{ marginBottom: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>3. Money Splitting Transactions</Text>
          {'\n\n'}
          <Text style={{ fontStyle: 'italic' }}>3.1. </Text>SplitMo allows you to split money with other users as per your instructions.
          {'\n\n'}
          <Text style={{ fontStyle: 'italic' }}>3.2. </Text>You acknowledge and agree that any transactions initiated through SplitMo are solely your responsibility, and we shall not be liable for any unauthorized transactions or misuse of your account.
          {'\n\n'}
          <Text style={{ fontStyle: 'italic' }}>3.3. </Text>SplitMo facilitates financial transactions and bill splitting. Users must ensure the accuracy of transaction details and adhere to applicable laws and regulations.
        </Text>

        <Text style={{ marginBottom: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>4. User Conduct</Text>
          {'\n\n'}
          <Text style={{ fontStyle: 'italic' }}>4.1. </Text>You agree not to use SplitMo for any unlawful purpose or in any way that violates these Terms and Conditions.
          {'\n\n'}
          <Text style={{ fontStyle: 'italic' }}>4.2. </Text>You agree not to engage in any activity that could damage, disable, overburden, or impair SplitMo or interfere with any other party's use of the app.
          {'\n\n'}
          <Text style={{ fontStyle: 'italic' }}>4.3. </Text>Users are responsible for maintaining the security of their accounts and must not share their login credentials with others.
        </Text>


        <Text style={{ marginBottom: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>5. Privacy Policy</Text>
          {'\n\n'}
          <Text style={{ fontStyle: 'italic' }}>5.1. </Text>Our Privacy Policy explains how we collect, use, and disclose your information. By using SplitMo, you agree to the terms of our Privacy Policy.
          {'\n\n'}
          <Text style={{ fontStyle: 'italic' }}>5.2. </Text>SplitMo collects and processes user data as described in the privacy policy. Users' personal information will not be shared with third parties without consent.
        </Text>


        <Text style={{ marginBottom: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>6. Modification of Terms</Text>
          {'\n\n'}
          <Text style={{ fontStyle: 'italic' }}>6.1. </Text>We reserve the right to modify these Terms and Conditions at any time. Any changes will be effective immediately upon posting on the app.
          {'\n\n'}
          <Text style={{ fontStyle: 'italic' }}>6.2. </Text>Your continued use of SplitMo after any such changes shall constitute your consent to such changes.
          {'\n\n'}
          <Text style={{ fontStyle: 'italic' }}>6.3. </Text>These terms and conditions are governed by the laws of Republic of the Philippines.
        </Text>


        <Text style={{ marginBottom: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>7. Termination</Text>
          {'\n\n'}
          <Text style={{ fontStyle: 'italic' }}>7.1. </Text>We reserve the right to terminate or suspend your access to SplitMo at any time, without prior notice or liability, for any reason whatsoever.
          {'\n\n'}
          <Text style={{ fontStyle: 'italic' }}>7.2. </Text>Upon termination, your right to use SplitMo will immediately cease, and you must cease all use of the app.
          {'\n\n'}
          <Text style={{ fontStyle: 'italic' }}>7.3. </Text>SplitMo is not liable for any losses or damages resulting from the use of its services, except in cases of willful misconduct or gross negligence.
        </Text>


        <Text style={{ marginBottom: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>8. Contact Us</Text>
          {'\n\n'}
          <Text style={{ fontStyle: 'italic' }}>8.1. </Text>If you have any questions about these Terms and Conditions, please contact our team:
          {'\n\n'}
          Alliyah Isabel Librojo
          qaimlibrojo@tip.edu.ph
          {'\n'}
          Joseph Angeles
          qjbangeles@tip.edu.ph
          {'\n'}
          Russel Mendez
          qrpmendez@tip.edu.ph
          {'\n'}
          Ryan Angelo Yamat
          qracyamat@tip.edu.ph
          {'\n\n'}
          By using SplitMo, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
        </Text>

      </ScrollView>    

      <Pressable onPress={onClose}>
        <Text style={{ color: '#3670d4', marginTop: 10 }}>Close</Text>
      </Pressable>
    </View>
  );
};

export default TermsAndConditionsContent;
