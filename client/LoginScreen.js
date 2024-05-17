import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const colors = {
  primary: '#6369a8',
  white: '#fff',
};

export default function LoginScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Hardcodeando las credenciales del maestro
    const maestroUsername = 'Maestro';
    const maestroPassword = 'password';
  
    // Hardcodeando las credenciales del alumno
    const alumnoUsername = 'Alumno';
    const alumnoPassword = 'password';
  
    if (username === maestroUsername && password === maestroPassword) {
      // Redirigir a la pantalla de inicio si las credenciales son correctas para el maestro
      navigation.navigate('Home');
    } else if (username === alumnoUsername && password === alumnoPassword) {
      // Redirigir a la pantalla de inicio si las credenciales son correctas para el alumno
      navigation.navigate('HomeAlumno');
    } else {
      // Mostrar mensaje de error si las credenciales no son correctas para ninguno de los casos
      alert('Nombre de usuario o contraseña incorrectos');
    }
  };  

  const handleRegistration = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Evema</Text>
      <Image source={require('./assets/logo.png')} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
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
