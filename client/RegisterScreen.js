import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';

const windowWidth = Dimensions.get('window').width;

function RegisterScreen({ navigation }) {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  function handleRegister() {
    fetch('http://192.168.1.65:3000/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombreUsuario,
        contrasena,
        rol: 'Usuario', // Rol por defecto
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al enviar la solicitud al servidor');
      }
      return response.json();
    })
    .then(data => {
      console.log('Respuesta del servidor:', data);
      Alert.alert('Éxito', 'Usuario registrado correctamente');
    })
    .catch(error => {
      console.error('Error al registrar usuario:', error);
      Alert.alert('Error', 'Hubo un problema al registrar el usuario');
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={nombreUsuario}
        onChangeText={setNombreUsuario}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={contrasena}
        onChangeText={setContrasena}
      />
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: windowWidth - 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  registerButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#6369a8',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;