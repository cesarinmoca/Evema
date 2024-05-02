import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';

// Importa la función de navegación desde 'react-navigation'
import { useNavigation } from '@react-navigation/native';

// Define constantes para los colores
const colors = {
  primary: '#6369a8',
  white: '#fff',
};

export default function LoginScreen() {
  // Obtiene la navegación
  const navigation = useNavigation();

  // Función para manejar el inicio de sesión
  const handleLogin = () => {
    // Aquí puedes implementar la lógica de autenticación
    // Si la autenticación es exitosa, navega a la pantalla de inicio
    navigation.navigate('Home');
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
      {/* Maneja el evento onPress para llamar a la función handleLogin */}
      <TouchableOpacity onPress={handleLogin} style={[styles.button, { backgroundColor: colors.primary }]}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: colors.white }]}>
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
