import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Feather from 'react-native-vector-icons/Feather';

const PayPalScreen = () => {
  const [showGateway, setShowGateway] = useState(false);
  const [prog, setProg] = useState(false);
  const [progClr, setProgClr] = useState('#000');
  const [paymentStatus, setPaymentStatus] = useState(null); // Added state for payment status
  const [showPaymentResult, setShowPaymentResult] = useState(false); // Added state for showing payment result

  function onMessage(e) {
    let data = e.nativeEvent.data;
    setShowGateway(false);
    console.log(data);
    let payment = JSON.parse(data);
    if (payment.status === 'COMPLETED') {
      setPaymentStatus('SUCCESS'); // Set payment status to success
      setShowPaymentResult(true); // Show payment result
    } else {
      setPaymentStatus('FAILED'); // Set payment status to failed
      setShowPaymentResult(true); // Show payment result
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.btnCon}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setShowGateway(true)}
          >
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.btnTxt}>Pay</Text>
              <Text style={styles.btnTxt2}>Pal</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {showGateway ? (
        <Modal
          visible={showGateway}
          onDismiss={() => setShowGateway(false)}
          onRequestClose={() => setShowGateway(false)}
          animationType={'fade'}
          transparent
        >
          <View style={styles.webViewCon}>
            <View style={styles.wbHead}>
              <TouchableOpacity
                style={{ padding: 13 }}
                onPress={() => setShowGateway(false)}
              >
                <Feather name={'x'} size={24} />
              </TouchableOpacity>
              <Text
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#00457C',
                }}
              >
                PayPal GateWay
              </Text>
              <View style={{ padding: 13, opacity: prog ? 1 : 0 }}>
                <ActivityIndicator size={24} color={progClr} />
              </View>
            </View>
            <WebView
              source={{ uri: 'https://my--website-1c049.web.app' }}
              style={{ flex: 1 }}
              onLoadStart={() => {
                setProg(true);
                setProgClr('#000');
              }}
              onLoadProgress={() => {
                setProg(true);
                setProgClr('#00457C');
              }}
              onLoadEnd={() => {
                setProg(false);
              }}
              onLoad={() => {
                setProg(false);
              }}
              onMessage={onMessage}
            />
          </View>
        </Modal>
      ) : null}

      {showPaymentResult && (
        <Modal
          visible={showPaymentResult}
          animationType="fade"
          transparent={true}
        >
          <View style={styles.paymentResultContainer}>
            <View style={styles.paymentResultCard}>
              <Text style={styles.paymentResultTitle}>
                {paymentStatus === 'SUCCESS' ? 'Success!' : 'Failed'}
              </Text>
              <Text style={styles.paymentResultMessage}>
                {paymentStatus === 'SUCCESS'
                  ? 'Your payment was successful.'
                  : 'Payment failed. Please try again.'}
              </Text>
              <TouchableOpacity
                style={styles.paymentResultButton}
                onPress={() => setShowPaymentResult(false)}
              >
                <Text style={styles.paymentResultButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  btnCon: {
    height: 45,
    width: '70%',
    elevation: 1,
    backgroundColor: '#019cde',
    borderRadius: 25,
    border: 'none',
    padding: '8px 16px',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    padding: '8px 16px',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  btnTxt: {
    color: '#fff',
    fontSize: 23,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'white',
  },
  btnTxt2: {
    color: '#fff',
    fontSize: 23,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'white',
  },
  webViewCon: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  wbHead: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    zIndex: 25,
    elevation: 2,
  },
  paymentResultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  paymentResultCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  paymentResultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paymentResultMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  paymentResultButton: {
    backgroundColor: '#019cde',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  paymentResultButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PayPalScreen;