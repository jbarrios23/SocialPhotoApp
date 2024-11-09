import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { signUpWithEmail, signInWithEmail } from "../firebase/AuthService";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { saveUser } from "../utils/utils";


export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //Si el user ya esta en session navega al feed
        navigation.navigate('Feed')
      }
    });

    return unsubcribe;
  }, [navigation]);


  const handleSignIn = async () => {
    const success = await signInWithEmail(email, password);
    if (success) {
      saveUser(success)
      navigation.navigate('Feed');
    } else {
      Alert.alert('Error', 'Invalid email or password')
    }
  };

  const handleSignUp = async () => {
    const success = await signUpWithEmail(email, password);
    if (success) {
      Alert.alert('Success', 'Account created successfully');
      setIsSigningUp(false);
    } else {
      Alert.alert('Error', 'Could not create account');
    }
  };

  const handleGoogleSignIn = async () => {
    const success = await signInWithGoogle();
    if (success) {
      navigation.navigate('Home');

    } else {
      Alert.alert('Error', 'Google sign in failed');
    }
  };



  return (
    <View style={styles.container}>
        <Text style={styles.title}>Welcome to Social Phto App</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none" />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry />
        {isSigningUp ? (<Button title="Sign Up" onPress={handleSignUp} />) : (<Button title="Sign In" onPress={handleSignIn} />)}
        <Button title={isSigningUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
          onPress={() => setIsSigningUp(!isSigningUp)} />
        <Button title="Sign In with Google"
          onPress={handleGoogleSignIn} />

    </View>
  );
};

const styles = StyleSheet.create(
  {
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f2f2f2', },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, },
    input: { height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, marginBottom: 10, width: '100%', backgroundColor: '#ffffff', },
  });