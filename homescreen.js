import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { RNCamera } from 'react-native-camera';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState(null);

  // Function to get user's current location
  const getUserLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        Alert.alert('Location retrieved', `Lat: ${latitude}, Lon: ${longitude}`);
      },
      error => Alert.alert('Error', error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  // Function to handle user login
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://your-api-url/login', {
        username: userId,
        password: password,
        location: location,
      });

      // Handle response from the server
      if (response.data.token) {
        Alert.alert('Login Successful', 'You have logged in successfully!');
        // You can navigate to the Bus Assignment screen here
        navigation.navigate('BusAssignment', { userId });
      } else {
        Alert.alert('Login Failed', 'Invalid username or password');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during login');
    }
  };

  // Function to handle QR code scanning
  const handleQRScan = async () => {
    // Logic to navigate to the QR scanning screen (you can implement it similar to the Bus Assignment screen)
    navigation.navigate('QRScanScreen');
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Welcome to Pilgrim Bus App</Text>
      <TextInput
        placeholder="User ID"
        value={userId}
        onChangeText={setUserId}
        style={{ borderWidth: 1, borderColor: '#000', marginBottom: 10, padding: 10 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, borderColor: '#000', marginBottom: 10, padding: 10 }}
      />
      <Button title="Get Location" onPress={getUserLocation} />
      {location && (
        <Text style={{ marginVertical: 10 }}>
          Current Location: {`Lat: ${location.latitude}, Lon: ${location.longitude}`}
        </Text>
      )}
      <Button title="Login" onPress={handleLogin} />
      <Button title="Scan QR Code" onPress={handleQRScan} />
    </View>
  );
};

export default HomeScreen;
