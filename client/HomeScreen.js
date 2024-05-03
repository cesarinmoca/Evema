import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
      <Text style={styles.welcomeText}>¡Bienvenido a la pantalla de inicio!</Text>
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => navigateToScreen('NuevoEvento')}
        >
          <Text style={styles.buttonText}>Nuevo Evento</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => navigateToScreen('ObservarEventos')}
        >
          <Text style={styles.buttonText}>Observar Eventos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => navigateToScreen('LeerTickets')}
        >
          <Text style={styles.buttonText}>Leer Tickets</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => navigateToScreen('GestionarEventos')}
        >
          <Text style={styles.buttonText}>Gestionar Eventos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 20,
  },
  menuContainer: {
    marginTop: 20,
  },
  button: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.white,
  },
});

export default HomeScreen;
