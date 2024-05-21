import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from 'react-native';

function ObservarEventosAlumnoScreen({ navigation }) {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Título de la vista
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Observar Eventos',
    });
  }, [navigation]);

  useEffect(() => {
    fetch('http://192.168.1.65:3000/eventos') // Asegúrate de usar la URL correcta para tu servidor
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Obtener el JSON de la respuesta
      })
      .then(data => {
        setEventos(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener eventos:', error);
        Alert.alert('Error', 'Error al obtener eventos: ' + error.message);
        setLoading(false);
      });
  }, []);

  // Evento de clic
  const handleEventoPress = (evento) => {
    // Vista a la que redirige
    navigation.navigate('DetallesEventoAlumno', { evento });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Lista de Eventos:</Text>
      {eventos.map((evento) => (
        <TouchableOpacity key={evento.id} onPress={() => handleEventoPress(evento)}>
          <View style={styles.eventoContainer}>
            <Text style={styles.eventoNombre}>{evento.nombre}</Text>
            <Text style={styles.eventoDescripcion}>{evento.descripcion}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventoContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  eventoNombre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventoDescripcion: {
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ObservarEventosAlumnoScreen;
