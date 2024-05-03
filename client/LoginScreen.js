import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const colors = {
  primary: '#6369a8',
  white: '#fff',
};

export default function LoginScreen() {
  const navigation = useNavigation();

  const handleLogin = () => {
    // Lógica de inicio de sesión aquí...
    navigation.navigate('Home');
  };

  const handleRegistration = () => {
    // Lógica de registro aquí...
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Evema</Text>
      <Image source={require('./assets/logo.png')} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={handleLogin} style={[styles.button, { backgroundColor: colors.primary }]}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegistration} style={[styles.button, { backgroundColor: colors.white }]}>
        <Text style={[styles.buttonText, { color: colors.primary }]}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
