import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from 'react-native';

function TusEventosAlumno({ navigation }) {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const idAlumno = 3; // ID hardcodeado del alumno

  useEffect(() => {
    fetch(`http://172.16.100.231:3000/tus-eventos/${idAlumno}`) // Cambia la URL según sea necesario
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
    navigation.navigate('DetallesEventoInscritosAlumno', { evento });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tus Eventos Inscritos:</Text>
      <ScrollView>
        {eventos.map((evento) => (
          <TouchableOpacity key={evento.id} onPress={() => handleEventoPress(evento)}>
            <View style={styles.eventoContainer}>
              <Text style={styles.eventoNombre}>{evento.nombre}</Text>
              <Text style={styles.eventoDescripcion}>{evento.descripcion}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
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

export default TusEventosAlumno;
