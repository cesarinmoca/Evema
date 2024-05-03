import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavBar from './NavBar'; // Importamos el componente de NavBar

const colors = {
  primary: '#6369a8',
  white: '#fff',
};

function HomeScreen({ navigation }) {
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <NavBar /> 
      
      <View style={styles.contentContainer}>
        <Text style={styles.welcomeText}>¡Bienvenido a la pantalla de inicio!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Ajustamos el color de fondo si es necesario
  },
  contentContainer: {
    flex: 1, // Aseguramos que el contenido se expanda para llenar el espacio restante
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default HomeScreen;
