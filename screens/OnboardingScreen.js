import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const OnboardingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <Image
            source={require('../img/secondary-logo.png')}
            style={styles.secondaryLogo}
        />
        <Image
            source={require('../img/main-logo.png')}
            style={styles.image}
        />
      <Text style={styles.title}>Your Reliable Fire Safety Companion</Text>
      <Text style={styles.quote}>Protecting your space with real-time gas and flame detection.</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Get Started
        </Text>
        <Image
              source={require('../img/arrow-right.png')}
          />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1D1D1F',
  },
  title: {
    fontSize: 30,
    color: '#C92F62',
    fontWeight: 'bold',
  },
  quote: {
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 50,
    marginVertical: 20,
    color: "#686B6E"
  },
  image: {
    width: 150,
    height: 150,
  },
  button: {
    backgroundColor: '#C92F62',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 500,
    width: 160,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
    justifyContent: "space-between",
    flexDirection: "row"
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default OnboardingScreen;
