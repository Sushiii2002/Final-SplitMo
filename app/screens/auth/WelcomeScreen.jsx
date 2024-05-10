import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  SafeAreaView,
} from 'react-native';

import COLORS from '../../constants/colors';
import CustomButton from '../../constants/buttons';
import Button from '../../components/Button';


function WelcomeScreen({ navigation }) { 
  return (
    <View style={styles.background}>
      <Image
        style={styles.logo_image}
        source={require('../../assets/SplitMoLogo.png')}
      />
      <Text numberOfLines={1} style={styles.text_title}>
        SplitMo
      </Text>

      <View style={styles.margin}>
        <CustomButton
          title="LOG IN"
          onPress={() => navigation.navigate('LoginScreen')} // Replace "Login" with the screen name you've defined in your <Stack.Navigator>
        />
      </View>

      <TouchableHighlight>
        <View style={styles.signin_button}>
          <Text
            onPress={() => navigation.navigate('SignUpScreen')}
            style={styles.signin_text}>
            CREATE A NEW ACCOUNT
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignContent: 'center',
  },

  margin: {
    marginLeft: '18%',
    marginRight: '18%',
  },

  text_title: {
    fontSize: 65,
    fontWeight: 'bold',
    color: COLORS.white,
fontFamily: 'Roboto',
    textAlign: 'center',
    justifyContent: 'center',
    paddingTop: '0%',
    paddingBottom: '30%',
  },

  logo_image: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    marginTop: '50%',
  },

  signin_button: {
    marginTop: '1.5%',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  signin_text: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default WelcomeScreen;