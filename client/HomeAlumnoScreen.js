import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const colors = {
  primary: '#6369a8',
  white: '#fff',
};

function HomeAlumnoScreen({ navigation }) {
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>¡Bienvenido Alumno!</Text>
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => navigateToScreen('ObservarEventosAlumno')}
        >
          <Text style={styles.buttonText}>Observar Eventos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => navigateToScreen('TusEventosAlumno')}
        >
          <Text style={styles.buttonText}>Tus Eventos</Text>
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

export default HomeAlumnoScreen;
